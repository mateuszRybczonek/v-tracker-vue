import mutations from '@/store/modules/auth/mutations'
import { userData, user } from '@/../test/stubs/user'

describe('auth mutations', () => {
  test('AUTH_USER sets state idToken, userId and userEmail', () => {
    const state = {}

    mutations.AUTH_USER(state, userData)
    expect(state.idToken).toBe(userData.token)
    expect(state.userId).toBe(userData.userId)
    expect(state.userEmail).toBe(userData.userEmail)
  })

  test('STORE_USER sets state.user to user', () => {
    const state = {}

    mutations.STORE_USER(state, user)
    expect(state.user).toBe(user)
  })

  test('CLEAR_AUTH_DATA sets state idToken, userId, user to null', () => {
    const state = {
      idToken: '111',
      userId: '222',
      user
    }

    mutations.CLEAR_AUTH_DATA(state)
    expect(state.idToken).toBe(null)
    expect(state.userId).toBe(null)
    expect(state.user).toBe(null)
  })

  test('CLEAR_AUTH_ERROR sets state.authError to null', () => {
    const state = {
      authError: 'error'
    }

    mutations.CLEAR_AUTH_ERROR(state)
    expect(state.authError).toBe(false)
  })

  test('AUTH_ERROR sets state.authError to given value', () => {
    const state = {
      authError: null
    }

    const error = 'error'

    mutations.AUTH_ERROR(state, error)
    expect(state.authError).toBe(error)
  })
})
