<template>
    <div class = "cardsContainer" :class = "{notSet: notSet}">
      <div v-for="(card, i) in cardViews" :key="card.index" class = "cardDiv">
        <canvas class="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
        <canvas class="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickCard(card, i)" :class= "{clicked: card.state === 'clicked', oppClicked: card.state === 'oppClicked', zoomIn: card.state === 'isTaken', findSet: card.state === 'toldMe'}"></canvas>
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
import { EventBus } from '../js/event-bus.js'
export default{
  name: 'cardsContainer',
  components: {

  },
  props: ['cardsData', 'length', 'hintCard', 'from'],
  data () {
    return {
      cardViews: [],
      cardsDeck: JSON.parse(JSON.stringify(this.cardsData)),
      notSet: false,
      set: [],
      whoClicked: 'non'
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
    store.cardV = this.cardViews
    backGame.allwaysSetOnTheTable(this.cardViews, this.cardsDeck, 1)

    EventBus.$on('findSetEvent', setCard => {
      const hintCardIndex = this.cardViews.findIndex(c => c.shape === setCard.shape && c.color === setCard.color && c.number === setCard.number && c.fill === setCard.fill)
      this.cardViews[hintCardIndex].state = 'toldMe'
      this.$forceUpdate()
    })

  },
  sockets: {
    opponentHasClicked (card) {
      const findCard = this.cardViews.find(cv => cv.shape === card.shape && cv.color === card.color && cv.number === card.number && cv.fill === card.fill)
      this.whoClicked = 'opp'
      this.click('opponent', findCard, 'oppClicked')
      setTimeout(() => {
        this.whoClicked = 'non'
        this.set.splice(0)
        findCard.state = 'unclicked'
        this.$forceUpdate()
      }, 2000)
    }
  },
  methods: {
    clickCard (card, i) {
      this.click('me', card, 'clicked')
      if (this.from === 'online') {
        setTimeout(() => {
          this.whoClicked = 'non'
          this.set.splice(0)
          card.state = 'unclicked'
          this.$forceUpdate()
        }, 2000)
      }
    },
    click (clickFrom, card, clickedState) {
      console.log(card)
      this.notSet = false
      if (card.state === clickedState) {
        card.state = 'unclicked'
        this.set.pop()
        if (clickFrom === 'me') {
          this.$emit('clickCardEvent', card)
        }
      } else if (this.whoClicked !== 'opp' || clickFrom !== 'me') {
        this.set.push(card)
        card.state = clickedState
        this.$forceUpdate()

        if (clickFrom === 'me') {
          this.$emit('clickCardEvent', card)
        }

        if (this.set.length === 3) {
          if (backGame.isSet(this.set, 0, 1, 2)) {
            if (clickFrom === 'me') {
              this.$emit('foundASet')
            } else if (clickFrom === 'opponent') {
              this.$emit('oppFoundASet')
            }

            this.switchCards()
          } else {
            if (clickFrom === 'me') {
              this.notSet = true
            }
            backGame.resetCardState(this.cardViews)
          }
          this.set.splice(0)
        }
      }
    },
    switchCards () {
      this.cardViews = backGame.switchCards(this.cardViews, this.cardsDeck, this.set)
      if (this.cardsDeck.length < this.length + 3) {
        this.cardsDeck = JSON.parse(JSON.stringify(this.cardsData))
      }
      setTimeout(() => {
        backGame.resetCardState(this.cardViews)
      }, 1000)
    }
  }
}
</script>

<style scoped>
.oppClicked{
  border: solid 3px grey;
}
</style>
