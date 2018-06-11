import * as types from '../../mutation-types'

export default {
  [types.DELETE_VESSEL] (state, vesselId) {
    const vessel = state.vessels.find(vessel => vessel.id === vesselId)
    const vesselIndex = state.vessels.indexOf(vessel)
    state.vessels.splice(vesselIndex, 1)
  }
}
