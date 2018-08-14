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
    return this.list.find(e => e.nickname === nickname) !== undefined
  }

  socketExist (socketId) {
    return this.list.find(e => e.socketId === socketId) !== undefined
  }

  deleteBySocket (socketId) {
    const userLeftIndex = this.list.findIndex(e => e.socketId === socketId)
    this.list.splice(userLeftIndex, 1)
  }
}

class Pvp {
  constructor () {
    this.onlineUsers = new Users()
  }
  nickNameIsTaken (nickname) {
    return this.onlineUsers.nicknameExist(nickname)
  }
  register (socketId, nickname) {
    this.onlineUsers.createUser(nickname, socketId)
    console.log(`${nickname} has been registered`)
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
