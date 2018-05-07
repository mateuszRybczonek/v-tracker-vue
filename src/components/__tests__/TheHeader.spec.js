import { mount } from 'vue-test-utils'
import TheHeader from '@/components/TheHeader.vue'
import Vuex from 'vuex'

describe('TheHeader.vue', () => {
  let actions
  let getters
  let store

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

    const wrapper = mount(TheHeader, {
      store,
      stubs: ['router-link']
    })

    const links = wrapper.findAll('routerlink')
    expect(links).toHaveLength(3)

    const firstLink = links.wrappers[0]
    expect(firstLink.attributes().to).toBe('/')
    expect(firstLink.text()).toBe('V-Tracker')

    const secondLink = links.wrappers[1]
    expect(secondLink.attributes().to).toBe('/dashboard/vessels')
    expect(secondLink.text()).toBe('Vessels')

    const thirdLink = links.wrappers[2]
    expect(thirdLink.attributes().to).toBe('/dashboard/reports')
    expect(thirdLink.text()).toBe('Reports')

    expect(wrapper.findAll('[data-test-the-header-logout-button]')).toHaveLength(1)
  })

  test('renders proper header when not isAuthenticated', () => {
    getters.isAuthenticated.mockReturnValue(false)

    const wrapper = mount(TheHeader, {
      store,
      stubs: ['router-link']
    })

    const links = wrapper.findAll('routerlink')
    expect(links).toHaveLength(1)

    const firstLink = links.wrappers[0]
    expect(firstLink.attributes().to).toBe('/')
    expect(firstLink.text()).toBe('V-Tracker')

    expect(wrapper.findAll('[data-test-the-header-logout-button]')).toHaveLength(0)
  })

  describe('Methods', () => {
    it('onLogout calls logout action', () => {
      getters.isAuthenticated.mockReturnValue(false)

      const wrapper = mount(TheHeader, {
        store,
        stubs: ['router-link']
      })
      wrapper.vm.onLogout()

      expect(logoutSpy).toHaveBeenCalled()
    })
  })

  // test('mocking router', () => {
  //   const mocks = {
  //     $router: {
  //       replace: jest.fn()
  //     }
  //   }
  //
  //   const wrapper = mount(TheHeader, {
  //     store,
  //     mocks
  //   })
  //
  //   const logoutButton = wrapper.find('[data-test-the-header-logout-button]')
  //   expect(mocks.$router.replace).toHaveBeenCalledWith('/signin')
  // })
})
