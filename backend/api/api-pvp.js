const { asyncWrap } = require('./utils')
const pvp = require('../services/pvp')

module.exports = (app, io) => {
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
    try {
      const socket = io.sockets.connected[socketId]
      pvp.register(socket, nickname, io)
      res.send('success')
    } catch (e) {
      res.status(401).send(e.message)
    }
  }))

  app.get('/onlineUsers', asyncWrap(async (req, res) => {
    res.send(pvp.getOnlineUsers())
  }))
}
