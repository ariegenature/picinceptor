import Vue from 'vue'
import Vuex from 'vuex'
import contribution from './contribution'
import map from './map'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    contribution,
    map
  }
})
