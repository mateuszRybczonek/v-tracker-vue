import { shallow, createLocalVue } from 'vue-test-utils'
import TheSidebarQuickLinks from '@/components/TheSidebarQuickLinks.vue'
import { COMPONENT_NAMES } from '@/constants/vessel-details'
import Vuex from 'vuex'

const { VESSEL_DASHBOARD } = COMPONENT_NAMES

describe('TheSidebarQuickLinks.vue', () => {
  const setup = () => {
    const getters = {
      selectedVesselDetailsComponent: jest.fn()
    }

    getters.selectedVesselDetailsComponent.mockReturnValue(VESSEL_DASHBOARD)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      getters
    })

    const wrapper = shallow(TheSidebarQuickLinks, {
      localVue,
      store,
      propsData: {
        vertical: false
      }
    })

    return { wrapper }
  }

  test('renders proper number of buttons', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll('[data-test-sidebar-quick-links-button]')).toHaveLength(4)
  })

  test('renders proper button as selected', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll('[data-test-sidebar-quick-links-button]').at(0).classes()).toContain('quick-links__icon--active')
  })

  test('when vertical is false icons are rendered horizontal', () => {
    const { wrapper } = setup()
    expect(wrapper.find('[data-test-sidebar-quick-links]').classes()).not.toContain('quick-links--vertical')
  })

  test('when vertical is true icons are rendered horizontal', () => {
    const { wrapper } = setup()
    wrapper.setProps({ vertical: true })
    expect(wrapper.find('[data-test-sidebar-quick-links]').classes()).toContain('quick-links--vertical')
  })
})
