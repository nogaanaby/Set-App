<template>
  <div class="intemidiate game">
  <div class="card">
  <header class="card-header">
    <h1 style="margin-left: 12%">
      {{this.collectedCards.length / 3}} sets
    </h1>
    <a class="button is-outlined" id="tellMe" @click = "findSetBotton()">Tell Me</a>
    <a class="button is-outlined" id="add3" @click = "addThree()">add3</a>
    <a class="button is-outlined" id="add3" @click = "takeThree()">take3</a>
  </header>
   <div class="card-content">
      <div :class = "{cardsContainer: (countCardsOnTheTable === 12), cardsContainer15: (countCardsOnTheTable === 15)}">
      <!--{{JSON.stringify(cards)}}-->
      <div v-for="(card, i) in numTest" :key="card.index" :class = "{notSet: notSet, cardDiv: (countCardsOnTheTable === 12), cardDiv15: (countCardsOnTheTable === 15)}">
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
export default{
  name: 'cardFront',
  data () {
    return {
      id: 0,
      countCardsOnTheTable: 12,
      notSet: false, // bazzes the cards in a mistaken set
      cardsOnTheTable: [],
      cardsViewsOnTheTable: [],
      cards: [],
      collectedCards: [],
      cardProperties: {
        shapes: ['rect', 'sub', 'tri'],
        numbers: [1, 2, 3],
        colors: ['red', 'purple', 'green'],
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
            .forEach((fill, id, state) => this.cards.push({id: this.id++, shape, number, color, fill, state: 'unclicked'}))
          )
        )
      )

    // pull out random card from the card deck and puts it on the table
    for (let i = 0; i < this.countCardsOnTheTable; i++) {
      // this.cardsOnTheTable.push(utils.takeNewCard(this.cards))
      this.cardsViewsOnTheTable[i] = new CardView('notThereYet', 'notThereYet', utils.takeNewCard(this.cards))
    }
  },
  mounted () {
    for (let i = 0; i < 12; i++) {
      this.cardsViewsOnTheTable[i] = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], this.cardsOnTheTable[i])
      this.cardsViewsOnTheTable[i].drawCard()
    }
    if (utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2) === 'no set here') {
      this.addThree()
    }
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
        return false
      }
    },

    clickedCard: function (card) {
      if (card.state === 'clicked') {
        card.state = 'unclicked'
        this.set.pop()
      } else {
        this.set.push(card)
        card.state = 'clicked'
        if (this.set.length === 3) {
          if (this.isSet()) {
            this.setStuff()
          }
          card.state = 'unclicked'
        }
        if (utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2) === 'no set here') {
          this.addThree()
        }
      }
    }, // end of click
    findSetBotton: function () {
      if (utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2) !== 'no set here') {
        const setArray = utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2)
        this.cardsOnTheTable.forEach((card) => {
          console.log(setArray)
          if (setArray[0].equalTo(card) || setArray[1].equalTo(card) || setArray[2].equalTo(card)) {
            card.state = 'toldMe'
            console.log(card)
          }
        })
        console.log('end of session')
      } else {
        console.log('no set here')
      }
    },

    addThree: function () {
      this.cardsOnTheTable.push(utils.takeNewCard(this.cards), utils.takeNewCard(this.cards), utils.takeNewCard(this.cards))
      this.countCardsOnTheTable = 15
      setImmediate(() => {
        for (let i = 12; i < 15; i++) {
          this.cardsViewsOnTheTable[i] = new CardView(this.$refs[`shape${i}`][0],
            this.$refs[`card${i}`][0], this.cardsOnTheTable[i])
          this.cardsViewsOnTheTable[i].drawCard()
        }
        this.$forceUpdate()
      })
    },

    takeThree: function (itsINDEX) {
      this.countCardsOnTheTable = 12
      for (let i = 0; i < 14; i++) {
        if (i === itsINDEX) {
          this.cardsOnTheTable[i + 1] = this.cardsOnTheTable[i]
          this.cardsViewsOnTheTable[i + 1] = this.cardsViewsOnTheTable[i]
        }
      }
      this.cardsOnTheTable.splice(12, 3)
      this.cardsViewsOnTheTable.splice(12, 3)
    },

    setStuff: function () {
      this.cardsOnTheTable.forEach((element, i) => {
        if (element.state === 'clicked') {
          if (this.countCardsOnTheTable === 12) {
            this.cardsOnTheTable[i] = utils.takeNewCard(this.cards)
            this.cardsViewsOnTheTable[i].setNewCardAtrr(this.cardsOnTheTable[i])
          } else {
            this.takeThree(i)
          }
          this.cardsOnTheTable[i].state = 'isTaken'
        }
      })
      this.set.splice(0)
    }
  }
}
</script>

<style scoped>
.game {
 display: flex;
 justify-content: center;
 flex-direction: column;
}
#setGame{
  margin: 0px;
}
.fitures{
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: purple;
  margin:0 auto 20px auto;
  padding: 5px 10px;
}
#tellMe{
  margin: 10px 20px;
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
.cardsContainer15 {
 display: flex;
 flex-direction: row;
 width: 700px;
 height: 480px;
 margin: 0px auto 30px auto;
 flex-wrap: wrap;
 justify-content: center;
}

.cardDiv15{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 14%;
  height: 28%;
  margin: 0 2%;
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
    animation: fade 2s linear;
}
@keyframes fade {
  0% { opacity: 0 }
  0%, 100% { opacity: 1 }
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
</style>
