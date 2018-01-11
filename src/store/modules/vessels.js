import * as types from '../mutation-types'
import globalAxios from 'axios'
import router from '../../router/index'

const state = {
  vessels: null
}

const getters = {
  vessels (state) {
    return state.vessels
  }
}

const actions = {
  createNewVessel ({ getters }, vesselData) {
    if (!getters.idToken) {
      return
    }
    globalAxios.post(`/vessels.json?auth=${getters.idToken}`, vesselData)
      .then(res => {
        const vesselId = res.data.name
        globalAxios.patch(`users/${getters.user.userId}/vessels.json?auth=${getters.idToken}`, { [vesselId]: true })
          .then(() => {
            router.push('/dashboard/vessels')
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  },

  editVessel ({ getters }, vesselData) {
    if (!getters.idToken) {
      return
    }
    globalAxios.patch(`/vessels/${vesselData.id}.json?auth=${getters.idToken}`, vesselData)
      .then(() => router.push('/dashboard/vessels'))
      .catch(error => console.log(error))
  },

  fetchVessels ({ getters, commit }) {
    const userId = this.state.auth.userId
    globalAxios.get(`/vessels.json?orderBy="owner"&equalTo="${userId}"`)
      .then(res => {
        const userVessels = res.data
        console.log(userVessels)
        commit(types.STORE_VESSEL, userVessels)
      })
      .catch(error => console.log(error))
  },

  deleteVessel ({ getters, commit }, vesselId) {
    globalAxios.delete(`/vessels/${vesselId}.json?auth=${getters.idToken}`)
      .then(() => {
        globalAxios.patch(`users/${getters.user.userId}/vessels.json?auth=${getters.idToken}`, { [vesselId]: null })
          .then(res => commit(types.DELETE_VESSEL, vesselId))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }
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
