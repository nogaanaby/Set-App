<template>
  <div id="app">
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
  </a>
<gameMenu></gameMenu>
    <div v-bind:class="{blur: blur}" class="main">
      <router-link to="/CardFront" class="link"></router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SetInstractions from '@/components/Set_Instractions'
import CardFront from '@/components/CardFront.vue'
import design from '@/components/design.vue'
import gameMenu from '@/components/nav.vue'

export default {
  name: 'app',
  components: {
    SetInstractions,
    CardFront,
    gameMenu,
    design
  },
  data () {
    return {
      menu: false,
      blur: false
    }
  },
  methods: {
    openMenu: function () {
      if (this.menu === false) {
        this.menu = true
        this.blur = true
      } else {
        this.menu = false
        this.blur = false
      }
    },
    closeMenu: function () {
      this.menu = false
      this.blur = false
    }
  }
}

</script>

<style>
@import './assets/w3.css';
@import './assets/bulma.css';
html{
  background-color: gainsboro;
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin: auto;
  width: 70%;
}
*{
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.openMenu{
  background: none;
  border: none;
  float: right;
}
.blur{
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -o-filter: blur(3px);
  -ms-filter: blur(3px);
  filter: blur(3px);
}
.menu{
  display: flex;
  flex-direction: column;
  border: solid 1px lightgrey;
  background-color: rgba(0,0, 0, 0.2);
  padding: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  animation: fade 1s linear;
}
@keyframes fade {
  0%{ opacity: 0 }
  50% { opacity: 1 }
}
#menuTitle{
  color: white;
}
.menuButtons{
  margin: 10px auto;
  padding: 10px;
  width: 10%;
}
#gameButton{
  padding: 10px 32px;
}
.link{
  text-decoration: none;
}
canvas{
  border: 1px solid gray;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 150px;
  justify-content: center;
  background-color: #f5f5f0;
  font: inherit;
  outline: inherit;
}
.vicon, .xicon{
    width: 20px;
    height: 20px;
}
ul{
  list-style-type: none;
}
.instractionText{
  width: 50%;
}
#arrowNext, #openMenu{
    float: right;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    margin-left:10%;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}
#arrowBack{
    float: left;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    margin-right:10%;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}
#arrowImg:hover{
    width:50px;
    height:50px;
}
h1 {
    font-size: 1.5em;
    text-align: center;
    margin: 5px;
}
.card-header{
  justify-content: center;        
}
</style>
