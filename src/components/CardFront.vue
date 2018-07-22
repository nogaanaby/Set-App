<template>
  <div class="intemidiate">
    <h3>Set Game</h3>
    <div class="cardsContainer">
      <!--{{JSON.stringify(cards)}}-->
      <div class="cardDiv" v-for="(card, i) in cardsOnTheTable" :key="card.index" v-bind:class="{notSet: notSet}">
        <canvas v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
        <canvas :ref="'card'+i" width="150" height="198" v-on:click = "clickedCard(card, i)" v-bind:class= "{clicked: card.isClicked, takeSet: card.isTaked}" ></canvas>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import utils, { CardView, Set } from '../js/utils.js'
export default{
  name: 'cardFront',
  data () {
    return {
      notSet: false,
      beginners: false,
      intemidiate: false,
      cardsOnTheTable: [],
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
            .forEach((fill, id, isClicked, isTaked) => this.cards.push({id, shape, number, color, fill, isClicked: false, isTaked: false}))
          )
        )
      )
    // pull out random card from the card deck and puts it on the table
    for (let i = 0; i < 9; i++) {
      const randomCardIndex = Math.floor(Math.random() * this.cards.length)
      this.cardsOnTheTable.push(this.cards.splice(randomCardIndex, 1)[0])
    }
  },
  mounted () {
    for (let i = 0; i < 9; i++) {
      const context = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], this.cardsOnTheTable[i].shape, this.cardsOnTheTable[i].color, this.cardsOnTheTable[i].fill, this.cardsOnTheTable[i].number)
      context.drawCard()
    }
  },
  methods: {
    /**************************************
     game
    *************************************/
    isSet () {
      if (utils.sameOrDiff(this.set[0].shape, this.set[1].shape, this.set[2].shape) &&
        utils.sameOrDiff(this.set[0].number, this.set[1].number, this.set[2].number) &&
        utils.sameOrDiff(this.set[0].color, this.set[1].color, this.set[2].color) &&
        utils.sameOrDiff(this.set[0].fill, this.set[1].fill, this.set[2].fill)) {
        this.set.forEach(function (card) {
          card.isTaked = true
        })
        this.collectedCards.push(this.set[0], this.set[1], this.set[2])
      } else {
        this.notSet = true
      }
    },

    clickedCard: function (card, i) {
      this.set.push(card)
      console.log(card)
      if (card.isClicked) {
        card.isClicked = false
        this.set.pop(card, this)
      } else {
        if (this.set.length === 3) {
          card.isClicked = false
          this.isSet()
          this.set.splice(0)
          this.cardsOnTheTable.forEach(function (element) { element.isClicked = false })
        } else {
          card.isClicked = true
          this.notSet = false
        }
      }
    }
  }
}
</script>

<style scoped>
.intemidiate {
 display: flex;
 justify-content: center;
 flex-direction: column;
}
.cardsContainer {
 display: flex;
 flex-direction: row;
 width: 400px;
 height: 400px;
 margin: auto;
 position: inherit;
 flex-wrap: wrap;
 justify-content: center;
}

.cardDiv {
 display: flex;
 flex-direction: column;
 width: 120px;
 height: 160px;
 justify-content: center;
}

canvas {
 margin: 0px;
 -webkit-transform: scale(0.7);
 -moz-transform: scale(0.7);
 -o-transform: scale(0.7);
 transform: scale(0.7);
}
.clicked {
 border: solid 3px black;
}
.takeSet {
    opacity: 1;
    animation: fade 2s linear;
}
@keyframes fade {
  0%,100% { opacity: 0 }
  50% { opacity: 1 }
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
</style>
