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
            v-bind:cards = "player2Collect.length"
            v-bind:nickname = "opponentNickname"
            v-bind:color = "'grey'"
            v-bind:gameStatus = "'single'"></score>

            <score class = "column"
            v-bind:cards = "myCollection.length"
            v-bind:nickname = "myNickname"
            v-bind:color = "'green'"
            v-bind:gameStatus = "'single'"></score>

            <clock class = "column"
            v-bind:timeToPlay = "timeToPlay"
            @timeOver= "gameOver"></clock>
          </div>
        </header>
        <div class="card-content fadeInDown">
              <div class = "cardsContainer" v-show="pageState === 'game'">
              <!--{{JSON.stringify(cards)}}-->
                <div v-for="(card, i) in cardsOnTheTable" :key="card.index" class = "cardDiv" :class = "{notSet: notSet}">
                  <canvas class="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
                  <canvas class="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickedCard(card, i)" :class= "{blueClicked: card.state === 'blueClicked', greenClicked: card.state === 'greenClicked', zoomIn: card.state === 'isTaken', findSet: card.state === 'toldMe'}" ></canvas>
                </div>
              </div><!--end of cardsContainer-->
            <game-over class="game-over" v-if="pageState === 'over'"
              v-bind:collectedCardsLength="player1Collect.length"
              v-bind:fathersTitle="returnTheWinner()"
              v-bind:fathersColumn1="players.player1 + ' collected ' + player1Collect.length / 3 + ' sets'"
              v-bind:fathersColumn2="players.player2 + ' collected ' + player2Collect.length / 3 + ' sets'"
              @playAgainEvent= "playAgain"></game-over>
        </div>
      </div>
    <brand-footer class="footer"></brand-footer>
  </div>
</template>
<script>
import clock from '@/components/clock.vue'
import help from '@/components/help.vue'
import score from '@/components/score.vue'
import utils from '../js/utils.js'
import store from '../js/store.js'
import { CardView } from '../js/CardViews.js'
import backGame, { CardsDeck } from '../js/backGame.js'
import frontGame from '../js/frontGame.js'
import gameOver from '@/components/gameOver.vue'
import brandFooter from '@/components/brandFooter.vue'
export default{
  name: 'offline2Players',
  components: {
    gameOver,
    brandFooter,
    clock,
    help,
    score
  },
  data () {
    return {
      myNickname: store.thisUser.nickname,
      opponentNickname: '',
      id: 0,
      notSet: false, // bazzes the cards in a mistaken set
      pageState: 'game',
      cardsViewsOnTheTable: [],
      cardsOnTheTable: store.cardsOnTheTable,
      collectedCards: [],
      myCollection: [],
      player2Collect: [],
      set: [],
      timeToPlay: 4 * 60 * 1000,
      hintState: 1
    }
  },
  created () {
    console.log(this.cardsOnTheTable)
    this.findTheOpponent()
  },
  mounted () {
    // utils.allwaysSetOnTheTable(this.cardsViewsOnTheTable, this.cards.CardsDeckArray)
    if (store.onlineUsersCopy.users.length !== 0) {
      this.updateMyStatus('onGame')
    }
    for (let i = 0; i < 12; i++) {
      this.cardsViewsOnTheTable[i] = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], this.cardsOnTheTable[i])
      this.cardsViewsOnTheTable[i].drawCard()
    }
  },
  sockets: {
    opponentHasClicked (card) {
      const findCard = this.cardsViewsOnTheTable.find(cv => cv.shape === card.shape &&
                                                      cv.color === card.color &&
                                                      cv.number === card.number &&
                                                      cv.fill === card.fill)
      findCard.state = 'blueClicked'
      console.log(findCard)
      this.$forceUpdate()
    }
  },
  methods: {
    findTheOpponent () {
      if (store.inviter.nickname === '') {
        this.opponentNickname = store.invited.nickname
      } else {
        this.opponentNickname = store.inviter.nickname
      }
    },
    putCards () {
      for (let i = 0; i < 12; i++) {
        this.cardsViewsOnTheTable[i] = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], this.cardsOnTheTable[i])
        this.cardsViewsOnTheTable[i].drawCard()
        // console.log(this.cardsViewsOnTheTable[i])
      }
    },
    /**************************************
     game
    *************************************/
    isSet: function () {
      if (backGame.isSet(this.set, 0, 1, 2)) {
        this.myCollection.push(...this.set)
        return true
      } else {
        this.notSet = true
        backGame.resetCardState(this.cardsViewsOnTheTable)
        return false
      }
    },

    clickedCard: function (card, i) {
      this.notSet = false
      if (card.state === 'greenClicked') {
        card.state = 'unclicked'
        this.set.pop()
      } else {
        this.set.push(card)
        this.sendTheClickToTheOpponent(card)
        card.state = 'greenClicked'
        this.$forceUpdate()

        if (this.set.length === 3) {
          if (this.isSet()) {
            this.cardsViewsOnTheTable = backGame.switchCards(this.cardsViewsOnTheTable, this.cards.cardsDeckArray, this.set)
            if (this.cards.cardsDeckArray.length <= 9) {
              this.cards = new CardsDeck()
            }
          }
          this.set.splice(0)
        }
      }
    },
    sendTheClickToTheOpponent (card) {
      const oppAndCard = {
        nickname: this.opponentNickname,
        card: card
      }
      this.$socket.emit('clickCard', oppAndCard)
    },
    /**************************************
     2 pleyers staf
    *************************************/
    returnTheWinner () {
      if (this.player1Collect > this.player2Collect) {
        return 'Congradulations! ' + this.players.player1 + ' Is The Winner!'
      } else if (this.player1Collect < this.player2Collect) {
        return 'Congradulations! ' + this.players.player2 + ' Is The Winner!'
      } else {
        return 'This Is A Tie!'
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
      this.player1Collect.splice(0)
      this.player2Collect.splice(0)
      this.pageState = 'game'
      this.updateMyStatus('onGame')
      this.$forceUpdate()
    },
    gameOver () {
      this.pageState = 'over'
      this.resetCardsState()
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
/*************************************
2players game
***************************************/
  .btn {
  border-radius: 50%;
  font-size: 1em;
  text-decoration: none;
  margin: 15px;
  color: #fff;
  position: relative;
  display: inline-block;
}

.btn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 0px 0px 0px;
}

.blue {
  background-color: #d173d1;
  box-shadow:0 5px 0px 0px purple;
}

.bluePressed {
  background-color: plum;
}

.greenPressed {
  background-color: #48E68B;
}

.blue:hover {
  background-color: plum;
}

.green {
  background-color: #23D160;
  box-shadow: 0px 5px 0px 0px #15B358;
}

.green:hover {
  background-color: #48E68B;
}

.greenClicked{
  border: solid 3px #48E68B;
}

.blueClicked{
  border: solid 3px lightgray;
}

.playerName{
  color: black;
  margin-top: -10px;
}

.card-content{
  display: flex;
}
.game-over{
  margin: auto;
}

/* tablet & mobile */
@media only screen and (max-width: 767px) {
  .purpleButton{
    width: 20%;
    float: right;
  }
  .greenButton{
    width: 20%;
    float: left;
  }
}
/* desktop */
@media only screen and (min-width: 768px) {
  .purpleButton{
    display:flex;
    order: 3;
  }
}
@media only screen and (min-width: 560px) {
  .btn {
    width: 60px;
    height: 60px;
  }
}
@media only screen and (max-width: 559px) {
  .btn {
    width: 50px;
    height: 50px;
  }
}
</style>
