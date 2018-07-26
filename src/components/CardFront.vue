<template>
  <div class="intemidiate game">
  <div class="card">
  <header class="card-header">
    <h1 style="margin-left: 12%">
      {{this.collectedCards.length / 3}} sets
    </h1>
    <button class="button" id="tellMe" @click = "findSetBotton()">Tell Me</button>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
   <div class="card-content">
      <div class="cardsContainer">
      <!--{{JSON.stringify(cards)}}-->
      <div class="cardDiv" v-for="(card, i) in cardsOnTheTable" :key="card.index" v-bind:class="{notSet: notSet}">
        <canvas id="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
        <canvas id="cardCanvas" :ref="'card'+i" width="150" height="198" v-on:click = "clickedCard(card, i)" v-bind:class= "{clicked: card.isClicked, takeSet: card.isTaked, findSet: card.inSet}" ></canvas>
      </div>
      <slot></slot>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import utils, { CardView } from '../js/utils.js'
export default{
  name: 'cardFront',
  data () {
    return {
      circleTest: '',
      id: 0,
      notSet: false,
      beginners: false,
      intemidiate: false,
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
            .forEach((fill, id, isClicked, isTaked, inSet) => this.cards.push({id: this.id++, shape, number, color, fill, isClicked: false, isTaked: false, inSet: false}))
          )
        )
      )
    // pull out random card from the card deck and puts it on the table
    for (let i = 0; i < 12; i++) {
      this.cardsOnTheTable.push(this.cards.splice(this.randomCardIndex(), 1)[0])
    }
  },
  mounted () {
    for (let i = 0; i < 12; i++) {
      this.cardsViewsOnTheTable[i] = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], this.cardsOnTheTable[i].shape, this.cardsOnTheTable[i].color, this.cardsOnTheTable[i].fill, this.cardsOnTheTable[i].number)
      this.cardsViewsOnTheTable[i].drawCard()
    }
  },
  methods: {
    /**************************************
     game
    *************************************/
    isSet: function () {
      if (utils.isSet(this.set, 0, 1, 2)) {
        this.set.forEach((card) => { card.isTaked = true })
        this.collectedCards.push(...this.set)
        return true
      } else {
        this.notSet = true
      }
    },

    randomCardIndex: function () {
      return (Math.floor(Math.random() * this.cards.length))
    },

    clickedCard: function (card) {
      if (card.isClicked) {
        card.isClicked = false
        this.set.pop()
      } else {
        this.set.push(card)
        card.isClicked = true
        card.inSet = false
        this.notSet = false
        card.isTaked = false

        if (this.set.length === 3) {
          if (this.isSet()) {
            for (let i = 0; i < this.cardsOnTheTable.length; i++) {
              if (this.cardsOnTheTable[i].isClicked === true) {
                const newCard = this.cards.splice(this.randomCardIndex(), 1)[0]

                this.cardsOnTheTable[i] = newCard
                this.cardsViewsOnTheTable[i].setNewCardAtrr(newCard.shape, newCard.color, newCard.fill, newCard.number)
              }
            }
          }
          this.cardsOnTheTable.forEach(function (element) { element.isClicked = false })
          this.set.splice(0)
        }
      }
    }, // end of click
    findSetBotton: function () {
      const setArray = []
      if (utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2) === 'no set here') {
        console.log('no set here')
      } else {
        for (let i = 0; i < 3; i++) {
          setArray[i] = utils.findSet(this.cardsViewsOnTheTable, 0, 1, 2)[i]
        }
        this.cardsOnTheTable
          .forEach(function (card) {
            if (setArray[0].equalTo(card) || setArray[1].equalTo(card) || setArray[2].equalTo(card)) {
              card.inSet = true
            }
          })
      }
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
