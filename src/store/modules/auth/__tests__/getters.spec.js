import getters from '@/store/modules/auth/getters'

describe('reports getters', () => {
  test('user returns state.user', () => {
    const user = { id: 555 }
    const state = { user }
    const result = getters.user(state)
    expect(result).toEqual(user)
  })

  test('isAuthenticated returns true if state.idToken exist', () => {
    const idToken = '123'
    const state = { idToken }
    const result = getters.isAuthenticated(state)
    expect(result).toEqual(true)
  })

  test('isAuthenticated returns flase if state.idToken is null', () => {
    const idToken = null
    const state = { idToken }
    const result = getters.isAuthenticated(state)
    expect(result).toEqual(false)
  })

  test('isAuthError returns state.authError', () => {
    const authError = 'error'
    const state = { authError }
    const result = getters.isAuthError(state)
    expect(result).toEqual(authError)
  })

  test('idToken returns state.idToken', () => {
    const idToken = '123'
    const state = { idToken }
    const result = getters.idToken(state)
    expect(result).toEqual(idToken)
  })

  test('userId returns state.userId', () => {
    const userId = '123'
    const state = { userId }
    const result = getters.userId(state)
    expect(result).toEqual(userId)
  })
})
