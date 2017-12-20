strict: true;
namespaced: true;

const state = {
  open: false

}
// getters
const getters = {
}
// actions
const actions = {
}

// mutations
const mutations = {
  toggle(state, shouldOpen) {
    if (typeof shouldOpen === 'boolean') {
      state.open = shouldOpen;
    } else {
      state.open = !state.open;
    }
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
