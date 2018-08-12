<template>
  <div class="footerNextPage">
    <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
      <a class="pagination-previous"  @click="prevPageIndex">
        <span class="icon"><img src='@/assets/angle-left-solid.svg'></span>
      </a>
      <a class="pagination-next" v-show="goTo === 'in'" @click="nextPageIndex">
        <span class="icon"><img src='@/assets/angle-right-solid.svg'></span>
      </a>

      <ul class="pagination-list">
        <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
        <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
        <li><a class="pagination-link is-current" aria-label="Page 3" aria-current="page">3</a></li>
        <li><a class="pagination-link" aria-label="Goto page 47">4</a></li>
        <li><a class="pagination-link" aria-label="Goto page 86">5</a></li>
      </ul>
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
      contentIndex: 0,
      goTo: 'in'
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
    },
    letsPractice () {
      if (this.pageCount - 1 === this.contentIndex) {
        this.goTo = 'practice'
      }
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
  .pagination {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
    .pagination-list {
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: flex-start;
    order: 1;
  }
  .pagination-previous {
    order: 2;
  }
  .pagination-next {
    order: 3;
  }
  .pagination {
    justify-content: space-between;
  }
  .pagination.is-centered .pagination-previous {
    order: 1;
  }
  .pagination.is-centered .pagination-list {
    justify-content: center;
    order: 2;
  }
  .pagination.is-centered .pagination-next {
    order: 3;
  }
  .pagination.is-rounded .pagination-link {
    margin: 0;
    padding: 0;
  }
/*************************************
mobile & tablet
***************************************/
@media only screen and (max-width: 768px) {
  .pagination.is-rounded .pagination-link {
    margin: 0;
    padding: 0;
    font-size: 0.7em;
  }
}

/*************************************
desktop
***************************************/
@media only screen and (min-width: 769px) {

}
</style>
