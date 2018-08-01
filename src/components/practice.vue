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
          <div class="setCard column" v-for="(card, i) in sets[contentIndex].first2cards" :key="card.index">
          <canvas :ref="'shape0'+i" width="150" height="66" v-show="false" ></canvas>
          <canvas :ref="'card0'+i" width="150" height="198"></canvas>
          </div>
          <div class ="column is-one-quarter">
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
                  <div class="dropdown-item" v-for="(card, i) in sets[contentIndex].optionsForTheThird" :key="card.index">
                    <canvas :ref="'shape1'+i" width="150" height="66" v-show="false" ></canvas>
                    <canvas :ref="'card1'+i" width="150" height="198" @click = "clickCard(card, i)" :class= "{clicked: card.state === 'picked'}" v-show = "card.state !== 'hide'"></canvas>
                  </div><!-- dropdown-item -->
                </div><!-- dropdown-content -->
              </div><!-- dropdown-menu -->
            </div><!-- dropdown is-active- -->
          </div><!-- column -->
          <div class="column is-one-fifth">
            <a class="button is-success" @click="check()">
            <span>Check</span>
            </a>
          </div><!-- column -->
          <div class="column is-one-fifth">
              <div class="well-done" v-show="comment === 'right'"><img class="vicon icon" src='@/assets/vicon.png'>
              <h3>Well Done!</h3></div>
              <div class="try-again" v-show="comment === 'wrong'"><img class="xicon icon" src='@/assets/xicon.png'>
              <h3>Try Again</h3></div>
          </div><!-- column -->
        </div><!-- columns -->
      </div><!-- card-content -->
      <footer class="card-footer">
        <footerNextPage class="footer" v-bind:next = "nextPage" v-bind:prev = "prevPage" v-bind:pageCount = "sets.length">
        </footerNextPage>
      </footer>
    </div><!-- card -->
  </div><!-- main -->
</template>

<script>
import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import gameMenu from '@/components/nav.vue'
import footerNextPage from '@/components/footer'

