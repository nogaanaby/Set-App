<template>
  <div class="score fitures">
    <a v-if="gameStatus==='single'" class="button is-outlined roundedButton" :class="{greenBorder: this.color==='green', purpleBorder: this.color==='purple'}" >
      <div :class="{bounceIn: playerFound}">
      <p class="title-in">
        {{cards / 3}}
      </p>
      </div>
    </a>
    <a v-if="gameStatus==='copple'" @click="press" class="button is-outlined roundedButton btn" :class="{greenbutton: this.color==='green', purpleButton: this.color==='purple'}" >
      <div :class="{bounceIn: playerFound}">
      <p class="title-in">
        {{cards / 3}}
      </p>
      </div>
    </a>
    <span class="tag game-tags" :class="{greenBackground: this.color==='green', greyBackground: this.color==='grey',purpleBackground: this.color==='purple'}">{{nickname}}</span>
    <button v-if=false class="button btn"
      @click="press" :class="{tagIsGreen: this.color==='green',
      tagIsPurple: this.color==='purple', greenPressed:presser ==='green',
      purplePressed:presser ==='purple'}">{{nickname}}</button>
  </div>
</template>

<script>

export default {
  name: 'score',
  components: {

  },
  props: ['cards', 'nickname', 'color', 'gameStatus', 'playerFound'],
  data () {
    return {
      presser: 'non'
    }
  },
  mounted () {

  },
  methods: {
    press () {
      this.presser = this.color
      this.$emit('pressEvent', this.color)
      setTimeout(() => {
        this.presser = 'non'
        this.$emit('pressEvent', 'non')
        this.$emit('resetCardsEvent')
      }, 4000)
    },
    popScore () {
      setTimeout(() => {
        this.$emit('collectEvent', false)
      }, 1000)
    }
  }
}

</script>
<style scoped>
.score{
  display: flex;
  flex-direction: column;
}

.greenBackground{
  background-color: #23D160;
}
.greyBackground{
  background-color: lightgray;
}
.purpleBackground{
  background-color: plum;
}
.greenBorder{
  border:1px solid #23D160;
}

.greenBorder:hover{
  background-color: #23D160;
}

.tagIsGreen{
  background: #23D160;
  width: 40%;
  margin: 0 auto;
  box-shadow:0 2.5px 0px 0px #15B358;
}
.purpleBorder{
  border:1px solid purple;
}

.purpleBorder:hover{
  background-color: plum;
}

.greenPressed {
  background-color: lightgreen;
  border: 1px solid #23D160;
  box-shadow: none;
}

.purplePressed{
  background-color: plum;
  border: 1px solid purple;
  box-shadow: none;
}

/********* 2 players staff*/
  .btn {
  border-radius: 50%;
  font-size: 1em;
  text-decoration: none;
  font-family: 'Jua';
}

.btn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 0px 0px 0px;
}

.purplebutton {
  background-color: #d173d1;
  box-shadow:0 5px 0px 0px purple;
}

.purplePressed {
  background-color: plum;
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 0px 0px 0px;
}

.greenPressed {
  background-color: #48E68B;
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 0px 0px 0px;
}

.purplebutton:hover {
  background-color: plum;
}

.greenbutton {
  background-color: #23D160;
  box-shadow: 0px 5px 0px 0px #15B358;
}

.greenbutton:hover {
  background-color: #48E68B;
}

.greenClicked{
  border: solid 3px #15B358;
}

.purpleClicked{
  border: solid 3px purple;
}

/* tablet & mobile */
@media only screen and (max-width: 767px) {
  .purpleButton{
    width: 20%;
    float: right;
  }
  .greenButton{
    width: 20%;
    float: left;
  }
}
/* desktop */
@media only screen and (min-width: 768px) {
  .purpleButton{
    display:flex;
    order: 3;
  }
}
@media only screen and (min-width: 560px) {
  .btn {
    width: 60px;
    height: 60px;
  }
}
@media only screen and (max-width: 559px) {
  .btn {
    width: 60px;
    height: 60px;
  }
}
</style>
