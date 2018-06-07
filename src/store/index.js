import Vue from 'vue'
import Vuex from 'vuex'
import pathify from './pathify'
import auth from './modules/auth/index'
import vessels from './modules/vessels/index'
import reports from './modules/reports/index'
import vesselDetails from './modules/vessel-details/index'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [ pathify.plugin ],
  modules: {
    auth,
    vessels,
    reports,
    vesselDetails
  }
})
