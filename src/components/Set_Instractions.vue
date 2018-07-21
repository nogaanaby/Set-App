<template>
<div class="main">
    <div class="page1" v-if="page1">
        <h3>How To Play The Set Game</h3>
        <div class="flippingCards">
            <div class="card">
                <h4 class="cardText">each card has 4 atributes</h4>
                <ul class="cardText">
                    <li>Shape</li>
                    <li>Color</li>
                    <li>Filling</li>
                    <li>And Number Of shapes on the card</li>
                </ul>
                <div id="exampleCard1">
                <canvas :ref="'shape'+0" width="150" height="66" v-show="false" ></canvas>
                <canvas id="firstOne" :ref="'card'+0" width="150" height="198"></canvas>
                </div>
            </div>
                <div class="card" v-show="page1">
                    <p class="cardText">your goal is to find three cards (lets say group of friend or family) that no one at the group is "outsider" </p>
                    <br>
                    <p class="cardText">lets say for example: </p>
                    <div id="exampleSet1">
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
            <h4>this is a set</h4>
                <div class="instractionText">
                <h4 id="rullTitle">The main Rull Is:</h4>
                <p>if the first two cards are different in some attribute - the third must be also different from the first two in that attributes
                <br>if the first two cards are same in some attribute - the third must have also the same attribute
                </p>
                </div>
            <setExampleTable></setExampleTable>
        </div>

    <button v-on:click="switchPages()" id="arrowNext"> <img id="arrowImg" src='@/assets/Arrow-Point-Right.png' width="80px" height="60px"></button>
    <button v-on:click="switchBack()" id="arrowBack"> <img id="arrowImg" src='@/assets/Arrow-Point-Right.png' width="80px" height="60px"></button>

</div>
</template>

<script>

import utils, { CardView } from '../js/utils.js'
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
    }
    canvas{
      transform: rotate(90deg);
      margin-left: 60px;
      margin-top: 0px;
    }
    h3 {
       font-size: 2em;
       margin-top: 20px;
       margin-bottom: 20px;
    }
    h4{
        margin-top: 0px;
        font-size: 1.2em;
    }
    .flippingCards{
        margin: auto;
        padding: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    #exampleCard1{
        -webkit-transform: scale(0.7);
        -moz-transform: scale(0.7);
        -o-transform: scale(0.7);
        transform: scale(0.7);
        display: flex;
        justify-content: left;
        margin-bottom: 40px;
    }
    #exampleSet1{
        -webkit-transform: scale(0.4);
        -moz-transform: scale(0.4);
        -o-transform: scale(0.4);
        transform: scale(0.4);
        display: flex;
        flex-direction: row;
        justify-content: top;
    }
    .card{
    border: 1px solid gray;
    border-radius: 7px;
    margin-left: 10px;
    margin-right: 10px;
    width: 300px;
    height: 380px;
    float:left;
    background-color: white;
    display: flex;
    justify-content: left;
    flex-direction: column;
    }
    .page2{
    display: flex;
    justify-content: center;
    flex-direction: column;
    }
    #rullTitle{
      font-size: 1.5em;
    }
</style>
