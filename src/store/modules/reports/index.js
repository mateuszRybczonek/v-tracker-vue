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
  getters,
  actions,
  mutations
}
