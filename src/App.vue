<template>
  <div id="app">
    <button id="openMenu" @click="openMenu()"> <img id="menuImg" src='@/assets/menu.png' width="80px" height="60px"></button>
    <menu class="menu" v-show="menu">
      <h3 id="menuTitle">Menu Title</h3>
      <button class="menuButtons" id="instractionsButton"><router-link :to="{ name: 'SetInstractions' }" class="link">Instractions</router-link></button>
      <button class="menuButtons" id="gameButton" ><router-link to="/CardFront" class="link" >Game</router-link></button>
    </menu>
    <div v-bind:class="{blur: blur}">
      <router-link to="/CardFront" class="link"></router-link>
      <router-view></router-view>
    </div>
  </div>
</template>s

<script>
import SetInstractions from '@/components/Set_Instractions'
import CardFront from '@/components/CardFront.vue'

export default {
  name: 'app',
  components: {
    SetInstractions,
    CardFront
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
    }
  }
}

</script>

<style>
@import './assets/w3.css';
html{
  background-color: #ccc2d6;
  margin: 0px;
  padding: 0px;
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
  width: 26%;
  height: 90%;
  margin-left: 25px;
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
  background-color: ghostwhite;
  border: none;
}
#gameButton{
  padding: 10px 32px;
}
.link{
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin: auto;
  width: 30%;
}
*{
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
canvas{
  border: 1px solid gray;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 198px;
  justify-content: center;
  background-color: white;
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
    margin:5px;
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
    margin:5px;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
}
#arrowImg:hover{
    width:85px;
    height:65px;
}
</style>
