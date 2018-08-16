<template>
  <div class="main template-div">
      <div class="card">
        <div class="card-content">
          <div class="is-narrow">
            <div class="buttons fadeInDown">
                <a class="button is-medium is-fullwidth">
                  <span class="icon is-small">
                    <img class="icon" src='@/assets/single.png'>
                  </span>
                  <router-link class="menu-links cardText" to="/game">Single-Player</router-link>
                </a>
                <a class="button is-medium is-fullwidth">
                  <span class="icon is-small">
                    <img class="icon" src='@/assets/multiplayer.png'>
                  </span>
                   <router-link class="menu-links cardText" to="/offlineSignUp">multiPlayer offline</router-link>
                </a>
                <a class="button is-medium is-fullwidth">
                  <span class="icon is-small">
                    <img class="icon" src='@/assets/HowToIcon.png'>
                  </span>
                  <router-link class="menu-links cardText" to="/instractionsTables">How To Play</router-link>
                </a>
                <a class="button is-medium is-fullwidth">
                  <span class="icon is-small ">
                    <img class="icon" src='@/assets/pencil.png'>
                  </span>
                  <router-link class="menu-links cardText" to="/Practice">Practice!</router-link>
                </a>
                <a class="button is-medium is-fullwidth" v-show="false">
                  <span class="icon is-small">
                    <img class="icon" src='@/assets/multiplayer.png'>
                  </span>
                  <router-link class="menu-links cardText" to="/onlineSignUp">multiPlayer online</router-link>
                </a>
            </div>
          </div>
      </div>
    </div>
    <brand-footer class="footer"></brand-footer>
  </div>
</template>

<script>
import brandFooter from '@/components/brandFooter.vue'

export default {
  name: 'start',
  components: {
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
.icon{
  width: 20px;
  height: 20px;
}
</style>
