class User {
  constructor (nickname, socketId) {
    this.nickname = nickname
    this.socketId = socketId
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
  initSocket (socket, io) {
    socket.on('sendInvitation', (friendNickname) => {
      console.log(socket.nickname + ' invites ' + friendNickname)
      // 1. find the socket of the user whos nickname is 'friendNickname'
      const peerSocketId = this.onlineUsers.getUserByNickname(friendNickname).socketId
      const peerSocket = io.sockets.connected[peerSocketId]
      // 2. emit 'getInvitation' from THAT socket
      peerSocket.emit('getInvitation', {
        socketId: socket.id,
        nickname: socket.nickname
      })
    })

    socket.on('another event', (payload) => {
    })

    socket.on('and another one...', (payload) => {
    })
  }
  nickNameIsTaken (nickname) {
    return this.onlineUsers.nicknameExist(nickname)
  }
  register (socket, nickname) {
    this.onlineUsers.createUser(nickname, socket.id)
    console.log(`${nickname} has been registered`)
    socket.nickname = nickname
    this.initSocket(socket, io)
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
