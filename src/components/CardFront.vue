<template>
  <div class="game">
    <h3>hi I am cardFront</h3>
    <div class="cardsContainer">
      <!--{{JSON.stringify(cards)}}-->
      <div class="cardDiv" v-for="(card, i) in cardsOnTheTable" :key="card.index">
        <canvas v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
        <canvas :ref="'card'+i" width="150" height="198" v-on:click = "clickedCard(card)" v-bind:class= "{clicked: card.isClicked}" ></canvas>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import utils from '../js/utils.js'
export default{
  name: 'cardFront',
  data () {
    return {
      cardsOnTheTable: [],
      cards: [],
      cardCanvas: [],
      cardContext: [],
      shapeCanvas: [],
      shapeContext: [],
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
            .forEach((fill, id, isClicked) => this.cards.push({id, shape, number, color, fill, isClicked: false}))
          )
        )
      )

    for (let i = 0; i < 9; i++) {
      const randomCardIndex = Math.floor(Math.random() * this.cards.length)
      this.cardsOnTheTable.push(this.cards.splice(randomCardIndex, 1)[0])
    }
  },
  mounted () {
    for (let i = 0; i < 9; i++) {
      // set the properties to the shape - witch is not displayed
      this.shapeCanvas[i] = this.$refs[`shape${i}`][0]
      // console.log(this.$refs[`shape${i}`][0])
      this.shapeContext[i] = this.shapeCanvas[i].getContext('2d')
      // console.log(this.shapeContext[i])
      utils.drawShape(this.shapeContext[i], this.cardsOnTheTable[i].shape)
      utils.changeColor(this.shapeContext[i], this.cardsOnTheTable[i].color)
      utils.changeFill(this.shapeContext[i], this.cardsOnTheTable[i].shape, this.cardsOnTheTable[i].fill)
      // copy the properties on the card on the current atrr number
      this.cardCanvas[i] = this.$refs[`card${i}`][0]
      this.cardContext[i] = this.cardCanvas[i].getContext('2d')
      utils.copyShape(this.shapeContext[i], this.cardContext[i], this.cardsOnTheTable[i].number)
    }
  },
  methods: {
    /**************************************
     game
    *************************************/
    isSet () {
      if (this.set.length === 3) {
        if (utils.sameOrDiffAttr(this.set[0].shape, this.set[1].shape, this.set[2].shape) &&
          utils.sameOrDiffAttr(this.set[0].number, this.set[1].number, this.set[2].number) &&
          utils.sameOrDiffAttr(this.set[0].color, this.set[1].color, this.set[2].color) &&
          utils.sameOrDiffAttr(this.set[0].fill, this.set[1].fill, this.set[2].fill)){
          alert('this is a set')
        } else {
          alert('this is not a set')
        }
      } else {
        return
      }
    },

    clickedCard: function(card){
      // debugger
      // console.log(card)
      if (this.set.length < 3) {
        this.set.push(card)
        console.log(this.set)
      }
      if (card.isClicked) {
        card.isClicked = false
        this.set.pop(card)
      } else {
        if (this.set.length === 3) {
          card.isClicked = false
          this.isSet()
          this.set.splice(0)
          this.cardsOnTheTable.forEach(function (element) { element.isClicked = false })
          return
        } else {
          card.isClicked = true
        }
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
</style>
