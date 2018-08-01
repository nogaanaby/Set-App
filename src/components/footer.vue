<template>
  <div class="footerNextPage">
        <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
          <a class="pagination-previous" @click="prev(), prevPageIndex()"><img id="arrowImg" src='@/assets/angle-left-solid.svg' width="25px" height="25px"></a>
          <a class="pagination-next" @click="next(), nextPageIndex()"><img id="arrowImg" src='@/assets/angle-right-solid.svg' width="25px" height="25px"></a>
          <ul class="pagination-list">
            <li><a class="pagination-link" aria-label="Page 46" aria-current="page">{{contentIndex + 1}}</a></li>
          </ul>
        </nav>
    </div>
</template>

<script>

import utils from '../js/utils.js'
import { CardView } from '../js/CardViews.js'
import gameMenu from '@/components/nav.vue'
import vxIcon from '@/components/vx-icon'

export default {
  name: 'footerNextPage',
  components: {
    gameMenu,
    vxIcon
  },
  props: ['next', 'prev', 'pageCount'],
  data () {
    return {
      contentIndex: 0
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    nextPageIndex: function () {
      this.contentIndex = Math.min(this.contentIndex + 1, this.pageCount - 1)
    },
    prevPageIndex: function () {
      this.contentIndex = Math.max(this.contentIndex - 1, 0)
    }
  }
}
</script>

<style scoped>
    .pagination{
      width: 100%;
      margin:auto;
    }
    a{
      border: none;
    }
    a:active:before{
      border: none;
    }
</style>
