<template>
  <div class="invitation">
    <article class="message is-info">
      <div class="message-header">
        <p>You were challenged by {{inviter.nickname}}</p>
        <button class="delete" aria-label="delete" @click="closeMassage()"></button>
      </div>
      <div class="message-body">
        <div class="invitation">
          <h1 class="noga-title">You were challenged by {{inviter.nickname}} !</h1>
          <p>({{inviter.nickname}} is waiting for you to answer)</p>
          <p>Do You Want To Play With {{inviter.nickname}} ?</p>
          <div class="horizontal-seperator"></div>
          <button class="button is-success is-small">Yes</button>
          <button class="button is-danger is-small" @click="dontWannaPlay">No</button>
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
  props: [],
  data () {
    return {
      inviter: store.inviter,
      watingTitle: '',
      watingMassage: '',
      gotInv: store.gotMassage
    }
  },
  mounted () {

  },
  sockets: { // listeners

  },
  methods: {
    dontWannaPlay () {
      this.$socket.emit('refuseInvitation', this.inviter.nickname)
      this.inviter.nickname = ''
      this.gotInv.gotInvitation = false
    },
    closeMassage () {
      this.gotInv.gotInvitation = false
    }
  }
}
</script>

<style scoped>
</style>
