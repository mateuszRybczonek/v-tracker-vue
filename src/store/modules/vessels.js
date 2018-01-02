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
        globalAxios.patch(`users/${getters.user.id}/vessels.json?auth=${getters.idToken}`, { [vesselId]: true })
          .then(() => {
            router.push('/dashboard/vessels')
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  },

  fetchVessels ({ getters, commit }) {
    const userId = getters.user.id
    globalAxios.get(`/vessels.json?auth=${getters.idToken}`)
      .then(res => {
        const data = res.data
        const vessels = []
        for (let key in data) {
          const vessel = data[key]
          vessel.id = key
          vessels.push(vessel)
        }
        const userVessels = vessels.filter(vessel => {
          return vessel.owners[userId] === true
        })
        commit(types.STORE_VESSEL, userVessels)
      })
      .catch(error => console.log(error))
  },

  deleteVessel ({ getters, commit }, vesselId) {
    globalAxios.delete(`/vessels/${vesselId}.json?auth=${getters.idToken}`)
      .then(() => {
        globalAxios.patch(`users/${getters.userId}/vessels.json?auth=${getters.idToken}`, { [vesselId]: null })
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
