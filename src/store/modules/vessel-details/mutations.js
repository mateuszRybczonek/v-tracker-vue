import * as types from '../../mutation-types'

export default {
  [types.SIDEBAR_VISIBLE] (state) {
    state.sidebarVisible = !state.sidebarVisible
  },

  [types.SELECTED_VESSEL_DETAILS_COMPONENT] (state, componentName) {
    state.selectedVesselDetailsComponent = componentName
  }
}
