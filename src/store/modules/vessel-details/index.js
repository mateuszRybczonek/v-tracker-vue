import { make } from 'vuex-pathify'
import { COMPONENT_NAMES } from '@/constants/vessel-details'

const { VESSEL_DASHBOARD } = COMPONENT_NAMES

const state = {
  sidebarVisible: true,
  selectedVesselDetailsComponent: VESSEL_DASHBOARD,
  dashboardGoogleMap: {},
  vessel: {},
  vesselCapacities: []
}

export default {
  state,
  getters: { ...make.getters(state) },
  actions: { ...make.actions(state) },
  mutations: { ...make.mutations(state) }
}
