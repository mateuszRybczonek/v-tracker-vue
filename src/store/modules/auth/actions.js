import * as types from '@/store/mutation-types'
import authAxios from '@/axios-auth'
import globalAxios from 'axios'
import router from '@/router/index'

const API_KEY = 'AIzaSyAFJIoUJ2ZzcnfA0O-ODvWRHsOvCMjg6ow'

export default {
  setLogoutTimer ({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch('logout')
    }, expirationTime * 1000)
  },

  async login ({ commit, dispatch }, authData) {
    try {
      const { data } = await authAxios.post(`/verifyPassword?key=${API_KEY}`,
        { email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )

      const authUserData = {
        token: data.idToken,
        userId: data.localId,
        userEmail: data.email
      }

      commit(types.AUTH_USER, authUserData)

      const now = Date.now()
      const expirationDate = new Date(now + data.expiresIn * 1000)
      const localStoragePayload = { ...authUserData, expirationDate }

      await dispatch('setAuthDataInLocalStorage', localStoragePayload)
      await dispatch('setLogoutTimer', data.expiresIn)
    } catch (error) {
      commit(types.AUTH_ERROR, true)
      throw(error)
    }
  },

  tryAutoLogin ({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) return

    const expirationDate = localStorage.getItem('expirationDate')
    const now = Date.now()

    if (now >= expirationDate) return

    const userId = localStorage.getItem('userId')
    const userEmail = localStorage.getItem('userEmail')

    commit(types.AUTH_USER, {
      token,
      userId,
      userEmail
    })

    router.push('/dashboard')
  },

  logout ({ commit, dispatch }) {
    commit(types.CLEAR_AUTH_DATA)
    dispatch('clearAuthDataInLocalStorage')
  },

  async signup ({ commit, dispatch }, authData) {
    try {
      const { data } = await authAxios.post(`/signupNewUser?key=${API_KEY}`,
        { email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )

      const authUserData = {
        token: data.idToken,
        userId: data.localId,
        userEmail: data.email
      }

      commit(types.AUTH_USER, authUserData)

      const now = Date.now()
      const expirationDate = new Date(now + data.expiresIn * 1000)
      const localStoragePayload = { ...authUserData, expirationDate }

      await dispatch('setAuthDataInLocalStorage', localStoragePayload)
      await dispatch('storeUser', authData)
      await dispatch('setLogoutTimer', data.expiresIn)
    } catch (error) {
      throw(error)
    }
  },

  async storeUser ({ commit, state }, userData) {
    if (!state.idToken) return

    try {
      await globalAxios.put(`/users/${userData.userId}.json?auth=${state.idToken}`, userData)
      commit(types.STORE_USER, userData)
    } catch (error) {
      throw(error)
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
      throw(error)
    }
  },

  clearAuthDataInLocalStorage() {
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  },

  setAuthDataInLocalStorage({ commit }, payload) {
    const { token, userId, expirationDate, userEmail } = payload
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('expirationDate', expirationDate)
    localStorage.setItem('userEmail', userEmail)
  }
}
