import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'
import router from './router/index'

Vue.use(Vuex)

const API_KEY = 'AIzaSyAFJIoUJ2ZzcnfA0O-ODvWRHsOvCMjg6ow'

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    authError: null,
    vessels: null
  },
  mutations: {
    authUser (state, userData) {      // storing the token in the vuex store
      state.idToken = userData.token
      state.userId = userData.userId
    },

    storeUser (state, user) {
      state.user = user
    },

    clearAuthData (state) {
      state.idToken = null
      state.userId = null
      state.user = null
    },

    clearAuthError (state) {
      state.authError = false
    },

    authError (state, error) {
      state.authError = error
    },

    storeVessels (state, vessels) {
      state.vessels = vessels
    },

    deleteVessel (state, vesselId) {
      const vessel = state.vessels.filter(vessel => vessel.id === vesselId)
      const vesselIndex = state.vessels.indexOf(vessel)
      state.vessels.splice(vesselIndex, 1)
    }
  },
  actions: {
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },

    login ({ commit, dispatch }, authData) { // login action dispatched in the component
      axios.post(`/verifyPassword?key=${API_KEY}`,
        { email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })

          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)  // store token in local storage for auto login
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          localStorage.setItem('userEmail', authData.email)

          dispatch('setLogoutTimer', res.data.expiresIn)
          router.push('/dashboard')
        })
        .catch(error => {
          commit('authError', true)
          console.log(error)
        })
    },

    tryAutoLogin ({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }

      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()

      if (now >= expirationDate) {
        return
      }

      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token,
        userId
      })
      router.push('/dashboard')
    },

    logout ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin') // redirect after logout
    },

    signup ({ commit, dispatch }, authData) { // signup action dispatched in the component
      axios.post(`/signupNewUser?key=${API_KEY}`, // store user in auth database
        { email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })

          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)  // store token in local storage for auto login
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          localStorage.setItem('userEmail', authData.email)

          dispatch('storeUser', authData) // save user to firebase users
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.push('/dashboard')
        })
        .catch(error => console.log(error))
    },

    storeUser ({ commit, state }, userData) { // save user to firebase users
      if (!state.idToken) {
        return
      }
      globalAxios.post(`/users.json?auth=${state.idToken}`, userData) //  path from main.js axios defaults
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },

    clearAuthError ({ commit }) {
      commit('clearAuthError')
    },

    fetchUser ({ commit, state }) {
      globalAxios.get(`/users.json?auth=${state.idToken}`)
        .then(res => {
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          const presentUser = users.filter(user => {
            return user.email === localStorage.getItem('userEmail')
          })
          commit('storeUser', presentUser[0])
        })
        .catch(error => console.log(error))
    },

    createNewVessel ({ commit, state }, vesselData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post(`/vessels.json?auth=${state.idToken}`, vesselData)
        .then(res => {
          const vesselId = res.data.name
          globalAxios.patch(`users/${state.user.id}/vessels.json?auth=${state.idToken}`, { [vesselId]: true })
            .then(res => console.log(res))
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    },

    fetchVessels ({ commit, state }) {
      const userId = state.user.id
      globalAxios.get(`/vessels.json?auth=${state.idToken}`)
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
          commit('storeVessels', userVessels)
        })
        .catch(error => console.log(error))
    },

    deleteVessel ({ commit, state }, vesselId) {
      globalAxios.delete(`/vessels/${vesselId}.json?auth=${state.idToken}`)
        .then(res => {
          globalAxios.patch(`users/${state.user.id}/vessels.json?auth=${state.idToken}`, { [vesselId]: null })
            .then(res => console.log(res))
            .catch(error => console.log(error))
          commit('deleteVessel', vesselId)
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
      return state.user
    },

    vessels (state) {
      return state.vessels
    },

    isAuthenticated (state) {
      return state.idToken !== null
    },

    isAuthError (state) {
      return state.authError
    }
  }
})
