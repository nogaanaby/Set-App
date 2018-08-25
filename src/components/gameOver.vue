<template>
  <div class="gameOver">
        <header class="fadeInDown">
          <h1 class="huge-title">{{fathersTitle}}</h1>
        </header>
        <div class="myScore bounceIn">
          <p>You Collected: </p>
          <h1 class="title-is-big">{{collection}}</h1>
          <p>Sets</p>
        </div>
          <a class="button is-medium is-success playAgain" @click = "PlayAgain()">Play Again</a>
          <div class="columns is-mobile gameOver">
            <p class="column collected1">
              {{fathersColumn1}}
            </p>
            <p class="column collected2">
              {{fathersColumn2}}
            </p>
          </div><!-- end of colums game over -->
  </div> <!-- end game over -->
</template>
<script>
import store from '../js/store.js'
export default{
  name: 'gameOver',
  components: {

  },
  props: ['collectedCardsLength', 'fathersTitle', 'fathersColumn2', 'fathersColumn1', 'collection'],
  data () {
    return {
      pageState: 'game',
      collectedCards: []
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    PlayAgain: function () {
      this.$emit('playAgainEvent')
    }
  }
}
</script>

<style scoped>
/*************************************
All device
***************************************/
.myScore{
  border: 1px solid orange;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.title-is-big{
  font-family: 'Jua', cursive;
  font-size: 3em;
}
/*************************************
desktop
***************************************/
@media only screen and (min-width: 769px) {
  .columns{
    margin: 30px;
}
  .roundedButton{
    margin-top: 15px;
    margin-bottom: 15px;
    height: 70px;
    width: 70px;
    border-radius: 50%;
  }
  header{
    margin-bottom: 40px;
    margin-top: 20px;
  }
}

/*************************************
mobile
***************************************/
@media only screen and (max-width: 768px) {
  .button{
    width: 20%;
    font-size: 0.75em;
  }
.collected1{
  float: left;
}
.gameOver{
  margin: 20px;
}
.playAgain{
  margin-top: 40px;
  margin-bottom: 20px;
  width: 40%;
  font-size: 1em;
}
}
</style>
