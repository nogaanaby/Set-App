<template>
  <div class="main">
    <gameMenu class="onDesktopOnly"></gameMenu>
      <div class="card">
        <header class="card-header onMobileOnly">
          <a class="logo">
            <img id="myLogo" src='@/assets/logoMiddle.png'>
          </a>
        </header>
        <div class="card-content fadeInDown columns">
          <div class="column buttonsAndIcons">
            <div class="buttonAndIcon"><a class="button is-medium"><img class="icon" src='@/assets/single.png'><router-link to="/game">Single-Player</router-link></a></div>
            <div class="buttonAndIcon"><a class="button is-medium"><img class="icon" src='@/assets/multiplayer.png'><router-link to="/game">Multi-Player</router-link></a></div>
            <div class="buttonAndIcon"><a class="button is-medium"><img class="icon" src='@/assets/HowToIcon.png'><router-link to="/instractionsTables">How To Play</router-link></a></div>
            <div class="buttonAndIcon"><a class="button is-medium"><img class="icon" src='@/assets/pencil.png'><router-link to="/Practice">Practice!</router-link></a></div>
          </div>
          <div class="nickname column">
            <h4>Choose A Nickname</h4>
            <div class="columns register">
              <div class="column inputC"><input type="text" class="nicknameInput input" placeholder="The IceCream Men" v-model="nickname" @keyup.enter="chackAvailble"></div>
              <div class="column is-one-third registerC"><button class="button is-success is-small registerButton" @click="chackAvailble">Register</button></div>
            </div>
            <p v-show = "nicknameAvailble === 'no'" class="notAvailble wrong">The Name Is Alredy Use By Another Member</p>
            <h4 class="OnlineUsers">Online Users</h4>
            <ul>
              <li v-for="user in onlineUsers" v-bind="user.index">
                <span>{{user.nickname}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import gameMenu from '@/components/nav.vue'

export default {
  name: 'start',
  components: {
    gameMenu
  },
  data () {
    return {
      nickname: '',
      onlineUsers: [],
      nicknameAvailble: ''
    }
  },
  mounted () {
    // setInterval(this.pvpGetOnlinePlayers(), 2000)
    console.log(this.onlineUsers)
  },
  methods: {
    chackAvailble () {
      this.nicknameAvailble = 'ok'
      this.onlineUsers.forEach((user) => {
        if (user.nickname === this.nickname) {
          this.nicknameAvailble = 'no'
        }
      })
      if (this.nicknameAvailble !== 'no') {
        this.pvpRegister()
      }
    },
    async pvpRegister () {
      await this.$axios.post('pvp/register', {
        nickname: this.nickname,
        socketId: this.$socket.id
      })
    },
    async pvpGetOnlinePlayers () {
      const response = await this.$axios.get('pvp/onlineUsers')
      this.onlineUsers = response.data
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
/*************************************
desktop
***************************************/
@media only screen and (min-width: 769px) {
  body{
    height: 600px;
  }
  .button{
    width: 70%;
    display: flex;
    justify-content: left;
  }
  .onMobileOnly{
    display: none;
  }
  .icon{
    width: 10%;
    height: 70%;
    margin-right: 10%;
  }

  .buttonAndIcon{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .buttonsAndIcons{
    margin-bottom: 30px;
  }

  a{
    margin-left: 5%;
  }
  .nickname{
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin: 10px;
    padding-left: 20px;
    align-self: flex-start;
  }
  h4{
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
  }
  li{
    font-size: 0.9em;
    text-align: left;
  }
  ul{
    margin: 10px;
  }
  .OnlineUsers{
    margin-top: 40px;
  }
  .register{
    width: 80%;
    margin-top: 10px;
  }
  .nicknameInput{
    width: 100%;
  }
  .inputC{
    padding-right:5px;
  }
  .registerC{
    padding-left:5px;
  }
}
/*************************************
mobile
***************************************/
@media only screen and (max-width: 768px) {
  .button{
    margin: 15px auto;
    width: 60%;
  }
  .card{
    background-color: #00D1B1;
  }
  .onDesktopOnly{
    display: none;
  }
}

</style>
