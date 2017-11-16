import Vue from 'vue'
import VueRouter from 'vue-router'
import {routerMode} from '../config/env'
import HelloWorld from '@/views/HelloWorld'
import Home from '@/views/Home'

Vue.use(VueRouter)

export default new VueRouter({
  mode: routerMode,
  base: __dirname,
  routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/helloWorld',
        component: HelloWorld
      }
    ]
})
