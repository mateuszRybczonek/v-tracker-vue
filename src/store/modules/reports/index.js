import { make } from 'vuex-pathify'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  reports: [],
  fetchingReports: false,
  selectedReport: null
}

export default {
  state,
  getters: {
    ...make.getters(state),
    ...getters
  },
  mutations: {
    ...make.mutations(['reports', 'fetchingReports']),
    ...mutations
  },
  actions: {
    ...make.actions(state),
    ...actions
  }
}
