<template>
  <div class="main template-div">
      <div class="card">
        <div class="card-content">
          <div class="is-narrow">
            <div class="buttons fadeInDown">

              <router-link class="link" to="/game">
               <!-- <p class="control"> -->
                  <span class="greenIcon">
                    <img class="" src='@/assets/singleGreen.png'>
                  </span>
                  <a class="button is-large is-light-orange sameSize">
                    <span>Single-Player</span>
                  </a>
                <!-- </p> -->
                </router-link>

                <router-link class="link" to="/offlineSignUp">
                  <!-- <p class="control"> -->
                    <span class="greenIcon">
                      <img class="" src='@/assets/multiplayerOffline.png'>
                    </span>
                    <a class="button is-large is-light-orange sameSize">
                      <span>multiPlayer offline</span>
                    </a>
                  <!-- </p> -->
                </router-link>

                <router-link class="link" to="/onlineSignUp">
                  <!-- <p class="control"> -->
                    <span class="greenIcon">
                      <img class="" src='@/assets/multiplayerOnline.png'>
                    </span>
                    <a class="button is-large is-light-orange sameSize">
                      <span>multiPlayer online</span>
                    </a>
                  <!-- </p> -->
                </router-link>

                <router-link class="link" to="/instractionsTables">
                  <!-- <p class="control"> -->
                    <span class="greenIcon">
                      <img class="" src='@/assets/instractions.png'>
                    </span>
                    <a class="button is-large is-light-orange sameSize">
                      <span>How To Play</span>
                    </a>
                  <!-- </p> -->
                </router-link>

                <router-link class="link" to="/Practice">
                  <!-- <p class="control"> -->
                    <span class="greenIcon">
                      <img class="" src='@/assets/pencilGreen.png'>
                    </span>
                    <a class="button is-large is-light-orange sameSize">
                      <span>Practice!</span>
                    </a>
                  <!-- </p> -->
                </router-link>
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
.greenIcon{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
}
.sameSize{
  width: 228px;
}
</style>
