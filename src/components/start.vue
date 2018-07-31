<template>
  <div class="main">
    <gameMenu class="onDesktopOnly"></gameMenu>
    <div class="card">
      <header class="card-header onMobileOnly">
        <a class="logo">
          <img id="myLogo" src='@/assets/logoMiddle.png'>
        </a>
      </header>
      <div class="card-content">
        <a class="button is-medium is-fullwidth"><router-link to="/game">Play Beaginners</router-link></a>
        <a class="button is-medium is-fullwidth"><router-link to="/game">Play Intemidiate</router-link></a>
        <a class="button is-medium is-fullwidth"><router-link to="/instractionsTables">How To Play</router-link></a>
      </div>
    </div>
  </div>
</template>

<script>
import instractionsTables from '@/components/instractionsTables'
import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import gameMenu from '@/components/nav.vue'

export default {
  name: 'start',
  components: {
    gameMenu
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
desktop
***************************************/
@media only screen and (min-width: 769px) {
  .button{
    margin: 30px auto;
    width: 70%;
  }
  .onMobileOnly{
    display: none;
  }
}
/*************************************
mobile
***************************************/
@media only screen and (max-width: 768px) {
  .button{
    margin: 15px auto;
    width: 80%;
  }
  .card{
    background-color: #00D1B1;
  }
  .onDesktopOnly{
    display: none; 
  }
}

</style>
