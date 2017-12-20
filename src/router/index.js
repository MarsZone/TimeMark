import Vue from 'vue'
import VueRouter from 'vue-router'
import {routerMode} from '../config/env'
import home from '@/views/home'

// import count from '@/components/count'

Vue.use(VueRouter);
var path = '';
if(process.env.NODE_ENV === 'production')
{
  path = 'tm';
}

export default new VueRouter({
  mode: routerMode,
  base: __dirname,

  routes: [
      {
        path: '/'+path,
        component: home
      }
    ]
})
