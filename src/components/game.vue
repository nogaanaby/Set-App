<template>
  <div class="game template-div">
      <div class="card">
        <header class="card-header fadeInDown" v-if="pageState === 'game'">
          <div class="menu-fitures columns is-mobile">
            <help class = "column"
            v-bind:hintState = "hintState"
            @findSetEvent= "getHelp"></help>
            <score class = "column"
            v-bind:cards = "collectedCards"
            v-bind:nickname = "'sets'"
            v-bind:color = "'green'"
            v-bind:gameStatus = "'single'"
            v-bind:playerFound = "playerFound"></score>
            <clock class = "column"
            v-bind:timeToPlay = "timeToPlay"
            @timeOver= "gameOver"></clock>
          </div>
        </header>
        <div class="card-content fadeInDown">
          <cards-container v-show="pageState === 'game'"
            v-bind:cardsData = "cardsData"
            v-bind:length = "9"
            v-bind:hintCard="setCard"
            @foundASet="foundASet">
          </cards-container>
          <game-over v-if="pageState === 'over'"
            v-bind:winner="'you'"
            v-bind:fathersTitle="'Game Over'"
            v-bind:mainCollection = "collectedCards / 3"
            v-bind:gameStatus="'single'"
            @playAgainEvent= "playAgain"></game-over>
        </div>
      </div>
      <brand-footer class="footer"></brand-footer>
  </div>
</template>
<script>
import backGame, { CardsDeck } from '../js/backGame.js'
import frontGame from '../js/frontGame.js'
import clock from '@/components/clock.vue'
import help from '@/components/help.vue'
import score from '@/components/score.vue'
import gameOver from '@/components/gameOver.vue'
import gameMenu from '@/components/nav.vue'
import brandFooter from '@/components/brandFooter.vue'
import store from '../js/store.js'
import utils from '../js/utils.js'
import cardsContainer from '@/components/cardsContainer.vue'

export default{
  name: 'game',
  components: {
    gameOver,
    brandFooter,
    gameMenu,
    clock,
    help,
    score,
    cardsContainer
  },
  data () {
    return {
      pageState: 'game',
      setCard: '',
      cardsData: utils.mixArray(new CardsDeck().cardsDeckArray),
      collectedCards: 0,
      set: [],
      timeToPlay: 2 * 60 * 1000,
      hintState: 1,
      playerFound: false
    }
  },
  created () {
  },
  mounted () {
    if (store.onlineUsersCopy.users.length !== 0) {
      this.updateMyStatus('onGame')
    }
  },
  methods: {
    /**************************************
     game
    *************************************/
    foundASet () {
      this.collectedCards += 3
      this.playerFound = true
      setTimeout(() => {
        this.playerFound = false
      }, 1000)
      this.hintState = 1
    },
    /*****************************
     * fitures
     *************************/
    getHelp (setCard) {
      if (this.hintState < 3) {
        this.setCard = setCard
        this.hintState++
      }
    },
    playAgain () {
      this.collectedCards = 0
      this.pageState = 'game'
      this.updateMyStatus('onGame')
      this.$forceUpdate()
    },
    gameOver () {
      this.pageState = 'over'
      // backGame.resetCardState(this.cardsViewsOnTheTable)
      this.hintState = 1
      this.updateMyStatus('availble')
      this.$forceUpdate()
    },
    updateMyStatus (status) {
      const userAndStatus = {
        nickname: store.thisUser.nickname,
        status: status
      }
      this.$socket.emit('updateOnChangingStatus', userAndStatus)
    }
  }
}
</script>

<style scoped>
.column{
  padding: 0;
}
.card-header{
  padding: 0;
}
.fitures{
  margin: 0 7px;
}
</style>
