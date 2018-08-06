const { asyncWrap } = require('./utils')
const pvp = require('../services/pvp')

module.exports = app => {
  app.post('/register', asyncWrap(async (req, res) => {
    const {socketId, nickname} = req.body
    if (!socketId) {
      res.status(400).send('Missing socketId in POST /register request')
      return
    }
    if (!nickname) {
      res.status(400).send('Missing nickname in POST /register request')
      return
    }
    if (!pvp.nickNameIsTaken(nickname)) {
      pvp.register(socketId, nickname)
      res.send('success')
    } else {
      res.status(401).send(`Nickname ${nickname} is already taken`)
    }
  }))

  app.get('/onlineUsers', asyncWrap(async (req, res) => {
    res.send(pvp.getOnlineUsers())
  }))
}
