process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
})
process.on('uncaughtException', err => {
  console.log(err, 'Uncaught Exception thrown')
  process.exit(1)
})

// FIRST TO EXECUTE - load configs
const serverConfig = require('./serverConfig')
console.log(`Server START (${process.env.NODE_ENV})`)

const server = require('./server')
// const db = require('./services/db-service')

;(async () => {
  // db init should be the first:
  // await db.init()
  // server init should be second:
  await server.init()
})()
  .catch(err => {
    console.error('Error (at backend/index.js):')
    console.error(err)
    console.error(JSON.stringify(err))
  })
