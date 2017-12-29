strict: true;
namespaced: true;

const state = {
  index: 0
}
// getters
const getters = {
}
// actions
const actions = {
}

// mutations
const mutations = {
  set(state, index) {
    state.index = index;
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
