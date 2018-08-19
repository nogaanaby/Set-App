<template>
  <div class="game template-div">
      <div class="card">
        <header class="card-header fadeInDown" v-if="pageState === 'game'">
          <div class="menu-fitures">
            <a class="button is-warning is-outlined roundedButton" id="tellMe" @click = "findSet">
              <img class="tellMeIcon" src='@/assets/tellMe.png'>
            </a>
            <a class="button is-success is-outlined roundedButton" >
              <div class="setCollect">
                <h1 class="title-in">
                {{this.collectedCards.length / 3}}
                </h1>
                <p class="small-p">Sets</p>
              </div>
            </a>
            <a class="button is-orange is-outlined roundedButton clock" >
              <p id="time">{{formatTime()}}</p>
            </a>
          </div>
        </header>
        <div class="card-content fadeInDown">
          <four-inosent-cards
          @collectByPlayerEvent= "collectByPlayer">
          </four-inosent-cards>
              <game-over v-if="pageState === 'over'"
                v-bind:collectedCardsLength="collectedCards.length"
                v-bind:fathersTitle="'Game Over'"
                v-bind:fathersColumn1="'you collected ' + collectedCards.length / 3 + ' sets'"
                v-bind:fathersColumn2="'you collected ' + collectedCards.length + ' cards'"
                @playAgainEvent= "playAgain"></game-over>
        </div>
      </div>
      <brand-footer class="footer"></brand-footer>
  </div>
</template>
<script>
import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import { CardsDeck } from '../js/CardsDeck.js'
import gameOver from '@/components/gameOver.vue'
import gameMenu from '@/components/nav.vue'
import brandFooter from '@/components/brandFooter.vue'
import fourInosentCards from '@/components/fourInosentCards.vue'
import store from '../js/store.js'

export default{
  name: 'copyOfGame',
  components: {
    gameOver,
    brandFooter,
    gameMenu,
    fourInosentCards
  },
  data () {
    return {
      id: 0,
      notSet: false, // bazzes the cards in a mistaken set
      pageState: 'game',
      cardsViewsOnTheTable: [],
      cards: new CardsDeck(),
      collectedCards: [],
      set: [],
      startTime: 0,
      timeToPlay: 1 * 10 * 1000,
      timeLeft: 2 * 60 * 1000,
      runTimer: ''
    }
  },
  created () {

    this.startTime = Date.now()
    // this.runTimer = setInterval(this.countDown, 100)
  },
  mounted () {
  },
  methods: {
    /**************************************
     game
    *************************************/

    ifCardStateIsClicked () {

    },

    switchCards: function () {
      this.cardsViewsOnTheTable.forEach((element, i) => {
        if (element.state === 'clicked') {
          this.cardsViewsOnTheTable[i].setNewCardAtrr(utils.takeNewCard(this.cards.cardsDeckArray))
          element.state = 'isTaken'
        }
      })
      utils.allwaysSetOnTheTable(this.cardsViewsOnTheTable, this.cards.cardsDeckArray)
      console.log(this.cards.cardsDeckArray.length)
    },

    resetCardState: function () {
      this.cardsViewsOnTheTable.forEach((element) => { element.state = 'unclicked' })
    },
    /*****************************
     * fitures
     *************************/
    findSet () {
      utils.findSetButton(this.cardsViewsOnTheTable)
      this.$forceUpdate()
    },
    countDown () {
      this.timeLeft = utils.countDown(this.startTime, this.timeToPlay)
      if (this.timeLeft === 0) {
        this.pageState = 'over'
        clearInterval(this.runTimer)
        this.updateMyStatus('availble')
      }
    },
    formatTime () {
      return utils.formatTime(this.timeLeft)
    },
    playAgain () {
      this.collectedCards.splice(0)
      this.pageState = 'game'
      this.timeLeft = this.timeToPlay
      this.startTime = Date.now()
      this.updateMyStatus('onGame')
      this.runTimer = setInterval(this.countDown, 100)
      this.$forceUpdate()
    },
    updateMyStatus (status) {
      const userAndStatus = {
        nickname: store.thisUser.nickname,
        status: status
      }
      this.$socket.emit('updateOnChangingStatus', userAndStatus)
    }
  }
}
</script>

<style scoped>

</style>