export default {
  name: 'practice',
  components: {
    gameMenu,
    footerNextPage
  },
  data () {
    return {
      contentIndex: 0,
      context: [],
      pickCard: 'close',
      comment: 'nothing',
      sets: [
        {
          first2cards: [
            utils.cardObject('sub', 'purple', 1, 'stripes'),
            utils.cardObject('sub', 'purple', 2, 'stripes')
          ],
          optionsForTheThird: [
            utils.cardObject('sub', 'red', 1, 'stripes'),
            utils.cardObject('sub', 'purple', 2, 'empty'),
            utils.cardObject('sub', 'purple', 3, 'stripes')
          ]
        },
        {
          first2cards: [
            utils.cardObject('rect', 'red', 2, 'empty'),
            utils.cardObject('rect', 'purple', 2, 'empty')
          ],
          optionsForTheThird: [
            utils.cardObject('rect', 'green', 2, 'empty'),
            utils.cardObject('rect', 'purple', 2, 'empty'),
            utils.cardObject('tri', 'green', 2, 'empty')
          ]
        },
        {
          first2cards: [
            utils.cardObject('sub', 'red', 2, 'full'),
            utils.cardObject('tri', 'purple', 1, 'empty')
          ],
          optionsForTheThird: [
            utils.cardObject('tri', 'green', 2, 'empty'),
            utils.cardObject('rect', 'green', 3, 'stripes'),
            utils.cardObject('rect', 'green', 1, 'stripes')
          ]
        },
        {
          first2cards: [
            utils.cardObject('rect', 'red', 3, 'stripes'),
            utils.cardObject('sub', 'red', 2, 'empty')
          ],
          optionsForTheThird: [
            utils.cardObject('rect', 'red', 2, 'full'),
            utils.cardObject('tri', 'red', 1, 'stripes'),
            utils.cardObject('tri', 'red', 1, 'full')
          ]
        },
        {
          first2cards: [
            utils.cardObject('sub', 'red', 3, 'full'),
            utils.cardObject('sub', 'red', 2, 'full')
          ],
          optionsForTheThird: [
            utils.cardObject('sub', 'red', 2, 'full'),
            utils.cardObject('sub', 'red', 1, 'full'),
            utils.cardObject('sub', 'red', 1, 'full')
          ]
        }        
      ]
    }
  },
  mounted () {
    this.context = [5]
    let ctxI = 0

    this.sets[this.contentIndex].first2cards
      .forEach((card, i) => {
        const cardView = new CardView(this.$refs[`shape0${i}`][0], this.$refs[`card0${i}`][0], card)
        this.context[ctxI] = cardView
        this.context[ctxI].drawCard()
        ctxI++
      })

    this.sets[this.contentIndex].optionsForTheThird
      .forEach((card, i) => {
        const cardView = new CardView(this.$refs[`shape1${i}`][0], this.$refs[`card1${i}`][0], card)
        this.context[ctxI] = cardView
        this.context[ctxI].drawCard()
        ctxI++
      })
  },
  methods: {
    clickCard: function (card, i) {
      if (card.state === 'picked') {
        this.sets[this.contentIndex].optionsForTheThird.forEach((card) => {
          card.state = 'unclicked'
        })
        this.$forceUpdate()
      } else {
        card.state = 'picked'
        this.$forceUpdate()

        this.sets[this.contentIndex].optionsForTheThird.forEach((card) => {
          if (card.state !== 'picked') {
            card.state = 'hide'
          }
        })
      }
    }, // end of click

    openNcloseMenu: function () {
      if (this.pickCard === 'close') {
        this.pickCard = 'open'
        this.sets[this.contentIndex].optionsForTheThird.forEach((card) => {
          card.state = 'unclicked'
        })
      } else {
        this.pickCard = 'close'
      }
    },
    nextPage: function () {
      this.contentIndex = Math.min(this.contentIndex + 1, this.sets.length - 1)
      this.changeContent()
    },
    prevPage: function () {
      this.contentIndex = Math.max(this.contentIndex - 1, 0)
      this.changeContent()
    },
    changeContent: function () {
      this.sets[this.contentIndex].first2cards.forEach((card, i) => {
        this.context[i].setNewCardAtrr(card)
      })
      this.sets[this.contentIndex].optionsForTheThird.forEach((card, i) => {
        this.context[i + 2].setNewCardAtrr(card)
      })
      this.pickCard = 'close'
      this.comment = 'nothing'
    },
    check: function () {
      const setArray = []
      setArray.push(this.sets[this.contentIndex].first2cards[0])
      setArray.push(this.sets[this.contentIndex].first2cards[1])

      this.sets[this.contentIndex].optionsForTheThird.forEach((card, i) => {
        if (card.state === 'picked') {
          setArray.push(card)
          if (utils.isSet(setArray, 0, 1, 2)) {
            this.comment = 'right'
          } else {
            this.comment = 'wrong'
          }
        }
      })
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
  height: 400px;
}
.setCard{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 0 2%;
  margin-top: 7%;
}
canvas{
  transform: rotate(90deg);
  margin: 0px;
  width: 100%;
  object-fit: contain;
  height: 100%;
}
.columns{
  width: 100%;
}
.clicked {
border: solid 3px grey;
}
.dropdown-item{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: auto;
  width: 56%;
  padding: 0;
}
.dropdown-content{
  width: 85%;
  padding: 0;
}
.icon{
  width: 28px;
  height: 18px;
}
.dropdown-menu, .dropdown{
  object-fit: contain;
}
.is-one-quarter{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: left;
}
.dropdown-trigger, .dropdown {
  height: 30%;
}
.is-one-fifth{
  margin-top: 7%;
}
.card-footer, .footer{
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 0;
}
</style>
