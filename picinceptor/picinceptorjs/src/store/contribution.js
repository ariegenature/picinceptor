export default {
  namespaced: true,
  state () {
    return {
      contribution: null,
      eWkt: ''
    }
  },
  getters: {
    contribution: (state) => state.contribution,
    eWkt: (state) => state.eWkt
  },
  mutations: {
    contribution: (state, c) => {
      state.contribution = c
    },
    eWkt: (state, latLngObject) => {
      state.eWkt = `SRID=4326;POINT(${latLngObject.lng} ${latLngObject.lat})`
    }
  },
  actions: {
    setContribution: ({ commit }, c) => {
      commit('contribution', c)
    }
  }
}
