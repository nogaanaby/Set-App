<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="desktopLogo">
         <img id="myLogo" src='@/assets/logo-white-align-left.png'>
        </a>
        <a class="mobileLogo">
         <img id="myLogo" src='@/assets/logoMiddle.png'>
        </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <a id="arrowMain"> <router-link to="/start"><img id="arrowImg" src='@/assets/arrowRightWhite.png' width="50px" height="50px"></router-link></a>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'gameMenu',
  data () {
    return {
      menu: false,
      blur: false
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
  #myLogo{
    width: 30%;
    float: left;
    margin: 10px;
  }
  #arrowMain{
    margin: 15px;
  }
  .mobileLogo{
    display: none;
  }
}
/*************************************
mobile
***************************************/
@media only screen and (max-width: 768px) {
  #myLogo{
    width: 70%;
    margin: auto;
  }
  .desktopLogo{
    display: none;
  }
}
</style>
