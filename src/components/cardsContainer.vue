<template>
    <div class = "cardsContainer" :class = "{notSet: notSet}">
      <div v-for="(card, i) in cardViews" :key="card.index" class = "cardDiv">
        <canvas class="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
        <canvas class="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickedCard(card, i)" :class= "{clicked: card.state === 'clicked', oppClicked: card.state === 'oppClicked', zoomIn: card.state === 'isTaken', findSet: card.state === 'toldMe'}"></canvas>
      </div>
    </div>
</template>
<script>
import backGame, { CardsDeck } from '../js/backGame.js'
import { CardView } from '../js/CardViews.js'
import frontGame from '../js/frontGame.js'
import clock from '@/components/clock.vue'
import help from '@/components/help.vue'
import score from '@/components/score.vue'
import gameOver from '@/components/gameOver.vue'
import gameMenu from '@/components/nav.vue'
import brandFooter from '@/components/brandFooter.vue'
import store from '../js/store.js'
export default{
  name: 'cardsContainer',
  components: {

  },
  props: ['cardsData', 'length'],
  data () {
    return {
      cardViews: [],
      cardsDeck: this.cardsData,
      notSet: false,
      set: []
    }
  },
  created () {
    // creates the canvasses by the cardsData
    for (let i = 0; i < this.length; i++) {
      this.cardViews[i] = new CardView('notThereYet', 'notThereYet', this.cardsDeck.pop())
    }
  },
  mounted () {
    // draw on the canvasses
    this.cardViews.forEach((card, i) => {
      card.shapeCanvas = this.$refs[`shape${i}`][0]
      card.cardCanvas = this.$refs[`card${i}`][0]
      card.drawCard()
    })
    if (this.cardViews.length >= 3) {
      this.allwaysSetOnTheTable(this.cardViews, this.cardsDeck, 1)
    }
    if (this.cardsDeck.length < this.length) {
      this.cardsDeck = this.cardsData
    }
  },
  sockets: {
    opponentHasClicked (card) {
      const findCard = this.cardViews.find(cv => cv.shape === card.shape &&
                                                      cv.color === card.color &&
                                                      cv.number === card.number &&
                                                      cv.fill === card.fill)

      findCard.state = 'oppClicked'
      this.$forceUpdate()

      this.set.push(findCard)
      if (this.set.length === 3) {
        if (backGame.isSet(this.set, 0, 1, 2)) {
          this.$emit('oppFoundASet')
          this.switchCards()
        } else {
          backGame.resetCardState(this.cardViews)
        }
        this.set.splice(0)
      }
    }
  },
  methods: {
    allwaysSetOnTheTable (cardViewsArray, cardsDeck, i) {
      while (backGame.findSet(cardViewsArray, 0, 1, 2) === 'no set here' || backGame.haveTheSameCard(cardViewsArray) !== 'non') {
        cardViewsArray[i].setNewCardAtrr(this.cardsDeck.splice(i, 1)[0])
      }
    },
    clickedCard (card, i) {
      this.notSet = false
      if (card.state === 'clicked') {
        card.state = 'unclicked'
        this.set.pop()
      } else {
        this.set.push(card)
        card.state = 'clicked'
        this.$forceUpdate()
        this.$emit('clickCardEvent', card)

        if (this.set.length === 3) {
          if (backGame.isSet(this.set, 0, 1, 2)) {
            this.$emit('foundASet')
            this.switchCards()
          } else {
            this.notSet = true
            backGame.resetCardState(this.cardViews)
          }
          this.set.splice(0)
        }
      }
    },
    switchCards () {
      this.cardViews = backGame.switchCards(this.cardViews, this.cardsDeck, this.set)
      setTimeout(() => {
        backGame.resetCardState(this.cardViews)
      }, 1000)
    },
    // sendCardViews () {
    //   this.$emit('getCardViews', this.cardViews)
    // },
    hintCards (cardsArray) {
      this.cardViews = cardsArray
    }
  }
}
</script>

<style scoped>
.oppClicked{
  border: solid 3px grey;
}
</style>
