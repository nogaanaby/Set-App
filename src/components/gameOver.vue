<template>
  <div class="gameOver">
        <header class="fadeInDown">
          <h1 class="noga-title">{{fathersTitle}}</h1>
        </header>
          <a class="button is-medium is-success playAgain" @click = "PlayAgain()">Play Again</a>
          <div class="columns is-mobile gameOver">
            <p class="noga-title column collected1">
              {{fathersColumn1}}
            </p>
            <p class="noga-title column collected2">
              {{fathersColumn2}}
            </p>
          </div><!-- end of colums game over -->
  </div> <!-- end game over -->
</template>
<script>

export default{
  name: 'gameOver',
  components: {

  },
  props: ['collectedCardsLength', 'fathersTitle', 'fathersColumn2', 'fathersColumn1'],
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
      location.reload()
    }
  }
}
</script>

<style scoped>
/*************************************
All device
***************************************/
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