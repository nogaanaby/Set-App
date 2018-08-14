<template>
  <div class="onlineSignUp template-div">
  <gameMenu></gameMenu>
  <div class="card">
    <div class="card-content">
      <div class="tile is-ancestor fadeInDown">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <h5 class="title is-5">Choose A Nickname</h5>
              <div class="field is-grouped">
                <input type="text" class="input" placeholder="The IceCream Men" v-model="nickname" @keyup.enter="pvpRegister">
                <button class="button is-success is-small input-button" @click="pvpRegister">Register</button>
              </div>
              <div :class="{bounceIn: !error && comment==='You Are In!'}">
                <p :class="{isGreen: comment==='You Are In!', wrong: error, notAvailble: error}">{{comment}}</p>
              </div>
          </div>
        </div>
        <div class="tile is-5 is-vertical is-parent">
          <div class="tile is-child box">
            <h5 class="title is-5">Online Users</h5>
            <ul class="onlineUsers-list">
              <li class="userOnline field is-grouped" v-for="user in onlineUsers" v-bind:key="user.index">
                <span class="vertical-gap-medium">{{user.nickname}}</span>
                <p class="control">
                  <a class="button is-small is-link is-tiny" @click="invite(user.nickname)">
                    <span class="icon is-small">
                      <img src='@/assets/multiplayerWhite.png'>
                    </span>
                    <span class="vertical-gap-small">Invite</span>
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
    <brand-footer class="footer"></brand-footer>
  </div>
</template>

<script>
import brandFooter from '@/components/brandFooter.vue'
import gameMenu from '@/components/nav.vue'
export default {
  name: 'onlineSignUp',
  components: {
    gameMenu,
    brandFooter
  },
  data () {
    return {
      nickname: '',
      onlineUsers: [],
      error: false,
      comment: ''
    }
  },
  mounted () {
    setInterval(this.pvpGetOnlinePlayers, 2000)
    console.log(this.onlineUsers)
  },
  sockets: {
    getInvitation (inviter) {
      alert(`You were invited by ${inviter.nickname}`)
    }
  },
  methods: {
    async pvpRegister () {
      try {
        await this.$axios.post('pvp/register', {
          nickname: this.nickname,
          socketId: this.$socket.id
        })
        this.comment = 'You Are In!'
        this.error = false
      } catch (e) {
        this.comment = e.response.data
        this.error = true
      }
    },
    async pvpGetOnlinePlayers () {
      const response = await this.$axios.get('pvp/onlineUsers')
      this.onlineUsers = response.data
    },
    invite (friendNickname) {
      // send to server invite request
      this.$socket.emit('sendInvitation', friendNickname)
    }
  }
}
</script>

<style scoped>
.notAvailble{
  color: red;
  font-size: 0.7em;
  text-align: left;
}
.onlineUsers-list{
  margin-left: 20px;
}
.is-tiny{
  height: 50%;
  font-size: 50%;
  margin: auto;
  text-align: right;
  margin-top: 10%;
}
</style>
