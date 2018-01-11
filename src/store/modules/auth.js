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
  user (state) {
    return state.user
  },

  isAuthenticated (state) {
    return state.idToken !== null
  },

  isAuthError (state) {
    return state.authError
  },

  idToken (state) {
    return state.idToken
  }
}

const actions = {
  setLogoutTimer ({ commit }, expirationTime) {
    setTimeout(() => {
      commit(types.CLEAR_AUTH_DATA)
    }, expirationTime * 1000)
  },

  login ({ commit, dispatch }, authData) { // login action dispatched in the component
    authAxios.post(`/verifyPassword?key=${API_KEY}`,
      { email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        commit(types.AUTH_USER, {
          token: res.data.idToken,
          userId: res.data.localId,
          userEmail: res.data.email
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
        commit(types.AUTH_ERROR, true)
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
    const userEmail = localStorage.getItem('userEmail')
    commit(types.AUTH_USER, {
      token,
      userId,
      userEmail
    })
    router.back()
  },

  logout ({ commit }) {
    commit(types.CLEAR_AUTH_DATA)
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    router.replace('/signin') // redirect after logout
  },

  signup ({ commit, dispatch }, authData) { // signup action dispatched in the component
    authAxios.post(`/signupNewUser?key=${API_KEY}`, // store user in auth database
      { email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        commit(types.AUTH_USER, {
          token: res.data.idToken,
          userId: res.data.localId,
          userEmail: res.data.email
        })

        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)  // store token in local storage for auto login
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userEmail', authData.email)

        dispatch('storeUser', authData) // save user to firebase /users
        dispatch('setLogoutTimer', res.data.expiresIn)
        router.push('/dashboard')
      })
      .catch(error => console.log(error))
  },

  storeUser ({ commit, state }, userData) { // save user to firebase /users
    if (!state.idToken) {
      return
    }
    globalAxios.post(`/users.json?auth=${state.idToken}`, userData) //  path from main.js axios defaults
      .then(() => { commit(types.STORE_USER, userData) }) // store user in store
      .catch(error => console.log(error))
  },

  clearAuthError ({ commit }) {
    commit(types.CLEAR_AUTH_ERROR)
  },

  fetchUser ({ commit, state }) {
    globalAxios.get(`/users.json?orderBy="email"&equalTo="${state.userEmail}"`)
      .then(res => {
        let user
        const data = res.data
        for (let key in data) {
          user = data[key]
          user.id = key
        }
        localStorage.setItem('user', user)
        commit(types.STORE_USER, user)
      })
      .catch(error => console.log(error))
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
