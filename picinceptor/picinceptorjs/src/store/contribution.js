export default {
  namespaced: true,
  state () {
    return {
      contribution: null
    }
  },
  getters: {
    contribution: (state) => state.contribution
  },
  mutations: {
    contribution: (state, c) => {
      state.contribution = c
    }
  },
  actions: {
    setContribution: ({ commit }, c) => {
      commit('contribution', c)
    }
  }
}
