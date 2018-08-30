<template>
  <div class="clock fitures">
    <a class="button is-orange is-outlined roundedButton clock" >
      <p id="time">{{formatTime(timeLeft)}}</p>
    </a>
    <span class="tag game-tags">Time</span>
  </div>
</template>

<script>

export default {
  name: 'clock',
  components: {

  },
  props: ['timeToPlay'],
  data () {
    return {
      startTime: 0,
      timeLeft: this.timeToPlay,
      runTimer: ''
    }
  },
  mounted () {
    this.startTime = Date.now()
    this.runTimer = setInterval(this.countDown, 100)
  },
  methods: {
    countDown () {
      const timeFromLoad = Date.now() - this.startTime
      this.timeLeft = this.timeToPlay - timeFromLoad
      if (this.timeToPlay - timeFromLoad <= 0) {
        clearInterval(this.runTimer)
        this.$emit('timeOver')
      } else {
        return this.timeLeft
      }
    },
    formatTime (ms) {
      let seconds = '' + Math.floor((ms / 1000) % 60)
      let minutes = '' + Math.floor((ms / 1000 / 60) % 60)
      if (seconds < 10) {
        seconds = 0 + seconds
      }
      return 0 + minutes + ' : ' + seconds
    },
    restartTimer () {
      this.startTime = Date.now()
      this.timeLeft = this.timeToPlay
      this.runTimer = setInterval(this.countDown, 100)
    }
  }
}

</script>
<style scoped>
.clock{
  display: flex;
  flex-direction: column;
}
.tag{
  background: #FF6601;
}
#time{
  font-size: 1em;
  font-family: 'jua';
}
</style>
