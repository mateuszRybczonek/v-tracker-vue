import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import router from './router/index'
import store from './store'

Vue.use(Vuelidate)
Vue.use(VueMaterial)
Vue.config.productionTip = false

axios.defaults.baseURL = 'https://vue-http-rybczonek.firebaseio.com/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
