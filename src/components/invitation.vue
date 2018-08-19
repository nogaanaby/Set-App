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
          <button class="button is-success is-small" @click="WannaPlay">
            <router-link to="/onlineGame">yes</router-link>
          </button>
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
  props: ['massage'],
  data () {
    return {
      inviter: store.inviter,
      gotInv: store.gotMassage,
      massageContent: this.massage
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
    },
    WannaPlay () {
      this.massageContent = 'just a sec...'
      this.$socket.emit('getInvitation', this.inviter.nickname)
    }
  }
}
</script>

<style scoped>
</style>
