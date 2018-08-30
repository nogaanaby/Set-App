<template>
  <div class="brandFooter">
    <footer class="footer">
      <div class="content">
        <a class="github" href="https://github.com/nogaanaby/Set-App" target="_blank">
        <span><img class="icon" src='@/assets/github.png'></span>
        </a>
        <p class="createBy">
          @created by the famous author N. Lichtenshtain Anaby
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
  padding: 10px;
}
.content{
  display: flex;
  justify-content: center;
}
.github{
  padding: 5px;
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
