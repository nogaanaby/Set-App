<template>
  <div class="main template-div">
      <div class="card">
        <div class="card-content">
          <div class="is-narrow">
            <div class="buttons fadeInDown">

              <router-link class="link" to="/game">
               <p class="control">
                  <a class="button is-large is-light-orange is-fullwidth">
                    <span class="icon is-small">
                      <img class="icon" src='@/assets/single.png'>
                    </span>
                    <span>Single-Player</span>
                  </a>
                </p>
                </router-link>

                <router-link class="link" to="/offlineSignUp">
                  <p class="control">
                    <a class="button is-large is-light-orange is-fullwidth">
                      <span class="icon is-small">
                        <img class="icon" src='@/assets/multiplayer.png'>
                      </span>
                      <span>multiPlayer offline</span>
                    </a>
                  </p>
                </router-link>

                <router-link class="link" to="/instractionsTables">
                  <p class="control">
                    <a class="button is-large is-light-orange is-fullwidth">
                      <span class="icon is-small">
                        <img class="icon" src='@/assets/HowToIcon.png'>
                      </span>
                      <span>How To Play</span>
                    </a>
                  </p>
                </router-link>

                <router-link class="link" to="/Practice">
                  <p class="control">
                    <a class="button is-large is-light-orange is-fullwidth">
                      <span class="icon is-small">
                        <img class="icon" src='@/assets/pencil.png'>
                      </span>
                      <span>Practice!</span>
                    </a>
                  </p>
                </router-link>

                <a class="button is-large is-fullwidth" v-show="false">
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
.is-narrow{
  margin-top: 10%;
  min-width: 200px;
}
.link{
  width: 100%;
}

</style>
