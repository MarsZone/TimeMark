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
  userInfo: null,  //用户信息
  name:'No one',   //用户名
  email:'',
  login: false,    //是否登录
  count: 1,
  task_id: '0',    //选择的Task
  task_label:'',   //名称
  template_id: '', //TemplateID
  template_label:'',
  token:'',
  extends_data:{},
  task:{},
  //host:'http://marszm.cn:3333'
  host: 'http://localhost:3333'
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
