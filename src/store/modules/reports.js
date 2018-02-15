import * as types from '../mutation-types'
import globalAxios from 'axios'
import router from '../../router/index'

const state = {
  reports: null
}

const getters = {
  reports: state => state.reports
}

const actions = {
  async createNewReport ({ getters }, reportData) {
    if (!getters.idToken) {
      return
    }
    try {
      const { data } = await globalAxios.post(`/reports.json?auth=${getters.idToken}`, reportData)
      const vesselId = reportData.vessel
      const reportId = data.name

      try {
        await globalAxios.patch(`vessels/${vesselId}/reports.json?auth=${getters.idToken}`, { [reportId]: true })
      } catch (error) { throw error }
    } catch (error) { throw error }
  }

  // async editVessel ({ getters }, vesselData) {
  //   if (!getters.idToken) {
  //     return
  //   }
  //   try {
  //     await globalAxios.patch(`/vessels/${vesselData.id}.json?auth=${getters.idToken}`, vesselData)
  //     router.push('/dashboard/vessels')
  //   } catch (error) { console.log(error) }
  // },
  // async fetchVessels ({ getters, commit }) {
  //   try {
  //     const userId = this.state.auth.userId
  //     const { data } = await globalAxios.get(`/vessels.json?orderBy="owner"&equalTo="${userId}"`)
  //     const userVessels = []
  //     for (let key in data) {     // add id to the vessel
  //       const vessel = data[key]
  //       vessel.id = key
  //       userVessels.push(vessel)
  //     }
  //     commit(types.STORE_VESSEL, userVessels)
  //   } catch (error) { console.log(error) }
  // },
  // async deleteVessel ({ getters, commit }, vesselId) {
  //   try {
  //     await globalAxios.delete(`/vessels/${vesselId}.json?auth=${getters.idToken}`)
  //     try {
  //       await globalAxios.patch(`users/${getters.user.userId}/vessels.json?auth=${getters.idToken}`, { [vesselId]: null })
  //       commit(types.DELETE_VESSEL, vesselId)
  //     } catch (error) { console.log(error) }
  //   } catch (error) { console.log(error) }
  // }
}

const mutations = {
  [types.STORE_VESSEL] (state, vessels) {
    state.vessels = vessels
  },

  [types.DELETE_VESSEL] (state, vesselId) {
    const vessel = state.vessels.filter(vessel => vessel.id === vesselId)
    const vesselIndex = state.vessels.indexOf(vessel)
    state.vessels.splice(vesselIndex, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
