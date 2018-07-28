// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VAnimateCss from 'v-animate-css'
import Router from 'vue-router'
import SetInstractions from '@/components/Set_Instractions'
import instractionsTables from '@/components/instractionsTables'
import cardFront from '@/components/cardFront'
import design from '@/components/design'

Vue.config.productionTip = false

Vue.use(Router)
Vue.use(VAnimateCss)

const routes = [
  {
    path: '/SetInstractions',
    name: 'SetInstractions',
    component: SetInstractions
  },
  {
    path: '/CardFront',
    name: 'cardFront',
    component: cardFront
  },
  {
    path: '/design',
    name: 'design',
    component: design
  },
  {
    path: '/instractionsTables',
    name: 'instractionsTables',
    component: instractionsTables
  }
]

const router = new Router({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
