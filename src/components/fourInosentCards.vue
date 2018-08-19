<template>
  <div class="fourInosentCards">
    <div class = "cardsContainer">
      <div v-for="(card, i) in cardsViewsOnTheTable" :key="card.index" class = "cardDiv" :class = "{notSet: notSet}">
        <canvas class="shapeCanvas" v-show="false" :ref="'shape'+i" width="150" height="66"></canvas>
        <canvas class="cardCanvas" :ref="'card'+i" width="150" height="198" @click = "clickedCard(card, i)" :class= "{blueClicked: card.state === 'blueClicked', greenClicked: card.state === 'greenClicked', zoomIn: card.state === 'isTaken', findSet: card.state === 'toldMe'}" ></canvas>
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
      cards: new CardsDeck(),
      notSet: false,
      set: [],
      whoPressed: ''
    }
  },
  created () {
    this.cardsViewsOnTheTable = utils.createCanvases(this.cards.cardsDeckArray)
  },
  mounted () {
    this.cardsViewsOnTheTable.forEach((card, i) => {
      card.shapeCanvas = this.$refs[`shape${i}`][0]
      card.cardCanvas = this.$refs[`card${i}`][0]
      console.log(this.$refs)
      card.drawCard()
    })
  },
  methods: {
    clickedCard: function (card, i) {
      this.notSet = false
      if (card.state === 'blueClicked' || card.state === 'greenClicked') {
        card.state = 'unclicked'
        this.set.pop()
      } else {
        this.set.push(card)
        card.state = 'blueClicked'
        this.$forceUpdate()
      }
    }, // end of click
    collectByPlayer (card) {
      if (this.whoPressed === 'green') {
        card.state = 'greenClicked'
      } else if (this.whoPressed === 'blue') {
        card.state = 'blueClicked'
      }
    }
  }
}
</script>

<style scoped>
.blueClicked{
  border: solid 3px plum;
}
.greenClicked{
  border: solid 3px #48E68B;
}
</style>
