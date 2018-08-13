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
import brandFooter from '@/components/brandFooter'

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
    offlineSignUp,
    brandFooter
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

/* desktop & big tablet*/
@media only screen and (min-width: 768px) {
  #app {
    width: 70%;
  }
}

/* tablet & desktop */
@media only screen and (min-width: 560px) {
  .cardsContainer {
    width: 60%;
    height: 100%;
  }
  .roundedButton{
  height: 70px;
  width: 70px;
  }
  .title-in{
    margin: 0;
    font-size: 2em;
    color: black;
  }
}

/* tablet & mobile */
@media only screen and (max-width: 559px) {
  .cardsContainer {
    min-width: 100%;
    height: 100%;
  }

  .menu-links, a{
    font-size: 0.7em;
  }
  .roundedButton{
    height: 50px;
    width: 50px;
  }
  .title-in{
    margin: 0;
    font-size: 1.2em;
    color: black;
  }
}

/***********************
 GENERAL DESIGN
 **********************/
html, .main, body, .template-div{
  height: 100%;
}
.card-content, .card{
  height: 80%;
}
.footer{
  padding: 2% auto;
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
  margin-bottom: 0px;
  margin: auto;
  height: 100%;
}
*{
  font-family: cursive;
}
  .cardText{
    font-family:Arial, Helvetica, sans-serif;
  }

.link{
  text-decoration: none;
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

.small-p{
  font-size: 0.7em;
  color: black;
}
.noga-title{
  text-align: center;
  font-size: 1.5em;
  font-family: Kirang Haerang, cursive;
  margin: auto;
}
.center-medium-title{
  text-align: center;
  font-size: 1em;
  font-family: Kirang Haerang, cursive;
  margin: auto;
}
.footer{
  padding: 0;
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

.menu-fitures{/*the rounded buttons on the top*/
  margin: auto;
}
.cardCanvas{
  width: 100%;
  object-fit: contain;
  height: 100%;
  max-width: 85px;
  min-width: 55px;
  border: 1px solid lightgrey;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10%;
  background-color:white;
}
/**mobile**/
@media only screen and (max-width: 500px) {
  .cardCanvas{
  max-height: 80px;
}
}
.cardDiv {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 17%;
  height: 28%;
  margin: 2% 2%;
}
.clicked {
  border: solid 2px #33cccc;
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
  border: solid 3px #FFDD58;
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