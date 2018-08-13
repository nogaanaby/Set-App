<template>
  <div class="fourInosentCards">
    <div class="cards-container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
              <canvas v-show="false" :ref="'shape'+0" width="150" height="66"></canvas>
              <canvas :ref="'card'+0" width="150" height="198"></canvas>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
              <canvas v-show="false" :ref="'shape'+1" width="150" height="66"></canvas>
              <canvas :ref="'card'+1" width="150" height="198"></canvas>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
              <canvas v-show="false" :ref="'shape'+2" width="150" height="66"></canvas>
              <canvas :ref="'card'+2" width="150" height="198"></canvas>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
              <canvas v-show="false" :ref="'shape'+3" width="150" height="66"></canvas>
              <canvas :ref="'card'+3" width="150" height="198"></canvas>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import { CardsDeck } from '../js/CardsDeck.js'
import gameMenu from '@/components/nav.vue'

export default{
  name: 'fourInosentCards',
  components: {
    gameMenu
  },
  data () {
    return {
      cardsViewsOnTheTable: [],
      cards: new CardsDeck()
    }
  },
  created () {
    for (let i = 0; i < 4; i++) {
      this.cardsViewsOnTheTable[i] = new CardView('notThereYet', 'notThereYet', utils.takeNewCard(this.cards.cardsDeckArray))
    }
  },
  mounted () {
    this.cardsViewsOnTheTable.forEach((card, i) => {
      card.shapeCanvas = this.$refs[`shape${i}`]
      card.cardCanvas = this.$refs[`card${i}`]
      console.log(this.$refs)
      card.drawCard()
    })
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
