<template>
  <div id="app">
    <div class="main">
      <gameMenu></gameMenu>
      <invitation class="massage fadeIn"
      v-if="openMassage.gotInvitation"
      v-bind:massage = "massageContent"
      v-bind:pingpong = "pinpongStatus">
      </invitation>
      <router-link to="/game" class="link"></router-link>
      <router-view :class='{blur: openMassage.gotInvitation}'></router-view>
    </div>
  </div>
</template>

<script>
import store from '@/js/store.js'
import instractionsTables from '@/components/instractionsTables'
import game from '@/components/game.vue'
import gameMenu from '@/components/nav.vue'
import start from '@/components/start.vue'
import practice from '@/components/practice'
import offline2Players from '@/components/offline2Players'
import onlineSignUp from '@/components/onlineSignUp'
import offlineSignUp from '@/components/offlineSignUp'
import brandFooter from '@/components/brandFooter'
import invitation from '@/components/invitation.vue'
import pause from '@/components/pause.vue'
import fourInosentCards from '@/components/fourInosentCards.vue'
import copyOfGame from '@/components/copyOfGame.vue'
import onlineGame from '@/components/onlineGame.vue'

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
    brandFooter,
    invitation,
    pause,
    fourInosentCards,
    copyOfGame,
    onlineGame
  },
  data () {
    return {
      openMassage: store.gotMassage,
      inviter: store.inviter,
      gotInv: store.gotMassage,
      massageContent: '',
      pinpongStatus: ''
    }
  },
  mounted () {

  },
  sockets: { // listeners
    getInvitation (sender) {
      this.inviter.nickname = sender.nickname
      this.massageContent = `Do You Want To Play With ` + sender.nickname + ` ?`
      this.pinpongStatus = 'firstCatch'
      this.gotInv.gotInvitation = true
    },
    getTheAccept (invited) {
      this.massageContent = invited.nickname + ' got your invitation, start to play now!'
      this.gotInv.gotInvitation = true
      this.pinpongStatus = 'secondCatch'
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
@import url('https://fonts.googleapis.com/css?family=Jua');

/* desktop & big tablet*/
@media only screen and (min-width: 768px) {
  #app {
    width: 70%;
  }
}

/* tablet & desktop */
@media only screen and (min-width: 560px) {
  .cardsContainer {
    width: 50%;
    height: 90%;
  }
  .roundedButton{
  height: 60px;
  width: 60px;
  }
  .title-in{
    margin: 0;
    font-size: 2em;
    color: black;
  }
  .noga-title{
    font-size: 1.5em;
  }
  #time{
    font-size: 1em;
    color: black;
  }
}

/* tablet & mobile */
@media only screen and (max-width: 559px) {
  .cardsContainer {
    min-width: 100%;
    height: 80%;
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
  .noga-title{
    font-size: 1.3em;
  }
  #time{
    font-size: 0.7em;
    color: black;
  }
}

/***********************
 GENERAL DESIGN
 **********************/
html, .main, body{
  height: 100%;
}

.template-div{
  height: 82%;
}
.card{
  height: 100%;
}
.card-content{
  height: 80%;
}
.card-header{
  padding-top: 5px;
  padding-bottom: 5px;
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
  font-family:'Jua', 'Avenir', Helvetica, Arial, sans-serif;
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
  font-family: 'Jua', sans-serif;
}
  .cardText{
    font-family:'Jua', Helvetica, sans-serif;
  }

.link, a{
  text-decoration: none;
  color:  #404040;
}
a:hover{
  color:  #15B358;
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
  margin-top: -10px;
}
.p-small{
  font-size: 0.7em;
}
.noga-title{
  text-align: center;
  font-family: 'Jua', cursive;
  margin: auto;
  color: #404040;
}
.noga{
   font-family: 'Jua', cursive;
   color: #404040;
}
.center-medium-title{
  text-align: center;
  font-size: 1em;
  font-family: 'Jua', cursive;
  margin: auto;
}
.footer{
  padding: 0;
}

.massage{
  position: absolute;
  z-index: 1;
  width: 50%;
  margin: 5% 10%;
}

/**************************************
GAME BOARD
***************************************/
.cardsContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
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
.isGreen{
  color: #15B358;
}
.isGrey{
  background-color: gray;
  color: gray;
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

.blur{
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
</style>
