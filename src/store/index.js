import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import navigator from './modules/navigator'
import splitter from './modules/splitter'
import tabbar from './modules/tabbar'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'


const state = {
  userInfo: null, //用户信息
  login: true,    //是否登录
  count: 1
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    navigator,
    splitter,
    tabbar,
  },
})
