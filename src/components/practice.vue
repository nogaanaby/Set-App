<template>
  <div class="main">
  <gameMenu></gameMenu>
    <div class="card">
      <header class="card-header">
        <h1>
          Try It Yourself
        </h1>
      </header>
      <div class="card-content">
        <div class="columns">
          <div class="setCard column" v-for="(card, i) in sets[0]" :key="card.index">
          <canvas :ref="'shape0'+i" width="150" height="66" v-show="false" ></canvas>
          <canvas :ref="'card0'+i" width="150" height="198"></canvas>
          </div>
          <div class ="column">
            <div class="dropdown is-active">
              <div class="dropdown-trigger">
                <button class="button is-outlined" aria-haspopup="true" aria-controls="dropdown-menu" @click = "openNcloseMenu()">
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true">  <img v-if= "pickCard === 'close'" class="downArrow icon" src='@/assets/angle-down-solid.svg'></i>
                    <i class="fas fa-angle-up" aria-hidden="true"> <img v-if= "pickCard === 'open'" class="upArrow icon" src='@/assets/angle-up-solid.svg'></i>
                  </span>
                </button>
              </div> <!-- dropdown-trigger -->
              <div class="dropdown-menu" id="dropdown-menu2" role="menu" v-show = "pickCard === 'open'">
                <div class="dropdown-content">
                  <div class="dropdown-item setCard" v-for="(card, i) in sets[1]" :key="card.index">
                    <canvas :ref="'shape1'+i" width="150" height="66" v-show="false" ></canvas>
                    <canvas :ref="'card1'+i" width="150" height="198" @click = "clickCard(card, i)" :class= "{clicked: card.state === 'picked'}" v-show = "card.state !== 'hide'"></canvas>
                  </div><!-- dropdown-item -->
                </div><!-- dropdown-content -->
              </div><!-- dropdown-menu -->
            </div><!-- dropdown is-active- -->
          </div><!-- column -->
        </div><!-- columns -->
      </div><!-- card-content -->
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div><!-- card -->
  </div><!-- main -->
</template>

<script>
import instractionsTables from '@/components/instractionsTables'
import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import gameMenu from '@/components/nav.vue'

export default {
  name: 'practice',
  components: {
    'setExampleTable': instractionsTables,
    gameMenu
  },
  data () {
    return {
      context: [],
      sets: [
        [
          utils.cardObject('sub', 'purple', 1, 'stripes'),
          utils.cardObject('sub', 'green', 2, 'empty')
        ],
        [
          utils.cardObject('sub', 'purple', 1, 'stripes'),
          utils.cardObject('sub', 'purple', 2, 'empty')
        ]
      ],
      pickCard: 'close'
    }
  },
  mounted () {
    let indexOfContext = 0
    for (let set = 0; set < this.sets.length; set++) {
      this.sets[set]
        .forEach((card, i) => {
          const cardView = new CardView(this.$refs[`shape${set}${i}`][0], this.$refs[`card${set}${i}`][0], card)
          this.context.push(cardView)
          this.context[indexOfContext].drawCard()
          indexOfContext++
        })
    }
    console.log(this.context)
  },
  methods: {
    clickCard: function (card, i) {
      card.state = 'picked'
      this.$forceUpdate()

      this.sets[1].forEach((card) => {
        if (card.state !== 'picked') {
          card.state = 'hide'
        }
      })
    }, // end of click

    openNcloseMenu: function () {
      if (this.pickCard === 'close') {
        this.pickCard = 'open'
        this.sets[1].forEach((card) => {
          card.state = 'unclicked'
        })
      } else {
        this.pickCard = 'close'
      }
    }
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
  height: 500px;
}
.setCard{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 57%;
  height: 57%;
  margin: 0 5%;
}
canvas{
  transform: rotate(90deg);
  margin: 0px;
  width: 100%;
  object-fit: contain;
  height: 100%;
}
.columns{
  width: 60%;
}
.clicked {
border: solid 3px grey;
}
</style>
