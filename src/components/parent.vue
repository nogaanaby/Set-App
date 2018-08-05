<template>
  <div>
    <h1> {{parentFace}} </h1>
    <child @changeHisMood = "changeParentFace" @askForCandy = 'buyHimACandy' ></child>
    <p>the child has a candy?  {{buy_him_a_candy}}</p>
  </div>
</template>

<script>
import child from '@/components/child.vue'
export default {
  name: 'parent',
  components: {
    child
  },
  data () {
    return {
      parentFace: 'this is a perent',
      buy_him_a_candy: false
    }
  },
  methods: {
    changeParentFace (mood) {
      this.parentFace = mood
    },
    buyHimACandy (candy) {
      this.buy_him_a_candy = candy
    }
  }
}
</script>
