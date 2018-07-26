<template>
  <div class="main">
    <div class="card">
  <header class="card-header">
    <p class="card-header-title">
      This Is A Set
    </p>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
                if the first two cards are different in some attribute - the third must be also different from the first two in that attributes
                <br>if the first two cards are same in some attribute - the third must have also the same attribute
      <div class="mainCardTables">
  <div class="cardTables">
  <table class="table is-striped">
      <thead class="cardText">
          <th>atributes</th>
          <th>card 1</th>
          <th>card 2</th>
          <th>card 3</th>
      </thead>
      <tr class="cardText">
          <td style="font-weight: bold">shape</td>
          <td>Sub <img class="vicon" src='@/assets/vicon.png'> </td>
          <td>Sub <img class="vicon" src='@/assets/vicon.png'> </td>
          <td>Sub <img class="vicon" src='@/assets/vicon.png'> </td>
      </tr>
      <tr class="cardText">
          <td style="font-weight: bold">number</td>
          <td>1 shape <img class="xicon" src='@/assets/xicon.png'> </td>
          <td>2 shape <img class="xicon" src='@/assets/xicon.png'> </td>
          <td>3 shape <img class="xicon" src='@/assets/xicon.png'> </td>
      </tr>
      <tr class="cardText">
          <td style="font-weight: bold">color</td>
          <td>green <img class="vicon" src='@/assets/vicon.png'> </td>
          <td>green <img class="vicon" src='@/assets/vicon.png'> </td>
          <td>green <img class="vicon" src='@/assets/vicon.png'> </td>
      </tr>
      <tr class="cardText">
          <td style="font-weight: bold">fill</td>
          <td>stripes <img class="xicon" src='@/assets/xicon.png'> </td>
          <td>empty <img class="xicon" src='@/assets/xicon.png'> </td>
          <td>full <img class="xicon" src='@/assets/xicon.png'> </td>
      </tr>
      </table>
      <div class="exampleSet2">
        <div class="setCard" v-for="(card, i) in firstSet" :key="card.index">
        <canvas :ref="'shape'+i" width="150" height="66" v-show="false" ></canvas>
        <canvas :ref="'card'+i" width="150" height="198"></canvas>
        </div>
      </div>
  </div>
</div>
      <br>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item">Delete</a>
  </footer>
</div>
  </div>
</template>

<script>
import instractionsTables from '@/components/instractionsTables'

export default {
  name: 'design',
  components: {
    'setExampleTable': instractionsTables
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
