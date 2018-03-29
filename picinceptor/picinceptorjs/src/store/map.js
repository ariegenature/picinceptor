export default {
  namespaced: true,
  state () {
    return {
      clickLatLng: null
    }
  },
  getters: {
    clickLatLng: (state) => state.clickLatLng
  },
  mutations: {
    clickLatLng: (state, latLngObject) => {
      if (latLngObject) {
        state.clickLatLng = [latLngObject.lat, latLngObject.lng]
      } else {
        state.clickLatLng = null
      }
    }
  },
  actions: {
    setClickLatLng: ({ commit }, latLngObject) => {
      commit('clickLatLng', latLngObject)
      commit('contribution/eWkt', latLngObject, { root: true })
    }
    clearClickLatLng: ({ commit }) => {
      commit('clickLatLng', null)
      commit('contribution/eWkt', null, { root: true })
    }
  }
}
