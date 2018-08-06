<template>
  <div class="main">
  <gameMenu></gameMenu>
    <div class="card">
      <header class="card-header">
        <h1>
          Try It Yourself
        </h1>
      </header>
      <div class="card-content" :class= "{slideInRight: flipNext, fadeInLeft: flipBack}">
        <div class="columns is-desktop">
          <div class="setCard column" v-for="(card, i) in sets[contentIndex].first2cards" :key="card.index">
          <canvas :ref="'shape0'+i" width="150" height="66" v-show="false" ></canvas>
          <canvas :ref="'card0'+i" width="150" height="198"></canvas>
          </div>
          <div class ="column is-one-quarter cards-in-mobile">
            <div class="dropdown is-active">
              <div class="dropdown-trigger">
                <button class="button is-outlined" aria-haspopup="true" aria-controls="dropdown-menu" @click = "openNcloseMenu()">
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true">  <img v-if= "pickCard === 'close'" class="downArrow icon" src='@/assets/angle-down-solid.svg'></i>
                    <i class="fas fa-angle-up" aria-hidden="true"> <img v-if= "pickCard === 'open'" class="upArrow icon" src='@/assets/angle-up-solid.svg'></i>
                  </span>
                </button>
              </div> <!-- dropdown-trigger -->
              <div class="dropdown-menu" id="dropdown-menu2" role="menu" v-show = "pickCard === 'close'">
                <div class="dropdown-content" @click = "openNcloseMenu()">
                  <div class="dropdown-item" @click = "openNcloseMenu()">
                    <canvas width="150" height="198" @click = "openNcloseMenu()"></canvas>
                  </div><!-- dropdown-item -->
                </div><!-- dropdown-content -->
              </div><!-- dropdown-menu -->
              <div class="dropdown-menu" id="dropdown-menu2" role="menu" v-show = "pickCard === 'open'">
                <div class="dropdown-content">
                  <div class="dropdown-item" v-for="(card, i) in sets[contentIndex].optionsForTheThird" :key="card.index">
                    <canvas :ref="'shape1'+i" width="150" height="66" v-show="false" ></canvas>
                    <canvas :ref="'card1'+i" width="150" height="198" @click = "clickCard(card, i)" :class= "{clicked: card.state === 'clicked'}" v-show = "card.state !== 'hide'"></canvas>
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
              <div class="well-done bounceIn" v-show="comment === 'right'"><img class="vicon icon" src='@/assets/vicon.png'>
              <h3>Well Done!</h3></div>
              <div class="try-again wrong" v-show="comment === 'wrong'"><img class="xicon icon" src='@/assets/xicon.png'>
              <h3>Try Again</h3></div>
          </div><!-- column -->
        </div><!-- columns -->
      </div><!-- card-content -->
    </div><!-- card -->
      <footer class="card-footer">
        <footerNextPage class="footer"
        v-bind:pageCount = "sets.length"
        @indexUpdateEvent= "onIndexUpdate">
        </footerNextPage>
      </footer>    
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
      flipNext: false,
      flipBack: false,
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
        }
      ]
    }
  },
  mounted () {
    this.context = [5]
    let ctxI = 0

    this.sets[this.contentIndex].first2cards
      .forEach((card, i) => {
        this.context[ctxI] = new CardView(this.$refs[`shape0${i}`][0], this.$refs[`card0${i}`][0], card)
        this.context[ctxI].drawCard()
        ctxI++
      })

    this.sets[this.contentIndex].optionsForTheThird
      .forEach((card, i) => {
        this.context[ctxI] = new CardView(this.$refs[`shape1${i}`][0], this.$refs[`card1${i}`][0], card)
        this.context[ctxI].drawCard()
        ctxI++
      })
  },
  methods: {
    clickCard: function (card, i) {
      if (card.state === 'clicked') {
        this.comment = 'nothing'
        this.sets[this.contentIndex].optionsForTheThird.forEach((card) => {
          card.state = 'unclicked'
        })
        this.$forceUpdate()
      } else {
        card.state = 'clicked'
        this.$forceUpdate()

        this.sets[this.contentIndex].optionsForTheThird.forEach((card) => {
          if (card.state !== 'clicked') {
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
    check: function () {
      const setArray = []
      setArray.push(this.sets[this.contentIndex].first2cards[0])
      setArray.push(this.sets[this.contentIndex].first2cards[1])

      this.sets[this.contentIndex].optionsForTheThird.forEach((card, i) => {
        if (card.state === 'clicked') {
          setArray.push(card)
          if (utils.isSet(setArray, 0, 1, 2)) {
            this.comment = 'right'
          } else {
            this.comment = 'wrong'
          }
        }
      })
    },
    onIndexUpdate: function (index, direction) {
      this.contentIndex = index
      this.sets[this.contentIndex].first2cards.forEach((card, i) => {
        this.context[i].setNewCardAtrr(card)
      })
      this.sets[this.contentIndex].optionsForTheThird.forEach((card, i) => {
        this.context[i + 2].setNewCardAtrr(card)
      })
      this.pickCard = 'close'
      this.comment = 'nothing'
      if (direction === 'next') {
        this.flipNext = true
        setTimeout(() => {
          this.flipNext = false
        }, 800)
      } else if (direction === 'back') {
        this.flipBack = true
        setTimeout(() => {
          this.flipBack = false
        }, 800)
      }
    }
  }
}
</script>

<style scoped>
/*************************************
all devices
***************************************/
  .clicked {
    border: solid 3px grey;
  }
  canvas{
    transform: rotate(90deg);
    margin: 0px;
    width: 100%;
    object-fit: contain;
    height: 100%;
  }

  /*************************************
desktop
***************************************/
@media only screen and (min-width: 769px) {
  .card{
    flex-direction: row;
  }
  .card-content{
    flex-wrap: wrap;
    flex-direction: row;
    height: 440px;
  }
  .setCard{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0 2%;
    margin-top: 7%;
  }
  .columns{
    width: 100%;
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
    margin-top: 11%;
  }
  .card-footer, .footer{
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 0;
  }
}
/*************************************
mobile
***************************************/
@media only screen and (max-width: 768px) {
  .dropdown-item{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: auto;
    width: 56%;
    padding: 0;
  }

  .setCard{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 25%;
    margin: 10px;
    float: left;
  }
  .card-footer, .footer{
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 0;
  }
  .dropdown-content{
    width: 60%;
    padding: 0;
  }
  .cards-in-mobile{
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .is-one-fifth{
    margin-top: 30%;
  }
}
</style>
