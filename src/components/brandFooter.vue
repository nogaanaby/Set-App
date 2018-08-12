<template>
  <div class="brandFooter">
    <footer class="footer">
      <div class="content">
        <p class="createBy">
          @created by the famouse author N. Lichtenshtain Anaby
        </p>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'brandFooter',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>

/*************************************
all devices
***************************************/
.footer{
  height: 8%;
}

.createBy{
  font-size: 0.7em;
  margin: auto;
}

/*************************************
mobile & tablet
***************************************/
@media only screen and (max-width: 768px) {

}

/*************************************
desktop
***************************************/
@media only screen and (min-width: 769px) {

}
</style>
