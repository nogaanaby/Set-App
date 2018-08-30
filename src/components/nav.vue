<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navStaf">
         <a class="greenIcon mobileOnly"> <router-link to="/start"><img src='@/assets/burgerWhite.png'></router-link></a> 
         <img class="myLogo" src='@/assets/logo-white-align-left.png'>
        </a>
        <!-- <a class="mobileOnly">
          <a class="greenIcon"> <router-link to="/start"><img src='@/assets/burgerWhite.png'></router-link></a>
         <img class="myLogo" src='@/assets/logoMiddle.png'>
        </a> -->
        <!-- <a v-if="!onGame" class="mobileBurger mobileOnly"> <router-link to="/start"><img src='@/assets/burgerWhite.png'></router-link></a> -->
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
  height: 2.5rem;
  width: 2.5rem;
}

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
    width: 80%;
    padding: 10px;
  }
  .desktopLogo{
    display: none;
  }
  .mobileBurger{
    width: 60px;
    margin: 20px 20px 20px 0;
  }
  .navStaf{
    width: 80%;
    margin: auto;
  }
}
</style>
