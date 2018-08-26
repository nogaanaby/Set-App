<template>
  <div class="game template-div">
      <div class="card">
        <header class="card-header fadeInDown" v-if="pageState === 'game'">
          <div class="menu-fitures columns is-mobile">
            <help class = "column"
            v-bind:cardsViewsArray = "cardsViewsOnTheTable"
            v-bind:hintState = "hintState"
            @findSetEvent= "getHelp"></help>
            <score class = "column"
            v-bind:cards = "collectedCards.length"
            v-bind:nickname = "'sets'"
            v-bind:color = "'green'"
            v-bind:gameStatus = "'single'"
            v-bind:playerFound = "playerFound"></score>
            <clock class = "column"
            v-bind:timeToPlay = "timeToPlay"
            @timeOver= "gameOver"></clock>
          </div>
        </header>
        <div class="card-content fadeInDown">
          <div class = "cardsContainer" v-show="pageState === 'game'">
            <div v-for="(card, i) in cardsViewsOnTheTable" :key="card.index" class = "cardDiv" :class = "{notSet: notSet}">
              <canvas class="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
              <canvas class="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickedCard(card, i)" :class= "{clicked: card.state === 'clicked', zoomIn: card.state === 'isTaken', findSet: card.state === 'toldMe'}" ></canvas>
            </div>
          </div>
              <game-over v-if="pageState === 'over'"
                v-bind:winner="'you'"
                v-bind:fathersTitle="'Game Over'"
                v-bind:mainCollection = "collectedCards.length / 3"
                v-bind:gameStatus="single"
                @playAgainEvent= "playAgain"></game-over>
        </div>
      </div>
      <brand-footer class="footer"></brand-footer>
  </div>
</template>
<script>
import backGame, { CardsDeck } from '../js/backGame.js'
import frontGame from '../js/frontGame.js'
import clock from '@/components/clock.vue'
import help from '@/components/help.vue'
import score from '@/components/score.vue'
import gameOver from '@/components/gameOver.vue'
import gameMenu from '@/components/nav.vue'
import brandFooter from '@/components/brandFooter.vue'
import store from '../js/store.js'

export default{
  name: 'game',
  components: {
    gameOver,
    brandFooter,
    gameMenu,
    clock,
    help,
    score
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
      timeToPlay: 2 * 60 * 1000,
      hintState: 1,
      playerFound: false
    }
  },
  created () {
    this.cardsViewsOnTheTable = frontGame.createCanvases(this.cards.cardsDeckArray)
  },
  mounted () {
    this.cardsViewsOnTheTable.forEach((card, i) => {
      card.shapeCanvas = this.$refs[`shape${i}`][0]
      card.cardCanvas = this.$refs[`card${i}`][0]
      card.drawCard()
    })
    backGame.allwaysSetOnTheTable(this.cardsViewsOnTheTable, this.cards.cardsDeckArray, 1)
    if (store.onlineUsersCopy.users.length !== 0) {
      this.updateMyStatus('onGame')
    }
  },
  methods: {
    /**************************************
     game
    *************************************/
    isSet: function () {
      if (backGame.isSet(this.set, 0, 1, 2)) {
        this.collectedCards.push(...this.set)
        this.playerFound = true
        setTimeout(() => {
          this.playerFound = false
        }, 1000)
        return true
      } else {
        this.notSet = true
        backGame.resetCardState(this.cardsViewsOnTheTable)
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
            this.takeCardsAndHaveFun()
            this.flipDeck()
          }
          this.set.splice(0)
        }
      }
    }, // end of click

    takeCardsAndHaveFun () {
      this.cardsViewsOnTheTable = backGame.switchCards(this.cardsViewsOnTheTable, this.cards.cardsDeckArray, this.set)
      this.hintState = 1
      setTimeout(() => {
        backGame.resetCardState(this.cardsViewsOnTheTable)
      }, 1000)
    },
    flipDeck () {
      if (this.cards.cardsDeckArray.length <= 10) {
        console.log('flipping deck')
        this.cards = new CardsDeck()
        backGame.haveTheSameCard(this.cardsViewsOnTheTable, this.cards.cardsDeckArray)
      }
    },
    /*****************************
     * fitures
     *************************/
    getHelp (cardsArray) {
      if (this.hintState < 3) {
        this.cardsViewsOnTheTable = cardsArray
        this.hintState++
      }
    },
    playAgain () {
      this.collectedCards.splice(0)
      this.pageState = 'game'
      this.updateMyStatus('onGame')
      this.$forceUpdate()
    },
    gameOver () {
      this.pageState = 'over'
      backGame.resetCardState(this.cardsViewsOnTheTable)
      this.hintState = 1
      this.updateMyStatus('availble')
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
.column{
  padding: 0;
}
.card-header{
  padding: 0;
}
.fitures{
  margin: 0 7px;
}
</style>
