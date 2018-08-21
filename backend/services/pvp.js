const cardsDeck = require('../services/utils')
class User {
  constructor (nickname, socketId) {
    this.nickname = nickname
    this.socketId = socketId
    this.status = 'availble'
  }
}

class Users {
  constructor () {
    this.list = []
  }

  createUser (nickname, socketId) {
    if (this.nicknameExist(nickname) || this.socketExist(socketId)) {
      throw Error('Your nickname is already use or you already registered with another nickname')
    }
    this.list.push(new User(nickname, socketId))
  }

  nicknameExist (nickname) {
    return this.getUserByNickname(nickname) !== undefined
  }

  socketExist (socketId) {
    return this.getUserBySocketId(socketId) !== undefined
  }

  deleteBySocket (socketId) {
    const userLeftIndex = this.list.findIndex(e => e.socketId === socketId)
    this.list.splice(userLeftIndex, 1)
  }

  getUserByNickname (nickname) {
    return this.list.find(e => e.nickname === nickname)
  }

  getUserBySocketId (socketId) {
    return this.list.find(e => e.socketId === socketId)
  }
}

class TewlveCards {
  constructor () {
    this.cardsDataOnTheTable = new Array(12)
    const cards81 = cardsDeck.cardsDeckArray
    for (let i = 0; i < this.cardsDataOnTheTable.length; i++) {
      this.cardsDataOnTheTable[i] = cards81.splice((Math.floor(Math.random() * cards81.length)), 1)[0]
    }
  }
}

class Pvp {
  constructor () {
    this.onlineUsers = new Users()
    this.cards = new TewlveCards()
  }
  getSocketIdByNickname (nickname) {
    return this.onlineUsers.getUserByNickname(nickname).socketId
  }
  getSocketByNickname (io, nickname) {
    return io.sockets.connected[this.getSocketIdByNickname(nickname)]
  }
  initSocket (socket, io, newNickname) {
    /*******************
     * Invitation
     ******************/
    // 2. call getNewUser to update alll the users about the new one
    Object.keys(io.sockets.connected).forEach(key => {
      const currSocket = io.sockets.connected[key]
      currSocket.emit('getNewUser', {
        socketId: this.getSocketIdByNickname(newNickname),
        nickname: newNickname,
        status: 'availble'
      })
    })

    socket.on('sendInvitation', (invited) => {
      console.log(invited + ' invite ' + socket.nickname)
      this.getSocketByNickname(io, invited).emit('getInvitation', {
        socketId: socket.id,
        nickname: socket.nickname
      })
    })

    socket.on('refuseInvitation', (sender) => {
      this.getSocketByNickname(io, sender).emit('getARefuse', {
        socketId: socket.id,
        nickname: socket.nickname
      })
    })

    socket.on('dropGame', (invited) => {
      this.getSocketByNickname(io, invited).emit('yourOpponentLeft', {
        socketId: socket.id,
        nickname: socket.nickname
      })
    })

    socket.on('updateOnChangingStatus', (userAndStatus) => {
      // 2.update alll the users about the new one
      Object.keys(io.sockets.connected).forEach(key => {
        const currSocket = io.sockets.connected[key]
        currSocket.emit('getUpdateOnStatusChangings', userAndStatus)
      })
    })
    /*******************
     * game
     ******************/
    socket.on('acceptInvitation', (sender) => {
      io.sockets.connected[socket.id].emit('fillCardsData', this.cards.cardsDataOnTheTable)
      this.getSocketByNickname(io, sender).emit('getTheAccept', {
        socketId: socket.id,
        nickname: socket.nickname
      })
    })

    socket.on('letsStartPlay', (invited) => {
      io.sockets.connected[socket.id].emit('fillCardsData', this.cards.cardsDataOnTheTable)
      this.getSocketByNickname(io, invited).emit('closeM', this.cards.cardsDataOnTheTable)
    })

    socket.on('clickCard', (oppAndCard) => {
      this.getSocketByNickname(io, oppAndCard.nickname).emit('opponentHasClicked', oppAndCard.card)
    })
  }
  nickNameIsTaken (nickname) {
    return this.onlineUsers.nicknameExist(nickname)
  }
  register (socket, nickname, io) {
    this.onlineUsers.createUser(nickname, socket.id)
    console.log(`${nickname} has been registered`)
    socket.nickname = nickname
    this.initSocket(socket, io, nickname)
  }
  getOnlineUsers () {
    return this.onlineUsers.list
  }
  dismissPlayer (socketId) {
    this.onlineUsers.deleteBySocket(socketId)
  }
}

module.exports = new Pvp()
