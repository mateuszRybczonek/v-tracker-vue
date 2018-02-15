import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import { sync } from 'vuex-router-sync'
import router from './router/index'
import store from './store/index'
import VueContentPlaceholders from 'vue-content-placeholders'

Vue.use(VueContentPlaceholders)
Vue.use(VueMomentJS, moment)
Vue.use(Vuelidate)
Vue.use(VueMaterial)
Vue.config.productionTip = false

axios.defaults.baseURL = 'https://v-tracker-vue.firebaseio.com/'

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
