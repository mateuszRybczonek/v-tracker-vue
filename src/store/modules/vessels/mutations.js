import * as types from '../../mutation-types'

export default {
  [types.STORE_VESSEL] (state, vessels) {
    state.vessels = vessels
  },

  [types.DELETE_VESSEL] (state, vesselId) {
    const vessel = state.vessels.find(vessel => vessel.id === vesselId)
    const vesselIndex = state.vessels.indexOf(vessel)
    state.vessels.splice(vesselIndex, 1)
  }
}
