<template>
  <div class="footerNextPage">
        <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
          <a class="pagination-previous" @click="prevPageIndex"><img id="arrowImg" src='@/assets/angle-left-solid.svg' width="25px" height="25px"></a>
          <ul class="pagination-list">
            <li><a class="pagination-link" aria-label="Page 46" aria-current="page">{{contentIndex + 1}}</a></li>
          </ul>
          <a class="pagination-next" @click="nextPageIndex"><img id="arrowImg next" src='@/assets/angle-right-solid.svg' width="25px" height="25px"></a>
        </nav>
    </div>
</template>

<script>

import gameMenu from '@/components/nav.vue'
import vxIcon from '@/components/vx-icon'

export default {
  name: 'footerNextPage',
  components: {
    gameMenu,
    vxIcon
  },
  props: ['pageCount'],
  data () {
    return {
      contentIndex: 0
    }
  },
  methods: {
    nextPageIndex: function () {
      this.contentIndex = Math.min(this.contentIndex + 1, this.pageCount - 1)
      this.$emit('indexUpdateEvent', this.contentIndex, 'next')
    },
    prevPageIndex: function () {
      this.contentIndex = Math.max(this.contentIndex - 1, 0)
      this.$emit('indexUpdateEvent', this.contentIndex, 'back')
    }
  }
}
</script>

<style scoped>

/*************************************
all devices
***************************************/
    a{
      border: none;
    }
    a:active:before{
      border: none;
    }

/*************************************
mobile
***************************************/
@media only screen and (max-width: 768px) {
  nav{
    display: flex;
    flex-direction: row;
  }
  .pagination-previous{
    float: left;
    display: flex;
    justify-content: left;
  }
  .pagination-next{
    float: left;
    display: flex;
    justify-content: left;
  }
}

/*************************************
desktop
***************************************/
@media only screen and (min-width: 769px) {
    .pagination{
      width: 100%;
      margin:auto;
    }
}
</style>
