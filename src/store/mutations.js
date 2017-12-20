import {
  RECORD_USERINFO,
  GET_USERINFO,
  RETSET_NAME
} from './mutation-types';


export default {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore('user_id', info.user_id);
  },
  //获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    };
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info};
    } else {
      state.userInfo = null;
    }
  },
  //修改用户名
  [RETSET_NAME](state,username) {
    state.userInfo = Object.assign({}, state.userInfo,{username})
  },
}
