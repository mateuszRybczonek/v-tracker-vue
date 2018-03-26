import * as types from '../../mutation-types'

export default {
  toggleSidebar ({ getters, commit }) {
    commit(types.SIDEBAR_VISIBLE)
  },

  selectedVesselDetailsComponent ({ getters, commit }, componentName) {
    commit(types.SELECTED_VESSEL_DETAILS_COMPONENT, componentName)
  }
}
