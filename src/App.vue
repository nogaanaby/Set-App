<template>
  <div id="app">
    <router-link :to="{ name: 'SetInstractions' }">Set Instractions</router-link>
    <router-link to="/CardFront">Card Front</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import SetInstractions from '@/components/Set_Instractions'
import CardFront from '@/components/CardFront.vue'

export default {
  name: 'app',
  components: {
    SetInstractions,
    CardFront
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
