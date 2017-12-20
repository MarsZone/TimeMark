
const state = {
  stack: [],
  options: {}
}
// getters
const getters = {
}
// actions
const actions = {
}

// mutations
const mutations = {
  push(state, page) {
    state.stack.push(page);
  },
  pop(state) {
    if (state.stack.length > 1) {
      state.stack.pop();
    }
  },
  replace(state, page) {
    state.stack.pop();
    state.stack.push(page);
  },
  reset(state, page) {
    state.stack = [page || state.stack[0]];
  },
  options(state, newOptions = {}) {
    state.options = newOptions;
  }
}

export default {
  strict: true,
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
