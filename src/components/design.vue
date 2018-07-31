<template>
  <div class="main">
    <div class="card">
      <header class="card-header">
        <h1>
          Try It Yourself
        </h1>
      </header>
      <div class="card-content">
        <div class="columns">
          <div class="setCard column" v-for="(card, i) in sets[0]" :key="card.index">
          <canvas :ref="'shape'+i" width="150" height="66" v-show="false" ></canvas>
          <canvas :ref="'card'+i" width="150" height="198"></canvas>
          </div>
        </div>

        <div class="columns">
          <div class="setCard column" v-for="(card, i) in sets[0]" :key="card.index">
          <canvas :ref="'shape'+i" width="150" height="66" v-show="false" ></canvas>
          <canvas :ref="'card'+i" width="150" height="198"></canvas>
          </div>
        </div>

        <div class="columns">
          <div class="setCard column" v-for="(card, i) in sets[0]" :key="card.index">
          <canvas :ref="'shape'+i" width="150" height="66" v-show="false" ></canvas>
          <canvas :ref="'card'+i" width="150" height="198"></canvas>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script>
import instractionsTables from '@/components/instractionsTables'
import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'

export default {
  name: 'design',
  components: {
    'setExampleTable': instractionsTables
  },
  data () {
    return {
      context: [],
      sets: [
        [
          utils.cardObject('sub', 'green', 1, 'stripes'),
          utils.cardObject('sub', 'green', 2, 'empty'),
          utils.cardObject('sub', 'green', 3, 'full')
        ],
        [
          utils.cardObject('tri', 'green', 2, 'stripes'),
          utils.cardObject('sub', 'red', 2, 'stripes'),
          utils.cardObject('rect', 'purple', 2, 'stripes')
        ],
        [
          utils.cardObject('sub', 'green', 1, 'empty'),
          utils.cardObject('tri', 'purple', 2, 'stripes'),
          utils.cardObject('rect', 'red', 3, 'full')
        ]
      ]
    }
  },
  mounted () {
    for (let i = 0; i < this.sets[0].length; i++) {
      const cardView = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], this.sets[0][i])
      this.context.push(cardView)
      this.context[i].drawCard()
    }
/*
    this.sets[i]
      .forEach( function (card) {
        const cardView = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], this.sets[0][i])
        this.context.push(cardView)
        this.context[i].drawCard() 
      })*/
  },
  methods: {

  }
}
</script>

<style scoped>
.card{
  flex-direction: row;
}
.card-content{
  flex-wrap: wrap;
  flex-direction: row;
}
.setCard{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 10%;
  height: 10%;
  margin: 0 5%;
}
canvas{
  transform: rotate(90deg);
  margin: 0px;
  width: 100%;
  object-fit: contain;
  height: 100%;
}
</style>
