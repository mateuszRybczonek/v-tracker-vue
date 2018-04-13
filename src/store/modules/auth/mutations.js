import * as types from '../../mutation-types'

export default {
  [types.AUTH_USER] (state, userData) { // storing the token in the vuex store
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
