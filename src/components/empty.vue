<template>
  <div class="empty">
        <cards-container
        v-bind:cardsData = "cardsData"
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
      length: 6,
      cardsData: [
        backGame.cardObject('rect', 'red', 3, 'full'),
        backGame.cardObject('rect', 'blue', 3, 'full'),
        backGame.cardObject('rect', 'purple', 3, 'full'),
        backGame.cardObject('rect', 'green', 3, 'full'),
        backGame.cardObject('rect', 'yellow', 3, 'full')
      ]
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
