<template>
  <div class="score">
    <a class="button is-outlined roundedButton" :class="{isGreen: this.color==='green', isPurple: this.color==='purple'}" >
      <h1 class="title-in">
        {{cards / 3}}
      </h1>
    </a>
    <span v-if="gameStatus==='single'" class="tag" :class="{green: this.color==='green', grey: this.color==='grey'}">{{nickname}}</span>
    <button v-if="gameStatus==='copple'" class="button btn"
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
  props: ['cards', 'nickname', 'color', 'gameStatus'],
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
    }
  }
}

</script>
<style scoped>
.score{
  margin: 0;
  display: flex;
  flex-direction: column;
}

.tag{
  width: 40%;
  margin: 0 auto;
}
.green{
  background-color: #23D160;
}
.grey{
  background-color: lightgray;
}
.isGreen{
  border:1px solid #23D160;
}

.isGreen:hover{
  background-color: #23D160;
}

.tagIsGreen{
  background: #23D160;
  width: 40%;
  margin: 0 auto;
  box-shadow:0 2.5px 0px 0px #15B358;
}
.isPurple{
  border:1px solid purple;
}

.isPurple:hover{
  background-color: plum;
}

.tagIsPurple{
  background: #d173d1;
  width: 40%;
  margin: 0 auto;
  box-shadow:0 2.5px 0px 0px purple;
}
.btn{
  border: none;
  vertical-align: middle;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  color: #4a4a4a;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-size: 0.75rem;
  height: 2em;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 1.5;
  padding-left: 0.75em;
  padding-right: 0.75em;
  white-space: nowrap;
  font-family: 'Jua';
}

.btn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 0px 0px 0px;
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

</style>
