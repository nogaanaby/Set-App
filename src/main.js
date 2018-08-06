// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import axios from 'axios'
import instractionsTables from '@/components/instractionsTables'
import game from '@/components/game'
import start from '@/components/start'
import practice from '@/components/practice'
import footerNextPage from '@/components/footer'
import nissim from '@/components/nissim'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

const socketURL = 'http://localhost:8050/'
export const SocketInstance = socketio(socketURL)
Vue.use(VueSocketIO, SocketInstance)
Vue.use(Router)

Vue.prototype.$baseURL = location.origin.replace(':8080', ':8050') // for dev only
Vue.prototype.$axios = axios.create({
  withCredentials: true,
  baseURL: Vue.prototype.$baseURL + '/api'
})

const routes = [
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
    path: '/nissim',
    name: 'nissim',
    component: nissim
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
