<template>
  <div class="main template-div">
    <gameMenu></gameMenu>
      <div class="card">
        <div class="card-content">
          <div class="is-narrow">
            <div class="buttons fadeInDown">
                <a class="button is-medium is-fullwidth">
                  <span class="icon is-small">
                    <img class="icon" src='@/assets/single.png'>
                  </span>
                  <router-link class="menu-links" to="/game">Single-Player</router-link>
                </a>
                <a class="button is-medium is-fullwidth">
                  <span class="icon is-small">
                    <img class="icon" src='@/assets/multiplayer.png'>
                  </span>
                   <router-link class="menu-links" to="/offlineSignUp">multiPlayer offline</router-link>
                </a>
                <a class="button is-medium is-fullwidth">
                  <span class="icon is-small">
                    <img class="icon" src='@/assets/multiplayer.png'>
                  </span>
                  <router-link class="menu-links" to="/onlineSignUp">multiPlayer online</router-link>
                </a>
                <a class="button is-medium is-fullwidth">
                  <span class="icon is-small">
                    <img class="icon" src='@/assets/HowToIcon.png'>
                  </span>
                  <router-link class="menu-links" to="/instractionsTables">How To Play</router-link>
                </a>                <a class="button is-medium is-fullwidth">
                  <span class="icon is-small ">
                    <img class="icon" src='@/assets/pencil.png'>
                  </span>
                  <router-link class="menu-links" to="/Practice">Practice!</router-link>
                </a>
            </div>
          </div>
      </div>
    </div>
    <brand-footer class="footer"></brand-footer>
  </div>
</template>

<script>
import gameMenu from '@/components/nav.vue'
import brandFooter from '@/components/brandFooter.vue'

export default {
  name: 'start',
  components: {
    gameMenu,
    brandFooter
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped>
/*************************************
allDevices
***************************************/

</style>
