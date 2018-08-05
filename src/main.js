// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import SetInstractions from '@/components/Set_Instractions'
import instractionsTables from '@/components/instractionsTables'
import game from '@/components/game'
import start from '@/components/start'
import practice from '@/components/practice'
import footerNextPage from '@/components/footer'
import parent from '@/components/parent'
import child from '@/components/child'

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
    path: '/instractionsTables',
    name: 'instractionsTables',
    component: instractionsTables
  },
  {
    path: '/start',
    name: 'start',
    component: start
  },
  {
    path: '/practice',
    name: 'practice',
    component: practice
  },
  {
    path: '/footer',
    name: 'footerNextPage',
    component: footerNextPage
  },
  {
    path: '/parent',
    name: 'parent',
    component: parent
  },
  {
    path: '/child',
    name: 'child',
    component: child
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
