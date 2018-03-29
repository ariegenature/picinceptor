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
      if (latLngObject) {
        state.eWkt = `SRID=4326;POINT(${latLngObject.lng} ${latLngObject.lat})`
      } else {
        state.eWkt = ''
      }
    }
  },
  actions: {
    setContribution: ({ commit }, c) => {
      commit('contribution', c)
    }
  }
}
