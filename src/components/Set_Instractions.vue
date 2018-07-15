<template>
<div class="main">
    <h3>How To Play The Set Game</h3>

    <div class="flippingCards">
        <div class="card">
            <h4>each card has 4 atributes</h4>
            <ul>
                <li>Shape</li>
                <li>Color</li>
                <li>Filling</li>
                <li>And Number Of shapes on the card</li>
            </ul>
            <canvas ref="cardCanvas"></canvas>
        </div>
        <div class="card">
            <p>your goal is to find three cards (lets say group of friend or family) that no one at the group is "outsider" </p>
            <br>
             <p>lets say for example: </p>
        </div>
        <div class="card">
                            <table style="width:100%">
                <tr>
                    <th>shpae</th>
                    <th>number</th> 
                    <th>color</th>
                    <th>fill</th>
                </tr>
                <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                </tr>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>80</td>
                </tr>
                </table>
        </div>
    </div>

    <button id="arrow"> <img id="arrowImg" src='@/assets/Arrow-Point-Right.png' width="80px" height="60px"></button>

</div>
</template>

<script>

import CardFront from '@/components/CardFront.vue'

export default {
  components: {
    CardFront
  },
  name: 'SetInstractions',
  data () {
    return {

    }
  },
  mounted () {

        let cardCanvas = this.$refs.cardCanvas
        console.log(cardCanvas)
        let cardContext = cardCanvas.getContext("2d")
        this.CardFront.drawSub(cardContext)

  },
  methods: {

  }
}
</script>

<style scoped>
    *{
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    h3 {
       font-size: 2em;
    }
    .flippingCards{
        margin: auto;
        padding: 0px;
        width: 70%;
        height: 80%;
        overflow: auto;
    }
    .card{
        border: 1px solid gray;
        margin-left: 10px;
        margin-right: 10px;
        width: 250px;
        height: 380px;
        float:left;

    }
    p{
        padding-left: 30px;
        padding-right: 30px;
        margin-top: 10px;
        margin-bottom: 0px;
    }
    ul{
        text-align: left;
        list-style-type: none;
        padding-right: 20px;
    }
    h4{
        text-align: left;
        padding-left: 40px;
        padding-right: 10px;
        font-size: 1.2em;
        margin-top: 10px;
    }
    tr{
        border: 1px solid gray;
    }
    #arrow{
        float: right;
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        margin:5px;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
    #arrowImg:hover{
        width:85px;
        height:65px;
    }

</style>
