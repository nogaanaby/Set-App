<template>
  <div class="main">
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
        <div class="cardTables">
          <table class="table is-striped">
            <thead class="cardText">
              <th class="grey"></th>
              <th class="yellow">card 1</th>
              <th class="yellow">card 2</th>
              <th class="pink">card 3</th>
            </thead>
            <tr class="cardText">
              <td class="grey" style="font-weight: bold; width: 10%">shape</td>
              <td v-for="(shape, i) in sets[contentIndex]" :key="shape.index">
                  {{sets[contentIndex][i].shape}}
              </td>
            </tr>
            <tr class="cardText">
              <td class="grey" style="font-weight: bold">number</td>
              <td v-for="(number, i) in sets[contentIndex]" :key="number.index">
                  {{sets[contentIndex][i].number}} shapes
              </td>
            </tr>
            <tr class="cardText">
              <td class="grey" style="font-weight: bold">color</td>
              <td v-for="(color, i) in sets[contentIndex]" :key="color.index">
                  {{sets[contentIndex][i].color}}
              </td>
            </tr>
            <tr class="cardText">
              <td class="grey" style="font-weight: bold">fill</td>
              <td v-for="(fill, i) in sets[contentIndex]" :key="fill.index">
                {{sets[contentIndex][i].fill}}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <footer class="card-footer">
        <button @click="prevPage()" id="arrowBack"> <img id="arrowImg" src='@/assets/angle-left-solid.svg' width="25px" height="25px"></button>
        <div class="setCard" v-for="(card, i) in sets[contentIndex]" :key="card.index">
          <canvas :ref="'shape'+i" width="150" height="66" v-show="false" ></canvas>
          <canvas :ref="'card'+i" width="150" height="198" class="card-footer-item"></canvas>
        </div>
        <button @click="nextPage()" id="arrowNext"> <img id="arrowImg" src='@/assets/angle-right-solid.svg' width="25px" height="25px"></button>
      </footer>
    </div>
  </div>
</template>

<script>

import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'

export default {
  name: 'instractionsTables',
  data () {
    return {
      contentIndex: 0,
      context: [],
      someSet: [],
      green: utils.myGreen,
      myRed: '#ff6600',
      sets: [
        [
          utils.cardObject('sub', '#00B89C', 1, 'stripes'),
          utils.cardObject('sub', utils.myGreen, 2, 'empty'),
          utils.cardObject('sub', utils.myGreen, 3, 'full')
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
      ],
      pageData: [
        {
          title: 'How To Play The Set Game',
          setExplain: 'if the first two cards are *different* in some atributes - the third must be also different on that atributes. ' +
          'if the first two have *similar* attributes - the third must have those similarities'
        },
        {
          title: 'This Is A Set Example',
          setExplain: 'the first two cards are different in the numbers of shapes on the cards and in the fills - the third is cooperates. the first two has the same shape and color and that third also have them'
        },
        {
          title: 'This Is Another Set Example',
          setExplain: 'they all have the same numbers of shapes on the card and fill. they all different in the shapes and colors.'
        }
      ]
    }
  },
  created () {

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
      this.changeContent(this.sets, this.contentIndex)
    },
    prevPage: function () {
      this.contentIndex = Math.max(this.contentIndex - 1, 0)
      this.changeContent(this.sets, this.contentIndex)
    },
    changeContent: function (set, x) {
      this.context.forEach((element, i) => {
        element.setNewCardAtrr(this.sets[this.contentIndex][i])
      })
    }
  }
}
</script>

<style scoped>
    .cardTables{
        margin-left: 10px;
        margin-right: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
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
    .exampleSet2{
        display: flex;
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
    .card-footer{
        justify-content: center;
    }
    .grey{
        background-color: lightgrey;
    }
    .pink{
        background-color: pink;
    }
    .yellow{
        background-color: yellow;
    }
</style>
