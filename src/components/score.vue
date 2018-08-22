<template>
  <div class="score">
    <a class="button is-outlined roundedButton" :class="{isGreen: this.color==='green', isPurple: this.color==='purple'}" >
      <h1 class="title-in">
        {{cards / 3}}
      </h1>
    </a>
    <span v-if="gameStatus==='single'" class="tag is-success">{{nickname}}</span>
    <button v-if="gameStatus==='copple'" class="button btn" @click="press" :class="{tagIsGreen: this.color==='green', tagIsPurple: this.color==='purple'}">{{nickname}}</button>
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
      this.$emit('pressEvent', this.color)
      setTimeout(() => {
        this.$emit('pressEvent', 'non')
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
  height: 20%;
}

.btn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 0px 0px 0px;
}
.btn:focus{
  border: none;
}

</style>
