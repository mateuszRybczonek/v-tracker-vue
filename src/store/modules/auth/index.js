import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  idToken: null,
  userId: null,
  user: null,
  authError: null
}

export default {
  state,
  getters,
  actions,
  mutations
}
