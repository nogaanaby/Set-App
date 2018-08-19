<template>
<div class="pause container">
  <div class="is-narrow">
    <div class="buttons fadeInDown">
        <a class="button is-medium is-fullwidth">
          <p class="p-small vertical-gap-medium">Finish</p>
          <span class="icon is-small">
            <img class="icon" src='@/assets/times-solid.svg'>
          </span>
        </a>
        <a class="button is-medium is-fullwidth">
          <p class="p-small vertical-gap-medium">Start Over</p>
          <span class="icon is-small">
            <img class="icon" src='@/assets/sync-alt-solid.svg'>
          </span>
        </a>
        <a class="button is-medium is-fullwidth">
          <p class="p-small vertical-gap-medium">Go Back</p>
          <span class="icon is-small">
            <img class="icon" src='@/assets/angle-right-solid.svg'>
          </span>
        </a>
    </div>
  </div>
</div>
</template>

<script>
import store from '../js/store.js'
export default {
  name: 'pause',
  data () {
    return {
      onGame: store.onGame
    }
  },
  mounted () {

  },
  methods: {
  }
}
</script>

<style scoped>

/*************************************
desktop & tablet
***************************************/
@media only screen and (min-width: 401px) {

}
/*************************************
mobile
***************************************/
@media only screen and (max-width: 400px) {

}
</style>
