import { shallow } from 'vue-test-utils'
import TheHeader from '@/components/TheHeader.vue'
import Vuex from 'vuex'

describe('TheHeader.vue', () => {
  let actions
  let getters
  let store

  // eslint-disable-next-line no-undef
  const logoutSpy = jest.fn(() => Promise.resolve())

  beforeEach(() => {
    actions = {
      logout: logoutSpy
    }

    getters = {
      isAuthenticated: jest.fn()
    }

    store = new Vuex.Store({
      state: {},
      getters,
      actions
    })
  })

  test('renders proper header when isAuthenticated', () => {
    getters.isAuthenticated.mockReturnValue(true)

    const wrapper = shallow(TheHeader, {
      store
    })

    expect(wrapper.findAll('[data-test-the-header-navigation-item]')).toHaveLength(4)
    expect(wrapper.findAll('[data-test-the-header-logout-button]')).toHaveLength(1)
  })

  test('renders proper header when not isAuthenticated', () => {
    getters.isAuthenticated.mockReturnValue(false)

    const wrapper = shallow(TheHeader, {
      store,
      stubs: ['router-link']
    })

    expect(wrapper.findAll('[data-test-the-header-navigation-item]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test-the-header-logout-button]')).toHaveLength(0)
  })

  describe('Methods', () => {
    it('onLogout calls logout action', () => {
      getters.isAuthenticated.mockReturnValue(false)

      const wrapper = shallow(TheHeader, {
        store,
        stubs: ['router-link']
      })
      wrapper.vm.onLogout()

      expect(logoutSpy).toHaveBeenCalled()
    })
  })
})
