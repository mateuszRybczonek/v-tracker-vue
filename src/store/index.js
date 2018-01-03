import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import vessels from './modules/vessels'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    vessels
  }
})
