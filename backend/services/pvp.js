
class Pvp {
  constructor () {
    this.onlineUsers = {}
  }
  nickNameIsTaken (nickname) {
    return this.onlineUsers[nickname]
  }
  register (socketId, nickname) {
    this.onlineUsers[nickname] = socketId
    console.log(`${nickname} has been registered`)
  }
  getOnlineUsers () {
    return Object.keys(this.onlineUsers).map(nickname => ({ nickname, socketId: this.onlineUsers[nickname] }))
  }
  dismissPlayer (socketId) {
    delete this.onlineUsers[this.getNickname(socketId)]
  }
  getNickname (socketId) {
    for (let nickname of Object.keys(this.onlineUsers)) {
      if (socketId === this.onlineUsers[nickname]) {
        return nickname
      }
    }
  }
}

module.exports = new Pvp()
