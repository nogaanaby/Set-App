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

class Pvp {
  constructor () {
    this.onlineUsers = new Users()
  }
  initSocket (socket, io, newNickname) {
    const newUserSocketId = this.onlineUsers.getUserByNickname(newNickname).socketId
    // 2. call getNewUser to update alll the users about the new one
    Object.keys(io.sockets.connected).forEach(key => {
      const currSocket = io.sockets.connected[key]
      currSocket.emit('getNewUser', {
        socketId: newUserSocketId,
        nickname: newNickname,
        status: 'availble'
      })
    })

    socket.on('sendInvitation', (invited) => {
      console.log(socket.nickname + ' invites ' + invited)
      // 1. find the socket of the user whos nickname is 'invited'
      const peerSocketId = this.onlineUsers.getUserByNickname(invited).socketId
      const peerSocket = io.sockets.connected[peerSocketId]
      // 2. emit 'getInvitation' from THAT socket
      peerSocket.emit('getInvitation', {
        socketId: socket.id,
        nickname: socket.nickname
      })
    })

    socket.on('refuseInvitation', (sender) => {
      console.log(sender + ' this is the person who got rejention')
      console.log(socket.nickname + ' this is the person who reject')
      const senderSocketId = this.onlineUsers.getUserByNickname(sender).socketId
      const senderSocket = io.sockets.connected[senderSocketId]
      senderSocket.emit('getARefuse', {
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
    // console.log(`getOnlineUsers ${JSON.stringify(this.onlineUsers)}`)
    return this.onlineUsers.list
  }
  dismissPlayer (socketId) {
    this.onlineUsers.deleteBySocket(socketId)
  }
}

module.exports = new Pvp()
