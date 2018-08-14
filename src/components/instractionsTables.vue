<template>
  <div class="main">
    <gameMenu></gameMenu>
    <div class="card">
      <header class="card-header">
        <h1 class="noga-title">
          {{pageData[contentIndex].title}}
        </h1>
      </header>
      <div class="card-content" :class= "{fadeInRight: flipNext, fadeInLeft: flipBack}" >
        <div class="content">
          <p class="cardText">{{pageData[contentIndex].setExplain}}</p>
        </div>
        <div class="columns is-mobile">
          <div class="setCard column" v-for="(card, i) in sets[contentIndex]" :key="card.index">
            <canvas class="shapeCanvas" :ref="'shape'+i" width="150" height="66" v-show="false" ></canvas>
            <canvas class="cardCanvas" :ref="'card'+i" width="150" height="198"></canvas>
          </div>
        </div>
        <div class="cardTables">
          <table class="table is-striped">

            <tr>
              <td class="cardText" v-for="(shape, i) in sets[contentIndex]" :key="shape.index">
                <vx-icon v-bind:setIcon = "setIcon[contentIndex][i].sameShape"></vx-icon>
                {{sets[contentIndex][i].shape}}
              </td>
            </tr>
            <tr>
              <td class="cardText" v-for="(card, i) in sets[contentIndex]" :key="card.index">
                  <vx-icon v-bind:setIcon = "setIcon[contentIndex][i].sameNumber"></vx-icon>
                  {{sets[contentIndex][i].number}} shapes
              </td>
            </tr>
            <tr>
              <td class="cardText" v-for="(color, i) in sets[contentIndex]" :key="color.index">
                  <vx-icon v-bind:setIcon = "setIcon[contentIndex][i].sameColor"></vx-icon>
                  {{sets[contentIndex][i].color}}
              </td>
            </tr>
            <tr>
              <td class="cardText" v-for="(fill, i) in sets[contentIndex]" :key="fill.index">
                <vx-icon v-bind:setIcon = "setIcon[contentIndex][i].sameFill"></vx-icon>
                {{sets[contentIndex][i].fill}}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <footerNextPage
      class="footer"
      v-bind:pageCount = "sets.length"
      v-bind:currentIndex = "contentIndex"
      v-bind:bottunGoOut = "finished"
      v-bind:callFrom = "'instractions'"
      @indexUpdateEvent= "onIndexUpdate">
    </footerNextPage>
  </div>
</template>

<script>

import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import gameMenu from '@/components/nav.vue'
import vxIcon from '@/components/vx-icon'
import footerNextPage from '@/components/footer'

export default {
  name: 'instractionsTables',
  components: {
    gameMenu,
    vxIcon,
    footerNextPage
  },
  data () {
    return {
      flipNext: false,
      flipBack: false,
      finished: false,
      contentIndex: 0,
      context: [],
      sets: [
        [
          utils.cardObject('sub', 'purple', 1, 'stripes'),
          utils.cardObject('sub', 'purple', 2, 'stripes'),
          utils.cardObject('sub', 'purple', 3, 'stripes')
        ],
        [
          utils.cardObject('tri', 'green', 2, 'stripes'),
          utils.cardObject('sub', 'red', 2, 'stripes'),
          utils.cardObject('rect', 'purple', 2, 'stripes')
        ],
        [
          utils.cardObject('tri', 'green', 2, 'stripes'),
          utils.cardObject('sub', 'red', 2, 'stripes'),
          utils.cardObject('rect', 'purple', 3, 'stripes')
        ],
        [
          utils.cardObject('sub', 'green', 1, 'empty'),
          utils.cardObject('tri', 'purple', 2, 'stripes'),
          utils.cardObject('rect', 'red', 3, 'full')
        ],
        [
          utils.cardObject('sub', 'green', 1, 'empty'),
          utils.cardObject('tri', 'purple', 2, 'stripes'),
          utils.cardObject('rect', 'purple', 3, 'full')
        ]
      ],
      setIcon: [[], [], [], [], []],
      pageData: [
        {
          title: 'How To Play The Set Game',
          setExplain:
          'If the first two have the same attributes - the third must have those similarities. ' +
          'If the first two cards are different in some atributes - the third must be also different on that atributes. '
        },
        {
          title: 'This Is Anther Set Example',
          setExplain: 'The first two has the same fills and number of shapes - The third also have that. thay different in the colors and shapes - the third is also'
        },
        {
          title: `But If I Change 1 Little Thing... It Won't Be A Set Anymore`,
          setExplain: 'Because the first two has 2 shapes on them and the third has 3'
        },
        {
          title: 'This Is Also A Valid Set!',
          setExplain: 'The first two are completly different in all the attributes - and the third is exactly different from both of them!'
        },
        {
          title: `But This Isn't`,
          setExplain: 'The second and the third card are purple while the first is green!'
        }
      ]
    }
  },
  created () {
    for (let ci = 0; ci < this.sets.length; ci++) {
      this.setIcon[ci].push(utils.compare(this.sets[ci][0], this.sets[ci][1], this.sets[ci][2]))
      this.setIcon[ci].push(utils.compare(this.sets[ci][1], this.sets[ci][2], this.sets[ci][0]))
      this.setIcon[ci].push(utils.compare(this.sets[ci][2], this.sets[ci][1], this.sets[ci][0]))
    }
  },
  mounted () {
    this.sets[this.contentIndex]
      .forEach((card, i) => {
        const cardView = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], card)
        this.context.push(cardView)
        this.context[i].drawCard()
      })
    if (this.contentIndex === this.sets.length - 1) {
      setTimeout(() => {
        this.finished = true
      }, 1000)
    }
  },
  methods: {
    onIndexUpdate: function (index, direction) {
      this.contentIndex = index
      this.context.forEach((element, i) => {
        element.setNewCardAtrr(this.sets[this.contentIndex][i])
      })
      if (direction === 'next') {
        this.flipNext = true
        setTimeout(() => {
          this.flipNext = false
        }, 1000)
      } else {
        this.flipBack = true
        setTimeout(() => {
          this.flipBack = false
        }, 1000)
      }
    },
    finishInstractions () {
      if (this.contentIndex === this.sets.length - 1) {
        setTimeout(() => {
          this.finished = true
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
/* tablet & mobile **/
@media only screen and (max-width: 560px) {
  .cardText{
    font-size: 0.7em;
  }
  .columns.is-mobile{
    width: 80%;
    margin: auto;
  }
}
/**tablets**/
@media only screen and (min-width: 561px) and (max-width: 1019px) {
    .columns.is-mobile{
      width: 70%;
      margin: auto;
    }
}

/**desktop only**/
@media only screen and (min-width: 1020px) {
    .columns{
      width: 50%;
      margin: auto;
    }
}
/*************************************
all devices
***************************************/
    .setCard{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 30%;
      height: 30%;
      margin: 0 5%;
    }
    .content{
      font-size: 1em;
      width: 70%;
      margin: auto;
    }

    .cardTables{
      margin: auto;
      width: 60%;
      display: flex;
      border-radius: 7px;
      flex-direction: column;
      flex-wrap: wrap;
    }
    table{
        margin-top: 10px;
    }
    table, th, td {
        font-size: 1em;
        text-align: center;
        padding: 5px 0px;
    }
    canvas{
      transform: rotate(90deg);
      margin: 0px;
      width: 100%;
      object-fit: contain;
      height: 100%;
      max-width: 70px;
      min-width: 45px;
    }

/*************************************
mobile
***************************************/
</style>
