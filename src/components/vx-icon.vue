<template>
<div class="icons">
      <img v-show= '!setIcon' class="xicon icon" src='@/assets/xicon.png'>
      <img v-show= 'setIcon' class="vicon icon" src='@/assets/vicon.png'>
</div>
</template>

<script>
export default {
  name: 'vxIcon',
  components: {
  },
  props: ['setIcon'],
  data () {
    return {}
  },
  mounted () {
    console.log(this.setIcon)
  }
}
</script>

<style scoped>
    .icon{
      width: 28px;
      height: 18px;
    }
</style>
