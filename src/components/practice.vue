<template>
  <div class="main">
  <gameMenu></gameMenu>
    <div class="card">
      <header class="card-header">
        <h1 class="noga-title" v-show="comment === 'nothing'">
          which Card Should Be There?
        </h1>
        <h2 class="noga-title bounceIn" v-show="comment === 'right'" ><img class="vicon icon" src='@/assets/vicon.png'>Well Done!</h2>
        <h2 class="noga-title wrong" v-show="comment === 'wrong'"><img class="xicon icon" src='@/assets/xicon.png'>Try Again</h2>
      </header>
      <div class="card-content" :class= "{slideInRight: flipNext, fadeInLeft: flipBack}">
          <div class="setContainer">
            <div class="cardFree" v-for="(card, i) in sets[contentIndex].first2cards" :key="card.index">
              <canvas :ref="'shape0'+i" width="150" height="66" v-show="false" ></canvas>
              <canvas class="cardCanvas" :ref="'card0'+i" width="150" height="198"></canvas>
            </div>
            <div class="cardFree">
              <canvas class="cardCanvas" :ref="'card-question'" width="150" height="198" v-show="comment !== 'right'"></canvas>
              <canvas :ref="'thirdShape'" width="150" height="66" v-show="false" ></canvas>
              <canvas class="cardCanvas" :ref="'thirdCard'" width="150" height="198" v-show="comment === 'right'"></canvas>
            </div>
          </div>
          <div class="container6">
              <div class="cardFree" v-for="(card, i) in sets[contentIndex].optionsForTheThird" :key="card.index">
                <canvas class="shapeCanvas" :ref="'shape1'+i" width="150" height="66" v-show="false" ></canvas>
                <canvas class="cardCanvas" :ref="'card1'+i" width="150" height="198" @click = "clickCard(card, i)" :class= "{clicked: card.state === 'clicked'}" v-show = "card.state !== 'hide'"></canvas>
              </div>
          </div><!-- container6 -->
      </div><!-- card-content -->
    </div><!-- card -->
      <footer class="card-footer">
        <footerNextPage class="footer"
        v-bind:pageCount = "sets.length"
        v-bind:currentIndex = "contentIndex"
        v-bind:bottunGoOut = "goToGamePage"
        v-bind:callFrom = "'practice'"
        @indexUpdateEvent= "onIndexUpdate">
        </footerNextPage>
      </footer>
  </div><!-- main -->
</template>

<script>
import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import store from '../js/store.js'
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
      comment: 'nothing',
      sets: store.practiceSets,
      goToGamePage: false
    }
  },
  mounted () {
    this.context = []
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

    const questionMark = new CardView(this.$refs[`card-question`], this.$refs[`card-question`], 'non')
    questionMark.drawQuestionMark()
  },
  methods: {
    clickCard: function (card, i) {
      utils.resetCardState(this.sets[this.contentIndex].optionsForTheThird)
      if (card.state === 'clicked') {
        this.comment = 'nothing'
        this.$forceUpdate()
      } else {
        card.state = 'clicked'
        this.check()
        this.$forceUpdate()
      }
    }, // end of click

    check: function () {
      const setArray = []
      setArray.push(this.sets[this.contentIndex].first2cards[0])
      setArray.push(this.sets[this.contentIndex].first2cards[1])

      this.sets[this.contentIndex].optionsForTheThird.forEach((card, i) => {
        if (card.state === 'clicked') {
          setArray.push(card)
          if (utils.isSet(setArray, 0, 1, 2)) {
            this.comment = 'right'
            this.putThirdCard()
            this.flipPageOnRightAnswer(this.contentIndex + 1)
            this.finishPractice()
          } else {
            this.comment = 'wrong'
          }
        }
      })
    },

    finishPractice () {
      if (this.contentIndex === this.sets.length - 1) {
        setTimeout(() => {
          this.goToGamePage = true
        }, 1000)
      }
    },

    flipPageOnRightAnswer (nextPageIndex) {
      if (nextPageIndex < this.sets.length) {
        setTimeout(() => {
          this.onIndexUpdate(nextPageIndex, 'next')
          this.$forceUpdate()
        }, 1500)
      }
    },

    putThirdCard () {
      const third = new CardView(this.$refs.thirdShape, this.$refs.thirdCard, '', 1, '', '')
      third.setNewCardAtrr(this.sets[this.contentIndex].third)
    },

    onIndexUpdate: function (index, direction) {
      this.contentIndex = index
      this.sets[this.contentIndex].first2cards.forEach((card, i) => {
        this.context[i].setNewCardAtrr(card)
      })
      this.sets[this.contentIndex].optionsForTheThird.forEach((card, i) => {
        this.context[i + 2].setNewCardAtrr(card)
      })
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

  .cardFree{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 22%;
    height: 38%;
    margin: 2%;
    position: relative;
  }

  .container6{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    border: 1px solid #00D1B2;
    padding: 10px 20px 0 20px;
    border-radius: 5px;
    background-color: white;
  }
  .setContainer{
    border: 1px solid lightpink;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: white;
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
  .card-footer, .footer{
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 0;
  }
  .container6{
    width: 43%;
    height: 65%;
  }
  .setContainer{
    width: 43%;
  }  
}
/*************************************
mobile
***************************************/
@media only screen and (max-width: 768px) {
  .card-footer, .footer{
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 0;
  }
  .container6{
    width: 100%;
    height: 65%;
  }
  .setContainer{
    width: 100%;
  }
}
</style>
