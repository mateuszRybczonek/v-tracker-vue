import * as types from '../../mutation-types'
import globalAxios from 'axios'

export default {
  async createNewVessel ({ getters }, vesselData) {
    if (!getters.idToken) return

    try {
      const { data } = await globalAxios.post(`/vessels.json?auth=${getters.idToken}`, vesselData)
      const vesselId = data.name
      try {
        await globalAxios.patch(`users/${getters.userId}/vessels.json?auth=${getters.idToken}`, { [vesselId]: true })
      } catch (error) { throw(error) }
    } catch (error) { throw(error) }
  },

  async editVessel ({ getters }, vesselData) {
    if (!getters.idToken) {
      return
    }

    try {
      await globalAxios.patch(`/vessels/${vesselData.id}.json?auth=${getters.idToken}`, vesselData)
    } catch (error) { throw(error) }
  },

  async fetchVessels ({ commit }, userId) {
    try {
      const { data } = await globalAxios.get(`/vessels.json?orderBy="owner"&equalTo="${userId}"`)
      const userVessels = []

      Object.keys(data).forEach(key => {
        const vessel = data[key]
        vessel.id = key
        userVessels.push(vessel)
      })

      commit(types.SET_VESSELS, userVessels)
    } catch (error) { throw(error) }
  },

  async deleteVessel ({ getters, commit }, vesselId) {
    try {
      await globalAxios.delete(`/vessels/${vesselId}.json?auth=${getters.idToken}`)
      try {
        await globalAxios.patch(`users/${getters.userId}/vessels.json?auth=${getters.idToken}`, { [vesselId]: null })
        commit(types.DELETE_VESSEL, vesselId)
      } catch (error) { throw(error) }
    } catch (error) { throw(error) }
  }
}
