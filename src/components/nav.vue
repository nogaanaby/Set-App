<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="desktopLogo">
         <img class="myLogo" src='@/assets/logo-white-align-left.png'>
        </a>
        <a class="mobileOnly">
         <img class="myLogo" src='@/assets/logoMiddle.png'>
        </a>
        <a v-if="!onGame" class="mobileBurger mobileOnly"> <router-link to="/start"><img src='@/assets/burgerWhite.png'></router-link></a>
        <a v-if="onGame" class="mobileBurger mobileOnly"><img src='@/assets/pauseWhite.png'></a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <a v-if="!onGame" class="burger"> <router-link to="/start"><img src='@/assets/burgerWhite.png'></router-link></a>
        <a v-if="onGame" class="burger"><img src='@/assets/pauseWhite.png'></a>
      </div>
    </div>
  </nav>
</template>

<script>
import store from '../js/store.js'
export default {
  name: 'gameMenu',
  data () {
    return {
      onGame: store.onGame
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
desktop & tablet
***************************************/
@media only screen and (min-width: 401px) {
  .myLogo{
    width: 30%;
    float: left;
    margin: 10px;
  }
  .burger{
    width: 35px;
    margin: 20px;
  }
  .mobileOnly{
    display: none;
  }
}
/*************************************
mobile
***************************************/
@media only screen and (max-width: 400px) {
  .myLogo{
    width: 70%;
  }
  .desktopLogo{
    display: none;
  }
  .mobileBurger{
    width: 65px;
    margin: 20px 20px 20px 0;
  }
}
</style>
