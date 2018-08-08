<template>
  <div class="intemidiate game">
    <gameMenu></gameMenu>
      <div class="card" v-if="pageState === 'game'">
        <header class="card-header">
          <div class="player1Button" v-if="participans === 'copple'">
            <h1 style="color: #6FC6FF">{{players.player1}}</h1>
            <a class="btn" @click="purplePress" :class="{purple:whoPressed ==='non' || whoPressed ==='green', purplePressed:whoPressed ==='purple'}">F7</a>
          </div>
          <a class="button is-warning is-outlined roundedButton" id="tellMe" @click = "findSetBotton()">
            <img class="tellMeIcon" src='@/assets/tellMe.png'>
          </a>
          <a class="button is-success is-outlined roundedButton" >
            <div class="setCollect">
              <h1 id="collected" v-if="participans === 'single'">
              {{this.singleCollection.length / 3}}
              </h1>
              <h1 id="collected" v-if="participans === 'copple'">
              {{this.player1Collect.length / 3}}
              </h1>
              <p>Sets</p>
            </div>
          </a>
          <a class="button is-purple is-outlined roundedButton" v-if="participans === 'copple'">
            <div class="setCollect">
              <h1 id="collected">
              {{this.player2Collect.length / 3}}
              </h1>
              <p>Sets</p>
            </div>
          </a>
          <div class="clock">
            <a class="button is-link is-outlined roundedButton" >
              <p id="time">{{formatTime(timeLeft)}}</p>
            </a>
          </div>
          <div class="player2Button" v-if="participans === 'copple'">
            <h1 style="color: #6FC6FF">{{players.player2}}</h1>
            <a class="btn" @click="greenPress" :class="{green:whoPressed ==='non' || whoPressed ==='purple', greenPressed:whoPressed ==='green'}">F12</a>
          </div>
        </header>
        <div class="card-content">
            <div class = "cardsContainer">
              <!--{{JSON.stringify(cards)}}-->
                <div v-for="(card, i) in cardsViewsOnTheTable" :key="card.index" class = "cardDiv" :class = "{notSet: notSet}">
                  <canvas id="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
                  <canvas id="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickedCard(card, i)" :class= "{clicked: card.state === 'clicked', zoomIn: card.state === 'isTaken', findSet: card.state === 'toldMe'}" ></canvas>
                </div>
          </div>
        </div>
      </div>
    <game-over v-if="pageState === 'over'"
     v-bind:singleCollectionLength="singleCollection.length"></game-over>
  </div>
</template>
<script>
import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import { CardsDeck } from '../js/CardsDeck.js'
import gameMenu from '@/components/nav.vue'
import gameOver from '@/components/gameOver.vue'
import store from '../js/store.js'
export default{
  name: 'together',
  components: {
    gameMenu,
    gameOver
  },
  data () {
    return {
      participans: 'copple',
      players: store.multplayerOffline,
      whoPressed: 'non',
      id: 0,
      notSet: false, // bazzes the cards in a mistaken set
      pageState: 'game',
      cardsViewsOnTheTable: [],
      cards: new CardsDeck(),
      singleCollection: [],
      player1Collect: [],
      player2Collect: [],
      set: [],
      startTime: 0,
      timeToPlay: 1 * 20 * 1000,
      timeLeft: 1 * 20 * 1000
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
    this.allwaysSetOnTheTable()
  },
  methods: {
    /**************************************
     game
    *************************************/
    isSet: function () {
      if (utils.isSet(this.set, 0, 1, 2)) {
        this.singleCollection.push(...this.set)
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
      this.allwaysSetOnTheTable()
    },

    resetCardState: function () {
      this.cardsViewsOnTheTable.forEach((element) => { element.state = 'unclicked' })
    },

    allwaysSetOnTheTable () {
      while (utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2) === 'no set here') {
        this.cardsViewsOnTheTable[1].setNewCardAtrr(utils.takeNewCard(this.cards.cardsDeckArray))
      }
    },

    /**************************************
     fitures
    *************************************/
    findSetBotton: function () {
      if (utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2) !== 'no set here') {
        const setArray = utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2)
        this.cardsViewsOnTheTable.forEach((card, i) => {
          if (setArray[0] === card || setArray[1] === card || setArray[2] === card) {
            this.cardsViewsOnTheTable[i].state = 'toldMe'
            this.$forceUpdate()
          }
        })
      } else {
        console.log('no set here')
      }
    },
    countDown () {
      const timeFromLoad = Date.now() - this.startTime
      this.timeLeft = this.timeToPlay - timeFromLoad

      if (this.timeLeft <= 0) {
        this.pageState = 'over'
        this.$forceUpdate()
      }
    },
    formatTime (ms) {
      let seconds = '' + Math.floor((ms / 1000) % 60)
      let minutes = '' + Math.floor((ms / 1000 / 60) % 60)
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return '0' + minutes + ' : ' + seconds
    },
    PlayAgain: function () {
      location.reload()
    }
  }
}
</script>

<style scoped>
/*************************************
All device
***************************************/
  .game {
  display: flex;
  justify-content: center;
  flex-direction: column;
  }
  #setGame{
    margin: 0px;
  }

  #cardCanvas{
    width: 100%;
  object-fit: contain;
    height: 100%;
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
  .findSet {
  border: solid 3px #ffdd57;
  }
  #time{
    font-family:cursive;
    font-size: 1.1em;
  }
  .button.is-link:hover{
    background-color: #ff6500;
    border: solid 1px #f28b4b;
  }
  .button.is-link{
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
/*************************************
desktop
***************************************/
@media only screen and (min-width: 769px) {
  .game {
  display: flex;
  justify-content: center;
  flex-direction: column;
  }
  #setGame{
    margin: 0px;
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
  .cardsContainer {
  display: flex;
  flex-direction: row;
  width: 520px;
  height: 420px;
  margin: 0px auto 30px auto;
  flex-wrap: wrap;
  justify-content: center;
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
  .columns{
    margin: 30px;
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
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
.collectedOver{
  float: left;
}
.gameOver{
  margin: 20px;
}
.playAgain{
  margin-top: 40px;
  margin-bottom: 20px;
  width: 40%;
  font-size: 1em;
}
}

/*************************************
2players game
***************************************/
  .btn {
  border-radius: 5px;
  padding: 15px 25px;
  font-size: 1em;
  text-decoration: none;
  margin: 20px;
  color: #fff;
  position: relative;
  display: inline-block;
  max-width: 100px;
}

.btn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 0px 0px 0px;
}

.purple {
  background-color: plum;
  box-shadow:0 10px 0px 0px purple;
}

.purplePressed {
  margin-top: 27px;
  background-color: plum;
}

.greenPressed {
  background-color: #48E68B;
}

.purple:hover {
  background-color: plum;
}

.green {
  background-color: #2ecc71;
  box-shadow: 0px 10px 0px 0px #15B358;
}

.green:hover {
  background-color: #48E68B;
}
.collect{
  margin: 0 35px;
}

.columns{
  margin: 30px;
}

.greenClicked{
  border: solid 3px #48E68B;
}

.purpleClicked{
  border: solid 3px purple;
}
</style>
