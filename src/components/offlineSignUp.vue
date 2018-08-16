<template>
  <div class="offlineSignUp template-div">
  <div class="card">
    <div class="card-content">
      <div class="tile is-ancestor fadeInDown">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <h5 class="noga-title is-5">First Player Nickname</h5>
              <div class="field is-grouped">
                <input type="text" class="input" placeholder="The IceCream Men" v-model="players.player1" @keyup.enter="offlineRegister1">
                <button class="button is-success is-small input-button noga" @click="offlineRegister1">Register</button>
              </div>
            <div class="horizontal-seperator"></div>
            <h5 class="noga-title is-5">Second Player Nickname</h5>
              <div class="field is-grouped">
                <input type="text" class="input" placeholder="Banana Men" v-model="players.player2" @keyup.enter="offlineRegister2">
                <button class="button is-success is-small input-button noga" @click="offlineRegister2">Register</button>
              </div>

          </div>
        </div>
        <div class="tile is-5 is-vertical is-parent">
          <div class="tile is-child box">
            <div v-show="player1Sign" class="bounceIn"><h5 class="title is-5 noga">{{player1Nickname}} vs </h5></div>
            <div v-show="player2Sign" class="bounceIn"><h5 class="title is-5 noga">{{player2Nickname}}</h5></div>
            <div class="horizontal-seperator"></div>
            <div v-show="letsPlay" class="bounceIn"><button class="button is-success letsPlay"><router-link to="/offline2Players">Let's Play!</router-link></button></div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <brand-footer class="footer"></brand-footer>
  </div>
</template>

<script>
import store from '../js/store.js'
import brandFooter from '@/components/brandFooter.vue'

export default {
  name: 'offlineSignUp',
  components: {
    brandFooter
  },
  data () {
    return {
      players: store.multplayerOffline,
      player1Nickname: '',
      player2Nickname: '',
      letsPlay: false,
      player1Sign: false,
      player2Sign: false
    }
  },
  mounted () {

  },
  methods: {
    offlineRegister1 () {
      this.player1Nickname = this.players.player1
      this.player1Sign = true
    },
    offlineRegister2 () {
      this.player2Nickname = this.players.player2
      this.player2Sign = true
      this.letsPlay = true
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
