// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import SetInstractions from '@/components/Set_Instractions'
import cardFront from '@/components/cardFront'

Vue.config.productionTip = false

Vue.use(Router)

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
