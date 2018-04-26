import authAxios from '@/axios-auth'
import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'
import actions from '@/store/modules/auth/actions'
import { equal } from 'assert'

const authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAFJIoUJ2ZzcnfA0O-ODvWRHsOvCMjg6ow'
const signUpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAFJIoUJ2ZzcnfA0O-ODvWRHsOvCMjg6ow'

describe('auth actions', () => {
  beforeEach(() => {
    moxios.install(authAxios)
  })

  afterEach(() => {
    moxios.uninstall(authAxios)
  })

  describe('setLogoutTimer', () => {
    let context
    let expirationTime

    beforeEach(() => {
      expirationTime = 3600

      context = {
        dispatch: jest.fn()
      }

      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('calls dispatch with "logout" after specified amount of time', () => {
      actions.setLogoutTimer(context, expirationTime)

      jest.runTimersToTime(3600000)
      expect(context.dispatch).toHaveBeenCalledWith('logout')
    })
  })

  describe('login', () => {
    let context
    let authData
    let onFulfilledPost
    let postResponse
    let originalDateNow

    const mockDateNow = () => 1524475888010

    beforeEach(() => {
      authData = { email: 'example@vtracker.com', password: 'qwerty' }

      postResponse = {
        displayName: "",
        email: "example@vtracker.com",
        expiresIn: "3600",
        idToken: "987654321",
        kind: "identitytoolkit#VerifyPasswordResponse",
        localId: "K2",
        refreshToken: "555",
        registered: true
      }

      context = {
        commit: jest.fn(),
        dispatch: jest.fn()
      }

      originalDateNow = Date.now
      Date.now = mockDateNow

      onFulfilledPost = sinon.spy()

      authAxios.post(authUrl).then(onFulfilledPost)

      moxios.stubRequest(authUrl, {
        status: 200,
        response: postResponse
      })
    })

    afterEach(() => {
      Date.now = originalDateNow
    })

    it('calls API and gets a response', async() => {
      await actions.login(context, authData)
      equal(onFulfilledPost.getCall(0).args[0].data, postResponse)
    })

    it('calls commit with AUTH_USER and token, userId and userEmail', async() => {
      const payload = {
        token: postResponse.idToken,
        userId: postResponse.localId,
        userEmail: postResponse.email
      }

      await actions.login(context, authData)
      expect(context.commit).toHaveBeenCalledWith('AUTH_USER', payload)
    })

    it('calls dispatch with setAuthDataInLocalStorage and localStoragePayload', async() => {
      const expectedLocalStoragePayload = {
        expirationDate: new Date(1524475888010 + 3600 * 1000),
        token: "987654321",
        userEmail: "example@vtracker.com",
        userId: "K2"
      }

      await actions.login(context, authData)
      expect(context.dispatch).toHaveBeenCalledWith('setAuthDataInLocalStorage', expectedLocalStoragePayload)
    })

    it('calls dispatch with setLogoutTimer and data.expiresIn', async() => {
      await actions.login(context, authData)
      expect(context.dispatch).toHaveBeenCalledWith('setLogoutTimer', postResponse.expiresIn)
    })
  })

  describe('signup', () => {
    let context
    let authData
    let onFulfilledPost
    let postResponse
    let originalDateNow

    const mockDateNow = () => 1524475888010

    beforeEach(() => {
      authData = { email: 'example@vtracker.com', password: 'qwerty' }

      postResponse = {
        displayName: "",
        email: "example@vtracker.com",
        expiresIn: "3600",
        idToken: "987654321",
        kind: "identitytoolkit#VerifyPasswordResponse",
        localId: "K2",
        refreshToken: "555",
        registered: true
      }

      context = {
        commit: jest.fn(),
        dispatch: jest.fn()
      }

      originalDateNow = Date.now
      Date.now = mockDateNow

      onFulfilledPost = sinon.spy()

      authAxios.post(signUpUrl).then(onFulfilledPost)

      moxios.stubRequest(signUpUrl, {
        status: 200,
        response: postResponse
      })
    })

    afterEach(() => {
      Date.now = originalDateNow
    })

    it('calls API and gets a response', async() => {
      await actions.signup(context, authData)
      equal(onFulfilledPost.getCall(0).args[0].data, postResponse)
    })

    it('calls commit with AUTH_USER and token, userId and userEmail', async() => {
      const payload = {
        token: postResponse.idToken,
        userId: postResponse.localId,
        userEmail: postResponse.email
      }

      await actions.signup(context, authData)
      expect(context.commit).toHaveBeenCalledWith('AUTH_USER', payload)
    })

    it('calls dispatch with setAuthDataInLocalStorage and localStoragePayload', async() => {
      const expectedLocalStoragePayload = {
        expirationDate: new Date(1524475888010 + 3600 * 1000),
        token: "987654321",
        userEmail: "example@vtracker.com",
        userId: "K2"
      }

      await actions.signup(context, authData)
      expect(context.dispatch).toHaveBeenCalledWith('setAuthDataInLocalStorage', expectedLocalStoragePayload)
    })

    it('calls dispatch with storeUser and authData', async() => {
      await actions.signup(context, authData)
      expect(context.dispatch).toHaveBeenCalledWith('storeUser', authData)
    })

    it('calls dispatch with setLogoutTimer and data.expiresIn', async() => {
      await actions.signup(context, authData)
      expect(context.dispatch).toHaveBeenCalledWith('setLogoutTimer', postResponse.expiresIn)
    })
  })

  describe('logout', () => {
    let context

    const authData = {
      token: '123456789',
      userId: '1',
      userEmail: 'example@vtracker.com'
    }

    beforeEach(() => {
      context = {
        commit: jest.fn(),
        dispatch: jest.fn()
      }

      localStorage.setItem('token', authData.token)
      localStorage.setItem('userId', authData.userId)
      localStorage.setItem('userEmail', authData.userEmail)
      localStorage.setItem('expirationDate', '1524475888011')
    })

    it('calls commit with CLEAR_AUTH_DATA', async() => {
      await actions.logout(context)
      expect(context.commit).toHaveBeenCalledWith('CLEAR_AUTH_DATA')
    })

    it('calls dispatch with clearAuthDataInLocalStorage', async() => {
      await actions.logout(context)
      expect(context.dispatch).toHaveBeenCalledWith('clearAuthDataInLocalStorage')
    })
  })

  describe('storeUser', () => {
    let context
    let onFulfilledPost
    let postResponse

    const userData = {
      userId: '1',
      userEmail: 'example@vtracker.com'
    }

    beforeEach(() => {
      moxios.install()

      context = {
        commit: jest.fn(),
        state: {
          idToken: '123456789'
        }
      }

      postResponse = 'user stored in database'

      onFulfilledPost = sinon.spy()

      axios.post('/users/1.json?auth=123456789').then(onFulfilledPost)

      moxios.stubRequest('/users/1.json?auth=123456789', {
        status: 200,
        response: postResponse
      })
    })

    afterEach(() => {
      moxios.uninstall()
    })

    it('returns early if no token is present', async() => {
      context.state.idToken = null

      await actions.storeUser(context, userData)
      expect(onFulfilledPost).notCalled
      expect(context.commit).notCalled
    })

    it('calls API and stores the user in the database', async() => {
      await actions.storeUser(context, userData)
      equal(onFulfilledPost.getCall(0).args[0].data, postResponse)
    })

    it('calls commit with STORE_USER and userData', async() => {
      await actions.storeUser(context, userData)
      expect(context.commit).toHaveBeenCalledWith('STORE_USER', userData)
    })
  })

  describe('clearAuthError', () => {
    let context

    beforeEach(() => {
      context = {
        commit: jest.fn(),
      }
    })

    it('calls commit with CLEAR_AUTH_ERROR', async() => {
      await actions.clearAuthError(context)
      expect(context.commit).toHaveBeenCalledWith('CLEAR_AUTH_ERROR')
    })
  })

  describe('fetchUser', () => {
    let context
    let onFulfilledGet
    let getResponse

    beforeEach(() => {
      moxios.install()

      context = {
        commit: jest.fn(),
        state: {
          userId: '1',
          idToken: '123456789'
        }
      }

      getResponse = 'get user from the database'

      onFulfilledGet = sinon.spy()

      axios.get('/users/1.json?auth=123456789').then(onFulfilledGet)

      moxios.stubRequest('/users/1.json?auth=123456789', {
        status: 200,
        response: getResponse
      })
    })

    afterEach(() => {
      moxios.uninstall()
    })

    it('calls API and get the user from the database', async() => {
      await actions.fetchUser(context)
      equal(onFulfilledGet.getCall(0).args[0].data, getResponse)
    })

    it('calls localStorage to set the user', async() => {
      await actions.fetchUser(context)
      expect(localStorage.setItem).toHaveBeenCalledWith('user', getResponse)
    })

    it('calls commit with STORE_USER and userData', async() => {
      await actions.fetchUser(context, getResponse)
      expect(context.commit).toHaveBeenCalledWith('STORE_USER', getResponse)
    })
  })

  describe('tryAutoLogin', () => {
    let context
    let originalDateNow

    const authData = {
      token: '123456789',
      userId: '1',
      userEmail: 'example@vtracker.com'
    }

    const mockDateNow = () => 1524475888010

    beforeEach(() => {
      context = {
        commit: jest.fn(),
      }

      localStorage.setItem('token', authData.token)
      localStorage.setItem('userId', authData.userId)
      localStorage.setItem('userEmail', authData.userEmail)
      localStorage.setItem('expirationDate', '1524475888011')

      originalDateNow = Date.now
      Date.now = mockDateNow
    })

    afterEach(() => {
      Date.now = originalDateNow
    })

    it('calls localStorage to get the token', async() => {
      await actions.tryAutoLogin(context)
      expect(localStorage.getItem).toHaveBeenCalledWith('token')
    })

    it('calls localStorage to get the expirationDate if token is present', async() => {
      await actions.tryAutoLogin(context)
      expect(localStorage.getItem).toHaveBeenCalledWith('expirationDate')
    })

    it('returns early if no token is present', async() => {
      localStorage.setItem('token', null)

      await actions.tryAutoLogin(context)
      expect(localStorage.getItem).notCalled
      expect(context.commit).notCalled
    })

    it('calls localStorage to get the userId', async() => {
      await actions.tryAutoLogin(context)
      expect(localStorage.getItem).toHaveBeenCalledWith('userId')
    })

    it('calls localStorage to get the userEmail', async() => {
      await actions.tryAutoLogin(context)
      expect(localStorage.getItem).toHaveBeenCalledWith('userEmail')
    })

    it('calls commit with AUTH_USER and authorization data', async() => {
      await actions.tryAutoLogin(context)
      expect(context.commit).toHaveBeenCalledWith('AUTH_USER', { ...authData })
    })
  })

  describe('clearAuthDataInLocalStorage', () => {
    it('calls localStorage.removeItem with expirationDate', async() => {
      await actions.clearAuthDataInLocalStorage()
      expect(localStorage.removeItem).toHaveBeenCalledWith('expirationDate')
    })

    it('calls localStorage.removeItem with token', async() => {
      await actions.clearAuthDataInLocalStorage()
      expect(localStorage.removeItem).toHaveBeenCalledWith('token')
    })

    it('calls localStorage.removeItem with userId', async() => {
      await actions.clearAuthDataInLocalStorage()
      expect(localStorage.removeItem).toHaveBeenCalledWith('userId')
    })
  })

  describe('setAuthDataInLocalStorage', () => {
    let context
    let originalDateNow

    const authUserData = {
      token: '123456789',
      userId: '1',
      userEmail: 'example@vtracker.com'
    }

    const mockDateNow = () => 1524475888010
    const expirationDate = new Date(1524475888010 + 3600 * 1000)

    beforeEach(() => {
      context = {
        commit: jest.fn(),
      }

      originalDateNow = Date.now
      Date.now = mockDateNow
    })

    afterEach(() => {
      Date.now = originalDateNow
    })


    it('calls localStorage.setItem with token and proper value', async() => {
      const payload = { ...authUserData, expirationDate }

      await actions.clearAuthDataInLocalStorage(context, payload)
      expect(localStorage.setItem).toHaveBeenCalledWith('token', '123456789')
    })

    it('calls localStorage.setItem with userId and proper value', async() => {
      const payload = { ...authUserData, expirationDate }

      await actions.clearAuthDataInLocalStorage(context, payload)
      expect(localStorage.setItem).toHaveBeenCalledWith('userId', '1')
    })

    it('calls localStorage.setItem with expirationDate and proper value', async() => {
      const payload = { ...authUserData, expirationDate }

      await actions.clearAuthDataInLocalStorage(context, payload)
      expect(localStorage.setItem).toHaveBeenCalledWith('expirationDate', '1524475888011')
    })

    it('calls localStorage.setItem with userEmail and proper value', async() => {
      const payload = { ...authUserData, expirationDate }

      await actions.clearAuthDataInLocalStorage(context, payload)
      expect(localStorage.setItem).toHaveBeenCalledWith('userEmail', 'example@vtracker.com')
    })
  })
})
