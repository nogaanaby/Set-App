<template>
  <div>
    <h3>this is a child</h3>
    <a class="button" @click = "chageMood"> hi I am a cute child</a>
    <a class="button" @click = "AskForCandy"> hi I am a cute child</a>
  </div>
</template>

<script>
export default {
  name: 'child',
  data () {
    return {
      has_a_candy: false
    }
  },
  methods: {
    chageMood () {
      this.$emit('changeHisMood', 'happy')
    },
    AskForCandy () {
      this.has_a_candy = true
    }
  }
}
</script>
