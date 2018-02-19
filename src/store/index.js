import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import vessels from './modules/vessels'
import reports from './modules/reports'
import vesselDetails from './modules/vessel-details'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    vessels,
    reports,
    vesselDetails
  }
})
