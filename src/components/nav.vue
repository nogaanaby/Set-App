<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="desktopLogo">
         <img class="myLogo" src='@/assets/logo-white-align-left.png'>
        </a>
        <a class="mobileOnly">
         <img class="myLogo" src='@/assets/logoMiddle.png'>
        </a>
        <a class="mobileBurger mobileOnly"> <router-link to="/start"><img src='@/assets/burgerWhite.png' width="50px" height="50px"></router-link></a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <a class="burger"> <router-link to="/start"><img src='@/assets/burgerWhite.png' width="50px" height="50px"></router-link></a>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'gameMenu',
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
    margin: auto;
  }
  .desktopLogo{
    display: none;
  }
  .mobileBurger{
    width: 35px;
  }
}
</style>
