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
          <div class = "cardsContainer" v-if="pageState === 'game'">
            <div v-for="(card, i) in cardsViewsOnTheTable" :key="card.index" class = "cardDiv" :class = "{notSet: notSet}">
              <canvas class="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
              <canvas class="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickedCard(card, i)" :class= "{clicked: card.state === 'clicked', zoomIn: card.state === 'isTaken', findSet: card.state === 'toldMe'}" ></canvas>
            </div>
          </div>
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
import brandFooter from '@/components/brandFooter.vue'
import store from '../js/store.js'

export default{
  name: 'game',
  components: {
    gameOver,
    brandFooter
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
      timeToPlay: 2 * 60 * 1000,
      timeLeft: 2 * 60 * 1000
    }
  },
  created () {
    // pull out random card from the card deck and puts it on the table
    for (let i = 0; i < 12; i++) {
      this.cardsViewsOnTheTable[i] = new CardView('notThereYet', 'notThereYet', utils.takeNewCard(this.cards.cardsDeckArray))
    }
    this.startTime = Date.now()
    setInterval(this.countDown, 100)
  },
  mounted () {
    this.cardsViewsOnTheTable.forEach((card, i) => {
      card.shapeCanvas = this.$refs[`shape${i}`][0]
      card.cardCanvas = this.$refs[`card${i}`][0]
      card.drawCard()
    })
    utils.allwaysSetOnTheTable(this.cardsViewsOnTheTable, this.cards.cardsDeckArray)
    store.onGame = true
  },
  methods: {
    /**************************************
     game
    *************************************/
    isSet: function () {
      if (utils.isSet(this.set, 0, 1, 2)) {
        this.collectedCards.push(...this.set)
        return true
      } else {
        this.notSet = true
        this.resetCardState()
        return false
      }
    },

    clickedCard: function (card, i) {
      this.notSet = false
      if (card.state === 'clicked') {
        card.state = 'unclicked'
        this.set.pop()
      } else {
        this.set.push(card)
        card.state = 'clicked'
        this.$forceUpdate()

        if (this.set.length === 3) {
          if (this.isSet()) {
            this.switchCards()
            if (this.cards.cardsDeckArray.length <= 9) {
              this.cards = new CardsDeck()
            }
          }
          this.set.splice(0)
        }
      }
    }, // end of click

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
        this.$forceUpdate()
      }
    },
    formatTime () {
      return utils.formatTime(this.timeLeft)
    },
    playAgain () {
      location.reload()
    }
  }
}
</script>

<style scoped>

</style>
