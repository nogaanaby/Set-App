<template>
  <div id="app">
    <div class="main">
      <router-link to="/game" class="link"></router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import instractionsTables from '@/components/instractionsTables'
import game from '@/components/game.vue'
import gameMenu from '@/components/nav.vue'
import start from '@/components/start.vue'
import practice from '@/components/practice'

export default {
  name: 'app',
  components: {
    game,
    gameMenu,
    start,
    instractionsTables,
    practice
  },
  data () {
    return {

    }
  },
  methods: {

  }
}

</script>

<style>
@import './assets/w3.css';
@import './assets/bulma.css';
@import './assets/animations.css';
@import '.././node_modules/vue2-animate/dist/vue2-animate.min.css';

/*************************************
Mobile
***************************************/
@media only screen and (max-width: 768px) {
  html, #app, .card {
    height: 600px;
  }
}
/*************************************
Desktop
***************************************/
@media only screen and (min-width: 769px) {
  #app {
    width: 70%;
  }
  .card{
    height: 100%;
  }
  .card-content{
    padding-bottom: 0;
  }
}
/*************************************
All Devices
***************************************/

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
h1 {
    font-size: 1.5em;
    text-align: center;
    margin: 5px;
}
.card-header{
  justify-content: center;
}
.button:after{
  border: none;
}

/**************************************
animations
***************************************/
  .wrong{
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
