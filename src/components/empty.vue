<template>
  <div class="empty">
    <div class = "cardsContainer">
      <div v-for="(card, i) in cardViews" :key="card.index" class = "cardDiv">
        <canvas class="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
        <canvas class="cardCanvas" :ref="'card'+i" width="150" height="198"></canvas>
      </div>
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
  name: 'empty',
  components: {

  },
  props: ['cardsData', 'length'],
  data () {
    return {
      cardViews: []
    }
  },
  created () {
    for (let i = 0; i < this.length - 1; i++) {
      this.cardViews[i] = new CardView('notThereYet', 'notThereYet', backGame.takeNewCard(this.cardsData))
    }
  },
  mounted () {
    this.cardViews.forEach((card, i) => {
      card.shapeCanvas = this.$refs[`shape${i}`][0]
      card.cardCanvas = this.$refs[`card${i}`][0]
      card.drawCard()
    })
    if (this.cardViews.length >= 3) {
      backGame.allwaysSetOnTheTable(this.cardViews, this.cardsData)
    }
  },
  methods: {
    haveTheSameCard () {
      for (let i = 0; i < this.cardViews.length; i++) {
        for (let j = i + 1; j < this.cardViews.length - 1; j++) {
          if (this.cardViews[i].getCardData === this.cardViews[j].getCardData) {
            return true
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
