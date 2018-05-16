import { mount, createLocalVue } from 'vue-test-utils'
import MainMenuPage from '@/pages/MainMenuPage.vue'
import TheHeader from '@/components/TheHeader.vue'
import Vuex from 'vuex'

const fetchUserSpy = jest.fn()

describe('MainMenuPage.vue', () => {
  const setup = () => {
    const actions = {
      fetchUser: fetchUserSpy
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      actions
    })

    const wrapper = mount(MainMenuPage, {
      localVue,
      store,
      stubs: ['router-view']
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with TheHeader component', () => {
      expect(wrapper.findAll(TheHeader)).toHaveLength(1)
    })
  })

  it('fetchUser is called on created', () => {
    expect(fetchUserSpy).toHaveBeenCalled()
  })
})
