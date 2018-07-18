<template>
<div class="main">
    <h3>How To Play The Set Game</h3>

    <div class="flippingCards">
        <div class="card" v-if="page1">
            <h4 class="cardText">each card has 4 atributes</h4>
            <ul class="cardText">
                <li>Shape</li>
                <li>Color</li>
                <li>Filling</li>
                <li>And Number Of shapes on the card</li>
            </ul>
            <div id="exampleCard1">
            <canvas :ref="'shape'+0" width="150" height="66" style="display:none" ></canvas>
            <canvas id="firstOne" :ref="'card'+0" width="150" height="198"></canvas>
            </div>
        </div>
        <div class="card" v-show="page1">
            <p class="cardText">your goal is to find three cards (lets say group of friend or family) that no one at the group is "outsider" </p>
            <br>
             <p class="cardText">lets say for example: </p>
            <div id="exampleSet1">
            <canvas :ref="'shape'+1" width="150" height="66" style="display:none" ></canvas>
            <canvas :ref="'card'+1" width="150" height="198"></canvas>
            <canvas :ref="'shape'+2" width="150" height="66" style="display:none" ></canvas>
            <canvas :ref="'card'+2" width="150" height="198"></canvas>
            <canvas :ref="'shape'+3" width="150" height="66" style="display:none" ></canvas>
            <canvas :ref="'card'+3" width="150" height="198"></canvas>
            </div>
        </div>
        <div class="page2" v-show="page2">
            <h4>this is a set</h4>
            <div class="cardTables">
            <table style="width:80%">
                <tr class="cardText">
                    <th>atributes</th>
                    <th>card 1</th>
                    <th>card 2</th>
                    <th>card 3</th>
                </tr>
                <tr class="cardText">
                    <td style="font-weight: bold">shape</td>
                    <td>Sub <img class="vicon" src='@/assets/vicon.png'> </td>
                    <td>Sub <img class="vicon" src='@/assets/vicon.png'> </td>
                    <td>Sub <img class="vicon" src='@/assets/vicon.png'> </td>
                </tr>
                <tr class="cardText">
                    <td style="font-weight: bold">number</td>
                    <td>1 shape <img class="xicon" src='@/assets/xicon.png'> </td>
                    <td>2 shape <img class="xicon" src='@/assets/xicon.png'> </td>
                    <td>3 shape <img class="xicon" src='@/assets/xicon.png'> </td>
                </tr>
                <tr class="cardText">
                    <td style="font-weight: bold">color</td>
                    <td>green <img class="vicon" src='@/assets/vicon.png'> </td>
                    <td>green <img class="vicon" src='@/assets/vicon.png'> </td>
                    <td>green <img class="vicon" src='@/assets/vicon.png'> </td>
                </tr>
                <tr class="cardText">
                    <td style="font-weight: bold">fill</td>
                    <td>stripes <img class="xicon" src='@/assets/xicon.png'> </td>
                    <td>empty <img class="xicon" src='@/assets/xicon.png'> </td>
                    <td>full <img class="xicon" src='@/assets/xicon.png'> </td>
                </tr>
                </table>
                <div id="exampleSet2">
                <canvas :ref="'shape'+4" width="150" height="66" style="display:none" ></canvas>
                <canvas :ref="'card'+4" width="150" height="198"></canvas>
                <canvas :ref="'shape'+5" width="150" height="66" style="display:none" ></canvas>
                <canvas :ref="'card'+5" width="150" height="198"></canvas>
                <canvas :ref="'shape'+6" width="150" height="66" style="display:none" ></canvas>
                <canvas :ref="'card'+6" width="150" height="198"></canvas>
                </div>
                </div>
        </div>
    </div>

    <button v-on:click="switchPages()" id="arrowNext"> <img id="arrowImg" src='@/assets/Arrow-Point-Right.png' width="80px" height="60px"></button>
    <button v-on:click="switchBack()" id="arrowBack"> <img id="arrowImg" src='@/assets/Arrow-Point-Right.png' width="80px" height="60px"></button>

</div>
</template>

<script>

import utils from '../js/utils.js'

export default {
  name: 'SetInstractions',
  data () {
    return {
      shapeCanvas: [],
      cardCanvas: [],
      shapeContext: [],
      cardContext: [],
      page1: true,
      page2: false,
      cardsInTheExamples: [
        utils.cardObject('example_first_card', 'rect', 'red', 2, 'stripes'),
        utils.cardObject('example_for_set', 'rect', 'purple', 1, 'stripes'),
        utils.cardObject('example_for_set', 'sub', 'purple', 2, 'stripes'),
        utils.cardObject('example_for_set', 'tri', 'purple', 3, 'stripes'),
        utils.cardObject('example_for_set_in_the_table', 'sub', 'green', 1, 'stripes'),
        utils.cardObject('example_for_set_in_the_table', 'sub', 'green', 2, 'empty'),
        utils.cardObject('example_for_set_in_the_table', 'sub', 'green', 3, 'full')
      ]
    }
  },
  mounted () {
    for (let i = 0; i < 7; i++) {
      this.shapeCanvas[i] = this.$refs[`shape${i}`]
      utils.what(this.shapeCanvas[i])
      this.shapeContext[i] = this.shapeCanvas[i].getContext('2d')
      utils.what(this.shapeContext[i])
      utils.drawShape(this.shapeContext[i], this.cardsInTheExamples[i].shape)
      utils.changeColor(this.shapeContext[i], this.cardsInTheExamples[i].color)
      utils.changeFill(this.shapeContext[i], this.cardsInTheExamples[i].shape, this.cardsInTheExamples[i].fill)

      this.cardCanvas[i] = this.$refs[`card${i}`]
      utils.what(this.cardCanvas[i])
      this.cardContext[i] = this.cardCanvas[i].getContext('2d')
      utils.what(this.cardContext[i])
      utils.copyShape(this.shapeContext[i], this.cardContext[i], this.cardsInTheExamples[i].number)
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
    #exampleSet2{
        -webkit-transform: scale(0.7);
        -moz-transform: scale(0.7);
        -o-transform: scale(0.7);
        transform: scale(0.7);
        display: flex;
        flex-direction: row;
        justify-content: top;
    }
    .cardTables{
        margin-left: 10px;
        margin-right: 10px;
        width: 700px;
        height: 400px;
        background-color: white;
        display: flex;
        justify-content: center;
        border: 1px solid gray;
        border-radius: 7px;
        flex-direction: column;
    }
    ul{
        list-style-type: none;
    }
    h4{
        font-size: 1.2em;
    }
    table{
        margin: 10px;
    }
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        font-size: 1em;
        text-align: center;
        padding: 5px 0px;
    }
</style>
