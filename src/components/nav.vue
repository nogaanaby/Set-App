<template>
  <div class="main">
  <nav class="navbar is-primary" role="navigation" aria-label="dropdown navigation">
  <div class="navbar-menu">

    <div class="navbar-start">
        <a class="logo">
         <img id="myLogo" src='@/assets/logo-white-align-left.png' width="240px" height="80px">
        </a>
    </div>

    <div class="navbar-end" @click="openMenu()">
      <div class="navbar-item has-dropdown is-active">
        <a class="navbar-link">
        </a>

        <div class="navbar-dropdown is-right" v-show="menu">
          <a class="navbar-item">
            <div @click="closeMenu()" ><router-link to="/CardFront" class="menuButtons">Game</router-link></div>
          </a>
          <a class="navbar-item">
            <div @click="closeMenu()" ><router-link to="/design" class="menuButtons">design</router-link></div>
          </a>
          <a class="navbar-item">
            <div @click="closeMenu()" ><router-link to="/instractionsTables" class="menuButtons">Learn To Play</router-link></div>
          </a>           
          <hr class="navbar-divider">
          <div class="navbar-item">
            Version 0.7.1
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

    </div>
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
    openMenu: function () {
      if (this.menu === false) {
        this.menu = true
      } else {
        this.menu = false
      }
    },
    closeMenu: function () {
      this.menu = false
    }
  }
}
</script>

<style scoped>
#myLogo{
  margin: 5px 20px;
}
</style>
