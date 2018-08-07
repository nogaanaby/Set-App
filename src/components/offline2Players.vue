<template>
  <div class="game">
    <gameMenu></gameMenu>
      <div class="card" v-if="pageState === 'game'">
        <header class="card-header">
          <a class="button is-outlined" id="tellMe" @click = "findSetBotton()">Tell Me</a>
          <div class="collect player1Collected">
            <h1 style="color: #6FC6FF">{{players.player1}}</h1>
            <h4>{{this.player1Collect.length / 3}} sets </h4>
          </div>
          <div class="collect player2Collected">
            <h1 style="color: #2ecc71">{{players.player2}}</h1>
            <h4>{{this.player2Collect.length / 3}} sets </h4>
          </div>
          <div class="clock"><img class="icon" src='@/assets/clock-icon.png'><p id="time">{{formatTime(timeLeft)}}</p></div>
        </header>
        <div class="card-content columns">
          <div class="colum"><a class="btn" @click="bluePress" :class="{blue:whoPressed ==='non' || whoPressed ==='green', bluePressed:whoPressed ==='blue'}">{{player1}}</a></div>
            <div class="column">
              <div class = "cardsContainer">
              <!--{{JSON.stringify(cards)}}-->
                <div v-for="(card, i) in cardsViewsOnTheTable" :key="card.index" class = "cardDiv" :class = "{notSet: notSet}">
                  <canvas id="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
                  <canvas id="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickedCard(card, i)" :class= "{blueClicked: card.state === 'blueClicked', greenClicked: card.state === 'greenClicked', zoomIn: card.state === 'isTaken', findSet: card.state === 'toldMe'}" ></canvas>
                </div>
              <slot></slot>
              </div><!--end of cardsContainer-->
            </div><!--end of column-->
          <div class="colum"><a class="btn" @click="greenPress" :class="{green:whoPressed ==='non' || whoPressed ==='blue', greenPressed:whoPressed ==='green'}">{{player2}}</a></div>
        </div>
      </div>
      <div class="card" v-if="pageState === 'over'">
        <header class="card-header fadeInDown">
          <h1 style="font-size: 2em">Congradulations, {{returnTheWinner()}}</h1>
        </header>
        <div class="card-content">
          <a class="button is-medium is-success playAgain" @click = "PlayAgain()">Play Again</a>
          <div class="columns gameOver">
            <p class="column collectedOver">
              {{player1}} Collected : <br> {{player1Collect.length / 3}} Sets
            </p>
            <p class="column bestScore">
              {{player2}} Collected : <br> {{player2Collect.length / 3}} Sets
            </p>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import utils from '../js/utils.js'
import store from '../js/store.js'
import { CardView } from '../js/CardViews.js'
import { bus } from '../main'
import gameMenu from '@/components/nav.vue'
export default{
  name: 'offline2Players',
  components: {
    gameMenu
  },
  data () {
    return {
      players: store.multplayerOffline,
      whoPressed: 'non',
      id: 0,
      notSet: false, // bazzes the cards in a mistaken set
      pageState: 'game',
      cardsViewsOnTheTable: [],
      cards: [],
      collectedCards: [],
      player1Collect: [],
      player2Collect: [],
      cardProperties: {
        shapes: ['rect', 'sub', 'tri'],
        numbers: [1, 2, 3],
        colors: ['green', 'purple', 'red'],
        fills: ['empty', 'full', 'stripes']
      },
      set: [],
      startTime: 0,
      timeToPlay: 3 * 60 * 1000,
      timeLeft: 3 * 60 * 1000
    }
  },
  created () {
    // init cards deck (3^4 combintaions)
    this.cardProperties.shapes
      .forEach(shape => this.cardProperties.numbers
        .forEach(number => this.cardProperties.colors
          .forEach(color => this.cardProperties.fills
            .forEach((fill, id) => this.cards.push({id: this.id++, shape, number, color, fill}))
          )
        )
      )

    bus.$on('getPlayer1Nickname', (nickname) => {
      this.player1 = nickname
    })
    console.log(this.player1)

    // pull out random card from the card deck and puts it on the table
    for (let i = 0; i < 12; i++) {
      this.cardsViewsOnTheTable[i] = new CardView('notThereYet', 'notThereYet', utils.takeNewCard(this.cards))
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
        return this.Player1 + ' Is The Winner!'
      } else if (this.player1Collect < this.player2Collect) {
        return this.Player2 + ' Is The Winner!'
      } else {
        return 'This Is A Tie!'
      }
    },
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
        this.resetCardState()
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
          this.cardsViewsOnTheTable[i].setNewCardAtrr(utils.takeNewCard(this.cards))
          element.state = 'isTaken'
        }
      })
      this.allwaysSetOnTheTable()
    },

    resetCardState: function () {
      this.cardsViewsOnTheTable.forEach((element) => { element.state = 'unclicked' })
    },

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

    allwaysSetOnTheTable () {
      while (utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2) === 'no set here') {
        this.cardsViewsOnTheTable[1].setNewCardAtrr(utils.takeNewCard(this.cards))
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
      const seconds = '' + Math.floor((ms / 1000) % 60)
      const minutes = '' + Math.floor((ms / 1000 / 60) % 60)
      return minutes + ' : ' + seconds
    },
    PlayAgain: function () {
      location.reload()
    }
  }
}
</script>

<style scoped>
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

.blue {
  background-color: #55acee;
  box-shadow:0 10px 0px 0px #3C93D5;
}

.bluePressed {
  margin-top: 27px;
  background-color: #6FC6FF;
}

.greenPressed {
  background-color: #48E68B;
}

.blue:hover {
  background-color: #6FC6FF;
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

#tellMe{
  margin-top: 18px;
  margin-right: 15%;
}

.greenClicked{
  border: solid 3px #48E68B;
}

.blueClicked{
  border: solid 3px #6FC6FF;
}
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
  border: solid 3px yellow;
  }
  #time{
    font-family:cursive;
    font-size: 1.1em;
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

  .clock{
    margin-left: 20%;
    margin-top: 10px;
    margin-bottom: 10px;
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
</style>
