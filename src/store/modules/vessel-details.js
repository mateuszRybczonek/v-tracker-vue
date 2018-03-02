import * as types from '../mutation-types'
import { COMPONENT_NAMES } from '../../constants/vessel-details'

const { VESSEL_DASHBOARD } = COMPONENT_NAMES

const state = {
  sidebarVisible: true,
  selectedVesselDetailsComponent: VESSEL_DASHBOARD
}

const getters = {
  sidebarVisible: state => state.sidebarVisible,
  selectedVesselDetailsComponent: state => state.selectedVesselDetailsComponent
}

const actions = {
  toggleSidebar ({ getters, commit }) {
    commit(types.SIDEBAR_VISIBLE)
  },

  selectedVesselDetailsComponent ({ getters, commit }, componentName) {
    commit(types.SELECTED_VESSEL_DETAILS_COMPONENT, componentName)
  }
}

const mutations = {
  [types.SIDEBAR_VISIBLE] (state) {
    state.sidebarVisible = !state.sidebarVisible
  },

  [types.SELECTED_VESSEL_DETAILS_COMPONENT] (state, componentName) {
    state.selectedVesselDetailsComponent = componentName
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
