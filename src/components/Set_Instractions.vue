<template>
<div class="main">
    <div class="page1" v-if="page1">
        <h3>How To Play The Set Game</h3>
        <div class="flippingCards">
            <div class="card">
                <h4>each card has 4 atributes</h4>
                <ul class="cardText">
                    <li>Shape</li>
                    <li>Color</li>
                    <li>Filling</li>
                    <li>And Number Of shapes
                        <br> on the card</li>
                </ul>
                <div class="exampleCard1">
                <canvas :ref="'shape'+0" width="150" height="66" v-show="false" ></canvas>
                <canvas id="firstOne" :ref="'card'+0" width="150" height="198"></canvas>
                </div>
            </div>
                <div class="card" v-show="page1">
                    <p class="cardText">your goal is to find three cards (lets say group of friend or family) that no one at the group is "outsider" </p>
                    <br>
                    <p class="cardText">lets say for example: </p>
                    <div class="exampleSet1">
                    <canvas :ref="'shape'+1" width="150" height="66" v-show="false" ></canvas>
                    <canvas :ref="'card'+1" width="150" height="198"></canvas>
                    <canvas :ref="'shape'+2" width="150" height="66" v-show="false" ></canvas>
                    <canvas :ref="'card'+2" width="150" height="198"></canvas>
                    <canvas :ref="'shape'+3" width="150" height="66" v-show="false" ></canvas>
                    <canvas :ref="'card'+3" width="150" height="198"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="page2" v-show="page2">
            <setExampleTable id="table"></setExampleTable>
        </div>

    <button v-on:click="switchPages()" id="arrowNext"> <img id="arrowImg" src='@/assets/angle-right-solid.svg' width="25px" height="25px"></button>
    <button v-on:click="switchBack()" id="arrowBack"> <img id="arrowImg" src='@/assets/Arrow-Point-Right.png' width="80px" height="60px"></button>

</div>
</template>

<script>

import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import instractionsTables from '@/components/instractionsTables'

export default {
  name: 'SetInstractions',
  components: {
    'setExampleTable': instractionsTables
  },
  data () {
    return {
      page1: true,
      page2: false,
      page3: false,
      cardsInTheExamples: [
        utils.cardObject('example_first_card', 'rect', 'red', 2, 'stripes'),
        utils.cardObject('example_for_set', 'rect', 'purple', 1, 'stripes'),
        utils.cardObject('example_for_set', 'sub', 'purple', 2, 'stripes'),
        utils.cardObject('example_for_set', 'tri', 'purple', 3, 'stripes')
      ]
    }
  },
  mounted () {
    for (let i = 0; i < this.cardsInTheExamples.length; i++) {
      const context = new CardView(this.$refs[`shape${i}`], this.$refs[`card${i}`], this.cardsInTheExamples[i].shape, this.cardsInTheExamples[i].color, this.cardsInTheExamples[i].fill, this.cardsInTheExamples[i].number)
      context.drawCard()
    }
  },
  methods: {
    switchPages () {
      this.page1 = false
      this.page2 = true
    },
    switchBack () {
      this.page1 = true
      this.page2 = false
      location.reload()
    }
  }
}
</script>

<style scoped>
    .cardText{
        text-align: left;
        padding: 10px;
        margin: 10px 5px;
        font-size: 1.1em;
    }
    canvas{
      transform: rotate(90deg);
      width: 100%;
      object-fit: contain;
      height: 100%;
      margin-left: 30px;
    }
    h3 {
       font-size: 2em;
       margin-top: 20px;
       margin-bottom: 20px;
    }
    h4{
        margin: 22px 10px;
        font-size: 1.2em;
        text-align: left;
        font-weight: bold;
    }
    .flippingCards{
        margin: auto;
        padding: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .exampleCard1{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        width: 25%;
        height: 38%;
        margin-left: 30px;
        padding: 0;
    }
    .exampleSet1{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 20%;
    height: 22%;
    margin: 0;
    flex-direction: column;
    }
    .card{
    border: 1px solid gray;
    border-radius: 7px;
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    height: 380px;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    }
    .page2{
    display: flex;
    justify-content: center;
    flex-direction: row;
    }
    #rullTitle{
      font-size: 1.5em;
    }
    .instractionText{
      width: 100%;
    }
</style>
