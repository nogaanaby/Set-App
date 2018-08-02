<template>
  <div class="intemidiate game">
    <gameMenu></gameMenu>
  <div class="card">
  <header class="card-header">
    <h1 style="margin-left: 12%">
      {{this.collectedCards.length / 3}} sets
    </h1>
    <a class="button is-outlined" id="tellMe" @click = "findSetBotton()">Tell Me</a>
  </header>
   <div class="card-content">
      <div class = "cardsContainer">
      <!--{{JSON.stringify(cards)}}-->
      <div v-for="(card, i) in cardsViewsOnTheTable" :key="card.index" class = "cardDiv" :class = "{notSet: notSet}">
        <canvas id="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
        <canvas id="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickedCard(card, i)" :class= "{clicked: card.state === 'clicked', takeSet: card.state === 'isTaken', findSet: card.state === 'toldMe'}" ></canvas>
      </div>
      <slot></slot>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import gameMenu from '@/components/nav.vue'
export default{
  name: 'game',
  components: {
    gameMenu
  },
  data () {
    return {
      id: 0,
      notSet: false, // bazzes the cards in a mistaken set
      cardsOnTheTable: [],
      cardsViewsOnTheTable: [],
      cards: [],
      collectedCards: [],
      cardProperties: {
        shapes: ['rect', 'sub', 'tri'],
        numbers: [1, 2, 3],
        colors: ['green', 'purple', 'red'],
        fills: ['empty', 'full', 'stripes']
      },
      set: []
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

    // pull out random card from the card deck and puts it on the table
    for (let i = 0; i < 12; i++) {
      this.cardsViewsOnTheTable[i] = new CardView('notThereYet', 'notThereYet', utils.takeNewCard(this.cards))
    }
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
          }
          this.set.splice(0)
        }
        if (utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2) === 'no set here') {
          this.addThree()
        }
      }
    }, // end of click

    switchCards: function () {
      this.cardsViewsOnTheTable.forEach((element, i) => {
        if (element.state === 'clicked') {
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

    allwaysSetOnTheTable: function () {
      while (utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2) === 'no set here') {
        this.cardsViewsOnTheTable[1].setNewCardAtrr(utils.takeNewCard(this.cards))
      }
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
  #tellMe{
    margin: 10px 20px;
  }
  .clicked {
  border: solid 3px grey;
  }
  .takeSet {
      opacity: 1;
      animation: fade 0.5s linear;
  }
  @keyframes fade {
    0% { opacity: 0 }
    100% { opacity: 1 }
  }
  .notSet{
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
  .findSet {
  border: solid 3px lightgreen;
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
  width: 550px;
  height: 480px;
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
    width: 19%;
    height: 28%;
    margin: 0 2%;
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
}
</style>
