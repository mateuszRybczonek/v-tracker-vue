import { make } from 'vuex-pathify'
import actions from './actions'
import mutations from './mutations'

const state = {
  vessels: null
}

export default {
  state,
  getters: { ...make.getters(state) },
  actions: {
    ...make.actions(state),
    ...actions
  },
  mutations: {
    ...make.mutations(state),
    ...mutations
  }
}
