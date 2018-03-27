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
      state.clickLatLng = [latLngObject.lat, latLngObject.lng]
    }
  },
  actions: {
    setClickLatLng: ({ commit }, latLngObject) => {
      commit('clickLatLng', latLngObject)
      commit('contribution/eWkt', latLngObject, { root: true })
    }
  }
}
