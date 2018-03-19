import * as types from '../../mutation-types'
import globalAxios from 'axios'
import router from '../../../router/index'

export default {
  async createNewVessel ({ getters }, vesselData) {
    if (!getters.idToken) {
      return
    }
    try {
      const { data } = await globalAxios.post(`/vessels.json?auth=${getters.idToken}`, vesselData)
      const vesselId = data.name
      try {
        await globalAxios.patch(`users/${getters.user.userId}/vessels.json?auth=${getters.idToken}`, { [vesselId]: true })
        router.push('/dashboard/vessels')
      } catch (error) { console.log(error) }
    } catch (error) { console.log(error) }
  },

  async editVessel ({ getters }, vesselData) {
    if (!getters.idToken) {
      return
    }
    try {
      await globalAxios.patch(`/vessels/${vesselData.id}.json?auth=${getters.idToken}`, vesselData)
      router.push('/dashboard/vessels')
    } catch (error) { console.log(error) }
  },

  async fetchVessels ({ getters, commit }) {
    try {
      const userId = this.state.auth.userId
      const { data } = await globalAxios.get(`/vessels.json?orderBy="owner"&equalTo="${userId}"`)
      const userVessels = []
      for (let key in data) {     // add id to the vessel
        const vessel = data[key]
        vessel.id = key
        userVessels.push(vessel)
      }
      commit(types.STORE_VESSEL, userVessels)
    } catch (error) { console.log(error) }
  },

  async deleteVessel ({ getters, commit }, vesselId) {
    try {
      await globalAxios.delete(`/vessels/${vesselId}.json?auth=${getters.idToken}`)
      try {
        await globalAxios.patch(`users/${getters.user.userId}/vessels.json?auth=${getters.idToken}`, { [vesselId]: null })
        commit(types.DELETE_VESSEL, vesselId)
      } catch (error) { console.log(error) }
    } catch (error) { console.log(error) }
  }
}
