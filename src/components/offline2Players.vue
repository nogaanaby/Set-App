<template>
  <div class="game">
    <gameMenu></gameMenu>
      <div class="card" v-show="pageState === 'game'">
        <header class="card-header">
          <div class="greenButton"><a class="btn" @click="greenPress" :class="{green:whoPressed ==='non' || whoPressed ==='blue', greenPressed:whoPressed ==='green'}"><p style="margin-top: 9px;">space</p></a></div>
          <a class="button is-warning is-outlined roundedButton" @click = "findSet">
            <img class="tellMeIcon" src='@/assets/tellMe.png'>
          </a>
          <div class="player1Score">
            <a class="button is-success is-outlined roundedButton">
              <div class="collect player1Collected">
                <h1 id="collected">{{this.player1Collect.length / 3}}</h1>
                <h4 class="playerName">{{players.player1}}</h4>
              </div>
            </a>
          </div>
          <div class="player2Score">
            <a class="button is-purple is-outlined roundedButton">
              <div class="collect player2Collected">
                <h1 id="collected">{{this.player2Collect.length / 3}}</h1>
                <h4 class="playerName">{{players.player2}}</h4>
              </div>
            </a>
          </div>
          <a class="button is-orange is-outlined roundedButton" >
            <p id="time">{{formatTime()}}</p>
          </a>
          <div class="purpleButton"><a class="btn" @click="bluePress" :class="{blue:whoPressed ==='non' || whoPressed ==='green', bluePressed:whoPressed ==='blue'}"><p style="margin-top: 9px;">enter</p></a></div>       
        </header>
        <div class="card-content">
              <div class = "cardsContainer">
              <!--{{JSON.stringify(cards)}}-->
                <div v-for="(card, i) in cardsViewsOnTheTable" :key="card.index" class = "cardDiv" :class = "{notSet: notSet}">
                  <canvas id="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
                  <canvas id="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickedCard(card, i)" :class= "{blueClicked: card.state === 'blueClicked', greenClicked: card.state === 'greenClicked', zoomIn: card.state === 'isTaken', findSet: card.state === 'toldMe'}" ></canvas>
                </div>
              </div><!--end of cardsContainer-->
        </div>
      </div>
      <game-over v-if="pageState === 'over'"
        v-bind:collectedCardsLength="player1Collect.length"
        v-bind:fathersTitle="returnTheWinner()"
        v-bind:fathersColumn1="players.player1 + ' collected ' + player1Collect.length / 3 + ' sets'"
        v-bind:fathersColumn2="players.player2 + ' collected ' + player2Collect.length / 3 + ' sets'"></game-over>
  </div>
</template>
<script>
import utils from '../js/utils.js'
import store from '../js/store.js'
import { CardView } from '../js/CardViews.js'
import { CardsDeck } from '../js/CardsDeck.js'
import gameMenu from '@/components/nav.vue'
import gameOver from '@/components/gameOver.vue'
export default{
  name: 'offline2Players',
  components: {
    gameMenu,
    gameOver
  },
  data () {
    return {
      players: store.multplayerOffline,
      whoPressed: 'non',
      id: 0,
      notSet: false, // bazzes the cards in a mistaken set
      pageState: 'game',
      cardsViewsOnTheTable: [],
      cards: new CardsDeck(),
      collectedCards: [],
      player1Collect: [],
      player2Collect: [],
      set: [],
      startTime: 0,
      timeToPlay: 1 * 10 * 1000,
      timeLeft: 1 * 10 * 1000
    }
  },
  created () {
    // pull out random card from the card deck and puts it on the table
    for (let i = 0; i < 12; i++) {
      this.cardsViewsOnTheTable[i] = new CardView('notThereYet', 'notThereYet', utils.takeNewCard(this.cards.cardsDeckArray))
    }
    this.startTime = Date.now()
   // setInterval(this.countDown, 100)
  },
  mounted () {
    this.cardsViewsOnTheTable.forEach((card, i) => {
      card.shapeCanvas = this.$refs[`shape${i}`][0]
      card.cardCanvas = this.$refs[`card${i}`][0]
      card.drawCard()
    })
    utils.allwaysSetOnTheTable(this.cardsViewsOnTheTable, this.cards.CardsDeckArray)
  },
  methods: {
    /**************************************
     game
    *************************************/
    isSet: function () {
      if (utils.isSet(this.set, 0, 1, 2)) {
        if (this.whoPressed === 'green') {
          this.player2Collect.push(...this.set)
        } else if (this.whoPressed === 'blue') {
          this.player1Collect.push(...this.set)
        }
        return true
      } else {
        this.notSet = true
        utils.resetCardState(this.cardsViewsOnTheTable)
        return false
      }
    },

    clickedCard: function (card, i) {
      this.notSet = false
      if (card.state === 'blueClicked' || card.state === 'greenClicked') {
        card.state = 'unclicked'
        this.set.pop()
      } else {
        this.set.push(card)
        this.collectByPlayer(card)
        this.$forceUpdate()

        if (this.set.length === 3) {
          if (this.isSet()) {
            this.switchCards()
          }
          this.set.splice(0)
        }
      }
    }, // end of click

    switchCards: function () {
      this.cardsViewsOnTheTable.forEach((element, i) => {
        if (element.state === 'blueClicked' || element.state === 'greenClicked') {
          this.cardsViewsOnTheTable[i].setNewCardAtrr(utils.takeNewCard(this.cards.cardsDeckArray))
          element.state = 'isTaken'
        }
      })
      utils.allwaysSetOnTheTable(this.cardsViewsOnTheTable)
    },
    /**************************************
     2 pleyers staf
    *************************************/
    bluePress () {
      this.whoPressed = 'blue'
    },
    greenPress () {
      this.whoPressed = 'green'
    },
    collectByPlayer (card) {
      if (this.whoPressed === 'green') {
        card.state = 'greenClicked'
      } else if (this.whoPressed === 'blue') {
        card.state = 'blueClicked'
      }
    },
    returnTheWinner () {
      if (this.player1Collect > this.player2Collect) {
        return 'Congradulations! ' + this.players.player1 + ' Is The Winner!'
      } else if (this.player1Collect < this.player2Collect) {
        return 'Congradulations! ' + this.players.player2 + ' Is The Winner!'
      } else {
        return 'This Is A Tie!'
      }
    },
    playAgain () {
      this.player1Collect.splice(0)
      this.player2Collect.splice(0)
      this.pageState = 'game'
      this.timeLeft = this.timeToPlay
      this.startTime = Date.now()
      this.$forceUpdate()
    },

    /*****************************
     * fitures
     *************************/
    findSet () {
      utils.findSetButton(this.cardsViewsOnTheTable)
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
    }
  }
}
</script>

<style scoped>
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
  width: 35px;
  height: 35px;
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
  margin-top: 27px;
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
  border: solid 3px plum;
}

.playerName{
  color: black;
  margin-top: -10px;
}
.greenButton{
  margin-right: 14%;
}
.purpleButton{
  margin-left: 14%;
}
</style>
