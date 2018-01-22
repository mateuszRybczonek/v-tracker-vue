import * as types from '../mutation-types'
import authAxios from '../../axios-auth'
import globalAxios from 'axios'
import router from '../../router/index'

const API_KEY = 'AIzaSyAFJIoUJ2ZzcnfA0O-ODvWRHsOvCMjg6ow'

const state = {
  idToken: null,
  userId: null,
  user: null,
  authError: null
}

const getters = {
  user: state => state.user,
  isAuthenticated: state => state.idToken !== null,
  isAuthError: state => state.authError,
  idToken: state => state.idToken
}

const actions = {
  setLogoutTimer ({ commit }, expirationTime) {
    setTimeout(() => {
      commit(types.CLEAR_AUTH_DATA)
    }, expirationTime * 1000)
  },

  async login ({ commit, dispatch }, authData) { // login action dispatched in the component
    try {
      const { data } = await authAxios.post(`/verifyPassword?key=${API_KEY}`,
        { email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
      commit(types.AUTH_USER, {
        token: data.idToken,
        userId: data.localId,
        userEmail: data.email
      })

      const now = new Date()
      const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
      localStorage.setItem('token', data.idToken)  // store token in local storage for auto login
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userEmail', authData.email)
      await dispatch('setLogoutTimer', data.expiresIn)
      router.push('/dashboard')
    } catch (error) {
      commit(types.AUTH_ERROR, true)
      console.log(error)
    }
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
    const userEmail = localStorage.getItem('userEmail')
    commit(types.AUTH_USER, {
      token,
      userId,
      userEmail
    })
    router.push('/dashboard')
  },

  logout ({ commit }) {
    commit(types.CLEAR_AUTH_DATA)
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    router.replace('/signin') // redirect after logout
  },

  async signup ({ commit, dispatch }, authData) { // signup action dispatched in the component
    try {
      const { data } = await authAxios.post(`/signupNewUser?key=${API_KEY}`, // store user in auth database
        { email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })

      commit(types.AUTH_USER, {
        token: data.idToken,
        userId: data.localId,
        userEmail: data.email
      })

      const now = new Date()
      const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
      authData.userId = data.localId
      localStorage.setItem('token', data.idToken)  // store token in local storage for auto login
      localStorage.setItem('userId', authData.userId)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userEmail', authData.email)

      await dispatch('storeUser', authData) // save user to firebase /users
      await dispatch('setLogoutTimer', data.expiresIn)
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  },

  async storeUser ({ commit, state }, userData) { // save user to firebase /users
    if (!state.idToken) {
      return
    }
    try {
      await globalAxios.put(`/users/${userData.userId}.json?auth=${state.idToken}`, userData) //  path from main.js axios defaults
      commit(types.STORE_USER, userData) // store user in store
    } catch (error) {
      console.log(error)
    }
  },

  clearAuthError ({ commit }) {
    commit(types.CLEAR_AUTH_ERROR)
  },

  async fetchUser ({ commit, state }) {
    try {
      const { data } = await globalAxios.get(`/users/${state.userId}.json?auth=${state.idToken}`)
      const user = data
      localStorage.setItem('user', user)
      commit(types.STORE_USER, user)
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations = {
  [types.AUTH_USER] (state, userData) {      // storing the token in the vuex store
    state.idToken = userData.token
    state.userId = userData.userId
    state.userEmail = userData.userEmail
  },

  [types.STORE_USER] (state, user) {
    state.user = user
  },

  [types.CLEAR_AUTH_DATA] (state) {
    state.idToken = null
    state.userId = null
    state.user = null
  },

  [types.CLEAR_AUTH_ERROR] (state) {
    state.authError = false
  },

  [types.AUTH_ERROR] (state, error) {
    state.authError = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
