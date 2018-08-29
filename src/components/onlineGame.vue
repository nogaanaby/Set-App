<template>
  <div class="game template-div">
      <div class="card">
        <header class="card-header fadeInDown" v-if="pageState === 'game'">
          <div class="menu-fitures columns is-mobile">
            <!--<help class = "column"
            v-bind:cardsViewsArray = "cardsViewsOnTheTable"
            v-bind:hintState = "hintState"
            @findSetEvent= "getHelp"></help>!-->

            <score class = "column"
            v-bind:cards = "opponentCollection"
            v-bind:nickname = "opponentNickname"
            v-bind:color = "'grey'"
            v-bind:gameStatus = "'single'"></score>

            <score class = "column"
            v-bind:cards = "myCollection"
            v-bind:nickname = "myNickname"
            v-bind:color = "'green'"
            v-bind:gameStatus = "'single'"></score>

            <clock v-if="startTimer" class = "column"
            v-bind:timeToPlay = "timeToPlay"
            v-bind:startTimer = "startTimer"
            @timeOver= "gameOver"></clock>
          </div>
        </header>
        <div class="card-content fadeInDown">
                <cards-container v-show="pageState === 'game'"
                  v-bind:cardsData = "cardsOnTheTable"
                  v-bind:length = "length"
                  @clickCardEvent = "sendTheClickToTheOpponent"
                  @foundASet="foundASet"
                  @oppFoundASet="oppFoundASet">
                </cards-container>
            <game-over class="game-over" v-if="pageState === 'over'"
              v-bind:gameStatus = "'copple'"
              v-bind:fathersTitle="returnTheWinner()"
              v-bind:winner="myNickname"
              v-bind:mainCollection="myCollection / 3"
              v-bind:fathersColumn1="myNickname + ' collected ' + myCollection/ 3 + ' sets'"
              v-bind:fathersColumn2="opponentNickname + ' collected ' + opponentCollection / 3 + ' sets'"
              @playAgainEvent= "playAgain"></game-over>
        </div>
      </div>
    <brand-footer class="footer"></brand-footer>
  </div>
</template>
<script>
import clock from '@/components/clock.vue'
import help from '@/components/help.vue'
import score from '@/components/score.vue'
import utils from '../js/utils.js'
import store from '../js/store.js'
import { CardView } from '../js/CardViews.js'
import backGame, { CardsDeck } from '../js/backGame.js'
import frontGame from '../js/frontGame.js'
import gameOver from '@/components/gameOver.vue'
import brandFooter from '@/components/brandFooter.vue'
import cardsContainer from '@/components/cardsContainer.vue'
export default{
  name: 'offline2Players',
  components: {
    gameOver,
    brandFooter,
    clock,
    help,
    score,
    cardsContainer
  },
  data () {
    return {
      pageState: 'game',
      myNickname: store.thisUser.nickname,
      opponentNickname: '',
      cardsOnTheTable: store.cardsOnTheTable,
      length: 9,
      myCollection: 0,
      opponentCollection: 0,
      set: [],
      notSet: false, // bazzes the cards in a mistaken set
      timeToPlay: 2 * 10 * 1000,
      hintState: 1,
      playerFound: false,
      startTimer: false
    }
  },
  created () {
    this.findTheOpponent()
  },
  mounted () {
    console.log(store.cardsOnTheTable)
    if (store.onlineUsersCopy.users.length !== 0) {
      this.updateMyStatus('onGame')
    }
  },
  sockets: {
    startTimer () {
      this.startTimer = true
    }
  },
  methods: {
    findTheOpponent () {
      if (store.inviter.nickname === '') {
        this.opponentNickname = store.invited.nickname
      } else {
        this.opponentNickname = store.inviter.nickname
      }
    },
    putCards () {

    },
    /**************************************
     game
    *************************************/
    foundASet () {
      this.myCollection += 3
      this.playerFound = true
      setTimeout(() => {
        this.playerFound = false
      }, 1000)
      this.hintState = 1
    },
    oppFoundASet () {
      this.opponentCollection += 3
    },
    sendTheClickToTheOpponent (card) {
      const oppAndCard = {
        nickname: this.opponentNickname,
        card: card
      }
      console.log(card)
      this.$socket.emit('clickCard', oppAndCard)
    },
    /**************************************
     2 pleyers staf
    *************************************/
    returnTheWinner () {
      if (this.myCollection > this.opponentCollection) {
        return 'Congradulations! You The Winner!'
      } else if (this.myCollection < this.opponentCollection) {
        return 'You Lost :('
      } else {
        return 'This Is A Tie!'
      }
    },
    /*****************************
     * fitures
     *************************/
    // getHelp (cardsArray) {
    //   if (this.hintState < 3) {
    //     this.cardsViewsOnTheTable = cardsArray
    //     this.hintState++
    //   }
    // },
    playAgain () {
      this.myCollection = 0
      this.opponentCollection = 0
      this.pageState = 'game'
      this.updateMyStatus('onGame')
      this.$forceUpdate()
    },
    gameOver () {
      this.pageState = 'over'
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

</style>
