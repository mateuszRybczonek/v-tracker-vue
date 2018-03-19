import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { COMPONENT_NAMES } from '../../../constants/vessel-details'

const { VESSEL_DASHBOARD } = COMPONENT_NAMES

const state = {
  sidebarVisible: true,
  selectedVesselDetailsComponent: VESSEL_DASHBOARD
}

export default {
  state,
  getters,
  actions,
  mutations
}
