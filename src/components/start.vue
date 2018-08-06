<template>
  <div class="main">
    <gameMenu class="onDesktopOnly"></gameMenu>
      <div class="card">
        <header class="card-header onMobileOnly">
          <a class="logo">
            <img id="myLogo" src='@/assets/logoMiddle.png'>
          </a>
        </header>
        <div class="card-content fadeInDown">
          <div class="buttonAndIcon"><img class="icon" src='@/assets/single.png'><a class="button is-medium"><router-link to="/game">Single-Player</router-link></a></div>
          <div class="buttonAndIcon"><img class="icon" src='@/assets/multiplayer.png'><a class="button is-medium"><router-link to="/game">Multi-Player</router-link></a></div>
          <div class="buttonAndIcon"><img class="icon" src='@/assets/HowToIcon.png'><a class="button is-medium"><router-link to="/instractionsTables">How To Play</router-link></a></div>
          <div class="buttonAndIcon"><img class="icon" src='@/assets/pencil.png'><a class="button is-medium"><router-link to="/Practice">Practice!</router-link></a></div>
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
  body{
    height: 600px;
  }
  .button{
    width: 30%;
  }
  .onMobileOnly{
    display: none;
  }
  .icon{
    width: 5%;
    height: 5%;
  }

  .buttonAndIcon{
    display: flex;
    flex-direction: row;
    justify-content: center;
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
