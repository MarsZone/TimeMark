import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import net from './net'
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
  host: 'http://localhost:3333',
  net:this.net,
}

const nxxxet = {
  // Template
  NETREQ_createTemplate:  '/app/createTemplate',
  NETREQ_createTemplate:  '/app/createTemplate',
  NETREQ_templateList:    '/app/templateList',
  //Task
  NETREQ_createTask:'/app/createTask',
  NETREQ_removeTask:'/app/removeTask',
  NETREQ_taskList:  '/app/taskList',
  //Actions
  NETREQ_createAction:  '/app/createAction',
  NETREQ_updateAction:  '/app/updateAction',
  NETREQ_getActionList: '/app/getActionList',
  NETREQ_removeAction:  '/app/removeAction',
  //Etime
  NETREQ_getEtime:     '/app/getEtime',
  NETREQ_changeBonus:  '/app/changeBonus',
  //Calendar
  NETREQ_calendarMonth:'/app/calendarMonth',
  //Auth
  NETREQ_register:'/register',
  NETREQ_login:   '/login',
}


export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    navigator,
    splitter,
    tabbar,
    net,
  },
})
