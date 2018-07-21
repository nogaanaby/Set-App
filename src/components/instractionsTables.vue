<template>
<div class="main">
  <div class="cardTables">
      <div class="instractionText">
        <p>the first two have the same shape and color, and the third also have the same shape and color as the rest
        <br>and in the different atributes: number and fill
        <br>if the first two cards are different in some attribute -
        <br>the first card has 1 shape on it, the second has two shapes, and the third is also different: it has 3 shapes
        <br>and also that rull is exists in the attribute of fill
        </p>
      </div>
  <table>
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
      <div class="exampleSet2">
        <div id="setCard" v-for="(card, i) in firstSet" :key="card.index">
        <canvas :ref="'shape'+i" width="150" height="66" v-show="false" ></canvas>
        <canvas :ref="'card'+i" width="150" height="198"></canvas>
        </div>
      </div>
  </div>
</div>
</template>

<script>

import utils, { CardView } from '../js/utils.js'

export default {
  name: 'instractionsTables',
  data () {
    return {
      firstSet: [
        utils.cardObject('example_for_set_in_the_table', 'sub', 'green', 1, 'stripes'),
        utils.cardObject('example_for_set_in_the_table', 'sub', 'green', 2, 'empty'),
        utils.cardObject('example_for_set_in_the_table', 'sub', 'green', 3, 'full')
      ]
    }
  },
  mounted () {
    for (let i = 0; i < this.firstSet.length; i++) {
      const context = new CardView(this.$refs[`shape${i}`][0], this.$refs[`card${i}`][0], this.firstSet[i].shape, this.firstSet[i].color, this.firstSet[i].fill, this.firstSet[i].number)
      context.drawCard()
    }
  }
}
</script>

<style>
    canvas{
      transform: rotate(90deg);
      margin-top: 0px;
    }
    .exampleSet2{
        -webkit-transform: scale(0.7);
        -moz-transform: scale(0.7);
        -o-transform: scale(0.7);
        transform: scale(0.7);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 600px;
        height: 100px;
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
        flex-wrap: wrap;
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
    p{
      font-size: 0.7em;
    }
</style>
