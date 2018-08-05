const { asyncWrap } = require('./utils')

module.exports = app => {
  app.get('/', asyncWrap(async (req, res) => {
    res.send('Server OK')
  }))
}
