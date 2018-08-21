<template>
  <div class="invitation">
    <article class="message is-info">
      <div class="message-header">
        <p>You were challenged by {{inviter.nickname}}</p>
      </div>
      <div class="message-body">
        <div class="invitation">
          <p>{{massageContent}}</p>
          <div class="horizontal-seperator"></div>

          <router-link class="link" to="/onlineGame">
          <button v-show="buttonsMass==='firstCatch'" @click="WannaPlay" class="button is-success is-small"> yes</button>
          </router-link>

          <button v-show="buttonsMass==='firstCatch'" class="button is-danger is-small" @click="dontWannaPlay">No</button>

          <router-link class="link" to="/onlineGame">
            <button v-show="buttonsMass==='secondCatch'" class="button is-success is-small" @click="letsPlay" >lets play!</button>
          </router-link>

          <button v-show="buttonsMass==='secondCatch'" class="button is-danger is-small" @click="dropGame">Not now</button>

          <router-link class="link" to="/start">
            <button v-show="buttonsMass==='close'" class="button is-link is-small" @click="closeMassage">close</button>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import store from '../js/store.js'
export default {
  name: 'invitation',
  components: {

  },
  props: ['massage', 'pingpong'],
  data () {
    return {
      inviter: store.inviter,
      gotInv: store.gotMassage,
      massageContent: this.massage,
      buttonsMass: this.pingpong
    }
  },
  mounted () {

  },
  sockets: { // listeners
    yourOpponentLeft (sender) {
      this.massageContent = 'I am sorry, ' + sender.nickname + ' has left the game'
      this.buttonsMass = 'close'
    },
    closeM () {
      this.gotInv.gotInvitation = false
    }
  },
  methods: {
    dontWannaPlay () {
      this.$socket.emit('refuseInvitation', store.inviter.nickname)
      this.closeMassage()
    },
    closeMassage () {
      this.gotInv.gotInvitation = false
    },
    WannaPlay () {
      this.massageContent = 'just a second...'
      this.buttonsMass = ''
      this.$socket.emit('acceptInvitation', store.inviter.nickname)
    },
    dropGame () {
      this.$socket.emit('dropGame', store.invited.nickname)
      this.closeMassage()
    },
    letsPlay () {
      this.closeMassage()
      this.$socket.emit('letsStartPlay', store.invited.nickname)
    }
  }
}
</script>

<style scoped>
.link{
  text-decoration: none;
}
</style>
