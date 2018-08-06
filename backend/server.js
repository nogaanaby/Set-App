const fs = require('fs')
const express = require('express')
const apiRouter = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
// // const fileUpload = require('express-fileupload')
const config = require('./serverConfig')
const expressSession = require('express-session')
const FileStore = require('session-file-store')(expressSession)
const passport = require('passport')
const pvp = require('./services/pvp')
const app = express()
app.use(bodyParser.json({limit: '500mb'}))

let server
if (!config.needSSL) {
  server = require('http').createServer(app)
} else {
  const key = fs.readFileSync(path.join(__dirname, 'secret/****.key'), 'utf8').toString()
  const cert = fs.readFileSync(path.join(__dirname, 'secret/****.crt'), 'utf8').toString()
  const ca = fs.readFileSync(path.join(__dirname, 'secret/****.ca-bundle'), 'utf8').toString()
  server = require('https').createServer({key, cert, ca}, app)
}
const io = require('socket.io')(server, { 'forceNew': true })

const api = require('./api')

class Server {
  constructor () {
    this.api = api
  }

  async init () {
    const sessionStore = new FileStore({
      logFn: msg => {
        if (msg.startsWith('[session-file-store] will retry, error on last attempt: Error: ENOENT:')) {
          return
        }
        console.log(msg)
      },
      ttl: 7 * 86400 // 1 week (in sec)
    })

    if (config.logAllRequests) app.use(logReq)
    app.use(cors({origin: config.corsOrigin, credentials: true}))
    app.use(cookieParser())
    // app.use(fileUpload())
    app.use(bodyParser.json({limit: '50mb'}))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.static(__dirname + '/****'))
    app.use(express.static(path.join(__dirname, '/../dist/spa-mat/')))

    app.use(expressSession({
      secret: 'gxA5vRBJaN3hpUDDtMz6a',
      store: sessionStore,
      rolling: true,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: config.needSSL,
        maxAge: 7 * 86400000 // 1 week (in ms)
      }
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use((req, res, next) => {
      if (req.isAuthenticated()) {
        // Let client know we consider him authenticated
        res.header('Access-Control-Expose-Headers', 'has_auth')
        res.header('has_auth', 1)
      }
      next()
    })

    // Create all api edges with '/api' prefix
    this.api(apiRouter)

    if (config.allowHelpAPI) {
      this.apiEdgeDefinitions = []
      apiRouter.stack.map(x => x.route).filter(r => r)
        .forEach(r => {
          Object.keys(r.methods).forEach(m => {
            this.apiEdgeDefinitions.push({path: r.path, method: m})
          })
        })

      apiRouter.get('/help', (req, res) => {
        res.send(this.apiEdgeDefinitions)
      })
    }
    app.use('/api', apiRouter)

    // Fallback to allow vue router work it's charm
    app.get('*', (req, res) => res.sendFile(path.resolve(path.join(__dirname, '/../dist/spa-mat/index.html'))))

    this.setSocketIO()

    return this.setExpressServer()
  }

  setSocketIO () {
    io.on('connection', (socket) => {
      console.log('socket connected', `client id ${socket.client.id}`)
      socket.on('disconnect', () => {
        console.log(`socket ${socket.client.id} disconnected`)
        pvp.dismissPlayer(socket.client.id)
        socket.disconnect()
      })
    })
  }

  async setExpressServer () {
    await new Promise((resolve) => {
      const port = config.apiPort
      server.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
        const shutdown = () => {
          console.log('Server closed')
          try {
            server.close()
          } catch (ex) {}
          process.exit()
        }
        process.once('SIGINT', shutdown).once('SIGTERM', shutdown)
        resolve()
      })
    })
  }
}

// Helper middleware to log request and continue on
function logReq (req, res, next) {
  try {
    // choose which line is commented, to include/exclude req.body from logs
    // console.log(req.method, req.url)
    console.log(req.method, req.url, JSON.stringify(req.body || {}, null, 2))
  } catch (err) {
    console.warn('logReq error:', err)
  }
  next()
}

module.exports = new Server()
