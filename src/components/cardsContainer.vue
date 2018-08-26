<template>
    <div class = "cardsContainer">
      <div v-for="(card, i) in cardViews" :key="card.index" class = "cardDiv">
        <canvas class="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
        <canvas class="cardCanvas" :ref="'card'+i" width="150" height="198"></canvas>
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
      cardsDeck: this.cardsData
    }
  },
  created () {
    for (let i = 0; i < this.length - 1; i++) {
      this.cardViews[i] = new CardView('notThereYet', 'notThereYet', backGame.takeNewCard(this.cardsDeck))
    }
  },
  mounted () {
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
      backGame.haveTheSameCard(this.cardViews, this.cardsDeck)
    }
  },
  methods: {

    allwaysSetOnTheTable (cardsViewsArray, cardsDeck, i) {
      while (backGame.findSet(cardsViewsArray, 0, 1, 2) === 'no set here') {
        cardsViewsArray[i].setNewCardAtrr(backGame.takeNewCard(cardsDeck))
      }
    }
  }
}
</script>

<style scoped>

</style>
