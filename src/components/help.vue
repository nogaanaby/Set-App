<template>
  <div class="help">
    <a class="button roundedButton" :class='{isYellow: hintState < 3}' @click = "hint">
      <img src='@/assets/tellMe.png'>
    </a>
    <span class="tag is-warning">Hint</span>
  </div>
</template>

<script>
import backGame from '../js/backGame.js'
export default {
  name: 'help',
  components: {

  },
  props: ['cardsViewsArray', 'hintState'],
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {
    signTheCard (setCard) {
      this.cardsViewsArray.forEach((card, i) => {
        if (setCard === card) {
          this.cardsViewsArray[i].state = 'toldMe'
        }
      })
    },
    hint () {
      const setArray = backGame.findSet(this.cardsViewsArray, 0, 1, 2)
      if (this.hintState === 1) {
        this.signTheCard(setArray[0])
      } else if (this.hintState === 2) {
        this.signTheCard(setArray[1])
      }
      console.log('hint state: ' + this.hintState)
      this.$emit('findSetEvent', this.cardsViewsArray)
    },
    findSetButton () {
      const setArray = backGame.findSet(this.cardsViewsArray, 0, 1, 2)
      this.cardsViewsArray.forEach((card, i) => {
        if (setArray[0] === card || setArray[1] === card || setArray[2] === card) {
          this.cardsViewsArray[i].state = 'toldMe'
        }
      })
    }
  }
}

</script>
<style scoped>
.help{
  margin: 0;
  display: flex;
  flex-direction: column;
}

.isYellow{
  border:1px solid #FFDD58;  
}

.isYellow:hover{
  background-color: #FFDD58;
}
.tag{
  width: 40%;
  margin: 0 auto;
}
</style>
