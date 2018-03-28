// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import Buefy from 'buefy'
import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet'
import VueApi from './plugins/api'
import VueFormWizard from 'vue-form-wizard'
import router from './router'
import store from './store'
import 'buefy/lib/buefy.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueApi, {
  baseUrl: 'http://localhost:5000/api/'
})
Vue.use(VueFormWizard)

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
