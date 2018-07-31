// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import SetInstractions from '@/components/Set_Instractions'
import instractionsTables from '@/components/instractionsTables'
import game from '@/components/game'
import design from '@/components/design'
import start from '@/components/start'

Vue.config.productionTip = false

Vue.use(Router)

const routes = [
  {
    path: '/SetInstractions',
    name: 'SetInstractions',
    component: SetInstractions
  },
  {
    path: '/game',
    name: 'game',
    component: game
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
  },
  {
    path: '/start',
    name: 'start',
    component: start
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
