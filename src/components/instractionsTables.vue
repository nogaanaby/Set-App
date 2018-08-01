<template>
  <div class="main">
    <gameMenu></gameMenu>
    <div class="card">
      <header class="card-header">
        <h1>
          {{pageData[contentIndex].title}}
        </h1>
      </header>
      <div class="card-content">
        <div class="content">
          {{pageData[contentIndex].setExplain}}
        </div>
        <div class="columns">
          <div class="setCard column" v-for="(card, i) in sets[contentIndex]" :key="card.index">
            <canvas :ref="'shape'+i" width="150" height="66" v-show="false" ></canvas>
            <canvas :ref="'card'+i" width="150" height="198"></canvas>
          </div>
        </div>
        <div class="cardTables">
          <table class="table is-striped">

            <tr class="cardText">
              <td v-for="(shape, i) in sets[contentIndex]" :key="shape.index">
                <vx-icon v-bind:setIcon = "setIcon[contentIndex][i].sameShape"></vx-icon>
                {{sets[contentIndex][i].shape}}
              </td>
            </tr>
            <tr class="cardText">
              <td v-for="(card, i) in sets[contentIndex]" :key="card.index">
                  <vx-icon v-bind:setIcon = "setIcon[contentIndex][i].sameNumber"></vx-icon>
                  {{sets[contentIndex][i].number}} shapes
              </td>
            </tr>
            <tr class="cardText">
              <td v-for="(color, i) in sets[contentIndex]" :key="color.index">
                  <vx-icon v-bind:setIcon = "setIcon[contentIndex][i].sameColor"></vx-icon>
                  {{sets[contentIndex][i].color}}
              </td>
            </tr>
            <tr class="cardText">
              <td v-for="(fill, i) in sets[contentIndex]" :key="fill.index">
                <vx-icon v-bind:setIcon = "setIcon[contentIndex][i].sameFill"></vx-icon>
                {{sets[contentIndex][i].fill}}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <footer class="card-footer">
        <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
          <a class="pagination-previous" @click="prevPage()"><img id="arrowImg" src='@/assets/angle-left-solid.svg' width="25px" height="25px"></a>
          <a class="pagination-next" @click="nextPage()"><img id="arrowImg" src='@/assets/angle-right-solid.svg' width="25px" height="25px"></a>
          <ul class="pagination-list">
            <li><a class="pagination-link" aria-label="Page 46" aria-current="page">{{this.contentIndex + 1}}</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  </div>
</template>

<script>

import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import gameMenu from '@/components/nav.vue'
import vxIcon from '@/components/vx-icon'

export default {
  name: 'instractionsTables',
  components: {
    gameMenu,
    vxIcon
  },
  data () {
    return {
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
    /*
    for (let ci = 0; ci < this.sets.length; ci++) {
      for (let i = 0; i < 2; i++) {
        this.setIcon[ci].push(utils.compare(this.sets[ci][i], this.sets[ci][i + 1]))
      }
      this.setIcon[ci].push(utils.compare(this.sets[ci][0], this.sets[ci][2]))
    }
    console.log(this.setIcon) */

    for (let ci = 0; ci < this.sets.length; ci++) {
      this.setIcon[ci].push(utils.compare(this.sets[ci][0], this.sets[ci][1], this.sets[ci][2]))
      this.setIcon[ci].push(utils.compare(this.sets[ci][1], this.sets[ci][2], this.sets[ci][0]))
      this.setIcon[ci].push(utils.compare(this.sets[ci][2], this.sets[ci][1], this.sets[ci][0]))
    }
    console.log(this.setIcon)
  },
  mounted () {
    this.sets[this.contentIndex]
      .forEach((card, i) => {
        const cardView = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], card)
        this.context.push(cardView)
        this.context[i].drawCard()
      })
  },
  methods: {
    nextPage: function () {
      this.contentIndex = Math.min(this.contentIndex + 1, this.sets.length - 1)
      this.changeContent()
    },
    prevPage: function () {
      this.contentIndex = Math.max(this.contentIndex - 1, 0)
      this.changeContent()
    },
    changeContent: function () {
      this.context.forEach((element, i) => {
        element.setNewCardAtrr(this.sets[this.contentIndex][i])
      })
    }
  }
}
</script>

<style scoped>
    .content{
      font-size: 1em;
      width: 70%;
      margin: auto;
      height: 60px;
    }
    .columns{
      width: 50%;
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
    }
    .setCard{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 10%;
        height: 10%;
        margin: 0 5%;
    }
    .card-footer{
      justify-content: center;
    }
    .pagination{
      width: 100%;
      margin:20px;
    }
    a{
      border: none;
    }
    a:active:before{
      border: none;
    }
</style>
