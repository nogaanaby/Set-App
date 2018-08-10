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
import onlineSignUp from '@/components/onlineSignUp'
import offlineSignUp from '@/components/offlineSignUp'

export default {
  name: 'app',
  components: {
    game,
    gameMenu,
    start,
    instractionsTables,
    practice,
    offline2Players,
    onlineSignUp,
    offlineSignUp
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

/* only for desktop */
@media only screen and (min-width: 768px) {
  #app {
    width: 70%;
  }
}

/* big tablet & mobile */
@media only screen and (max-width: 560px) {
  .cardsContainer {
    width: 500px;
    height: 100%;
  }
}

/* tablet & mobile */
@media only screen and (max-width: 560px) {
  .cardsContainer {
    max-width: 70%;
    height: 400px;
  }

  .menu-links{
    font-size: 0.7em;
  }
}
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
  background-color: #f5f5f0;
}
.vertical-gap-medium{
  margin-left: 10px;
  margin-right: 10px;
}
.vertical-gap-small{
  margin-left: 5px;
  margin-right: 5px;
}

.horizontal-seperator{
  margin-top: 10%;
}

  /**************************************
  GAME BOARD
  ***************************************/
  .cardsContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
  }
/*******************
All devices
********************/

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
    width: 17%;
    height: 28%;
    margin: 0 2%;
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
    border: solid 4px #23D160;
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
  .is-green{
    color: #15B358;
  }
  .roundedButton{
    margin: 15px;
    height: 70px;
    width: 70px;
    border-radius: 50%;
  }

  .input-button{
    height: inherit;
  }
  .is-grouped{
    display: flex;
    justify-content: space-between;
  }
  .is-narrow{
    width: 40%;
    margin: auto;
    min-width: 200px;
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