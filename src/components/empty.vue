<template>
  <div class="empty">
        <cards-container
        v-bind:cardsData = "cardsData.cardsDeckArray"
        v-bind:length = "length"></cards-container>
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
import cardsContainer from '@/components/cardsContainer.vue'
export default{
  name: 'empty',
  components: {
    cardsContainer
  },
  data () {
    return {
      length: 9,
      cardsData: new CardsDeck()
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
