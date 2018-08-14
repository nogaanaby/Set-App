<template>
  <div class="footerNextPage">
    <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
      <a class="pagination-previous"  @click="prevPageIndex">
        <span class="icon"><img src='@/assets/angle-left-solid.svg'></span>
      </a>
      <a class="pagination-next" @click="nextPageIndex" v-show = "currentIndex + 1 !== pageCount">
        <span class="icon"><img src='@/assets/angle-right-solid.svg'></span>
      </a>
      <a class="pagination-next" v-show = "bottunGoOut && currentIndex + 1 === pageCount && callFrom === 'practice'">
        <button class="button is-success letsPlay bounceIn">
          <router-link to="/game">Let's Play!</router-link>
        </button>
      </a>
      <a class="pagination-next" v-show = "currentIndex + 1 === pageCount && callFrom === 'instractions'">
        <button class="button is-success letsPlay bounceIn">
          <router-link to="/practice">Let's Practice!</router-link>
        </button>
      </a>
      <ul class="pagination-list">
        <li><a class="pagination-link"
          :class= "{isCurrent: currentIndex === 0, bounceIn: currentIndex === 0}"
          aria-label="Goto page 1" @click="goToPage(0)">1</a></li>
        <li><a class="pagination-link"
          :class= "{isCurrent: currentIndex === 1, bounceIn: currentIndex === 1}"
          aria-label="Goto page 2" @click="goToPage(1)">2</a></li>
        <li><a class="pagination-link"
          :class= "{isCurrent: currentIndex === 2, bounceIn: currentIndex === 2}"
          aria-label="Page 3" @click="goToPage(2)">3</a></li>
        <li><a class="pagination-link"
        :class= "{isCurrent: currentIndex === 3, bounceIn: currentIndex === 3}"
        aria-label="Goto page 4" @click="goToPage(3)">4</a></li>
        <li><a class="pagination-link"
          :class= "{isCurrent: currentIndex === 4, bounceIn: currentIndex === 4}"
          aria-label="Goto page 5" @click="goToPage(4)">5</a></li>
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
  props: ['pageCount', 'currentIndex', 'bottunGoOut', 'callFrom'],
  data () {
    return {

    }
  },
  methods: {
    nextPageIndex: function () {
      this.currentIndex = Math.min(this.currentIndex + 1, this.pageCount - 1)
      this.$emit('indexUpdateEvent', this.currentIndex, 'next')
    },
    prevPageIndex: function () {
      this.currentIndex = Math.max(this.currentIndex - 1, 0)
      this.$emit('indexUpdateEvent', this.currentIndex, 'back')
    },
    goToPage (pageNum) {
      this.currentIndex = pageNum
      this.$emit('indexUpdateEvent', this.currentIndex, 'back')
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
