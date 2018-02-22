// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import Buefy from 'buefy'
import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet'
import router from './router'
import 'buefy/lib/buefy.css'

Vue.config.productionTip = false

Vue.use(Buefy)

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
