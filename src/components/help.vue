<template>
  <div class="help fitures">
    <a class="button roundedButton" :class='{isYellow: hintState < 3}' @click = "hint">
      <img src='@/assets/tellMe.png'>
    </a>
    <span class="tag is-warning game-tags">Hint</span>
  </div>
</template>

<script>
import backGame from '../js/backGame.js'
import store from '../js/store.js'
import { EventBus } from '../js/event-bus.js'
export default {
  name: 'help',
  components: {

  },
  // props: ['hintState'],
  data () {
    return {
      setCard: '',
      cardsViewsArray: [],
      hintState: 1
    }
  },
  mounted () {
    setTimeout(() => {
      this.cardsViewsArray = store.cardV
    }, 500)
  },
  methods: {
    hint () {
      const setArray = backGame.findSet(this.cardsViewsArray, 0, 1, 2)
      if (this.hintState === 1) {
        EventBus.$emit('findSetEvent', setArray[0])
        this.hintState++
      } else if (this.hintState === 2) {
        EventBus.$emit('findSetEvent', setArray[1])
        this.hintState = 1
      }
    }
  }
}

</script>
<style scoped>
.help{
  display: flex;
  flex-direction: column;
}

.isYellow{
  border:1px solid #FFDD58;
}

.isYellow:hover{
  background-color: #FFDD58;
}
</style>
