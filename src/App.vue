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
import offline2Players from '@/components/offline2Players'

export default {
  name: 'app',
  components: {
    game,
    gameMenu,
    start,
    instractionsTables,
    practice,
    offline2Players
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

  /**************************************
  GAME BOARD
  ***************************************/
  
/*******************
All devices
********************/

/**********
main game
***********/
  .game {
  display: flex;
  justify-content: center;
  flex-direction: column;
  }
  #cardCanvas{
    width: 100%;
    object-fit: contain;
    height: 100%;
  }
  .cardDiv {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .clicked {
    border: solid 3px grey;
  }
  .takeSet {
      opacity: 1;
      animation: fade 0.5s linear;
  }
  .notSet{
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

/**********
fitures
***********/
  .findSet {
    border: solid 3px #ffdd57;
  }
  #time{
    font-family:cursive;
    font-size: 1.1em;
  }
  .button.is-orange:hover{
    background-color: #ff6500;
    border: solid 1px #f28b4b;
  }
  .button.is-orange{
    border: solid 1px #ff6500;
  }
    .button.is-purple:hover{
    background-color: plum;
    border: solid 1px purple;
  }
  .button.is-purple{
    border: solid 1px purple;
  }
  .roundedButton{
    margin: 15px;
    height: 70px;
    width: 70px;
    border-radius: 50%;
  }
  #collected{
    font-size: 2em;
    margin: 0;
    color: black;
  }
  p{
    font-size: 0.7em;
    color: black;
  }
  .clock{
    margin-left: 5%;
  }
  #tellMe{
    margin-right: 6%;
  }
/*************************************
desktop
***************************************/
@media only screen and (min-width: 769px) {
/**********
main game
***********/
  .cardsContainer {
  display: flex;
  flex-direction: row;
  width: 60%;
  height: 400px;
  margin: 0px auto 30px auto;
  flex-wrap: wrap;
  justify-content: center;
  }
  .cardDiv {
    width: 17%;
    height: 28%;
    margin: 0 2%;
  }
}

/*************************************
mobile
***************************************/
@media only screen and (max-width: 768px) {
    body {
        background-color: lightblue;
    }
    .cardDiv {
    width: 20%;
    height: 30%;
    margin: 0 1%;
  }

  .cardsContainer {
    display: flex;
    flex-direction: row;
    width: 260px;
    height: 270px;
    margin: 30px auto 30px auto;
    flex-wrap: wrap;
    justify-content: center;
  }

  .card-content{
    padding:0;
  }

  .button{
    width: 20%;
    font-size: 0.75em;
  }

  #tellMe{
    margin: 10px 20px;
  }
.playAgain{
  margin-top: 40px;
  margin-bottom: 20px;
  width: 40%;
  font-size: 1em;
}
}
</style>
