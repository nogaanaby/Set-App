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
@import './assets/w3.css';
html{
  background-color: #ccc2d6;
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
*{
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
canvas{
  border: 1px solid gray;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 198px;
  justify-content: center;
  background-color: white;
  font: inherit;
  outline: inherit;
}
.vicon, .xicon{
    width: 20px;
    height: 20px;
}
ul{
  list-style-type: none;
}
.instractionText{
  width: 50%;
}
#arrowNext{
    float: right;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    margin:5px;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}
#arrowBack{
    float: left;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    margin:5px;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
}
#arrowImg:hover{
    width:85px;
    height:65px;
}
</style>
