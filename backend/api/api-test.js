const { asyncWrap } = require('./utils')

module.exports = app => {
  app.get('/add', asyncWrap(async (req, res) => {
    if (!req.query.b) {
      res.status(400).send('missing parameter b!')
      return
    }
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    res.send('' + (a + b))
  }))
  app.get('/', asyncWrap(async (req, res) => {
    res.send('Server OK')
  }))
}
