import { mount, shallow, createLocalVue } from 'vue-test-utils'
import TheSidebar from '@/components/TheSidebar.vue'
import TheSidebarHeader from '@/components/TheSidebarHeader.vue'
import TheSidebarQuickLinks from '@/components/TheSidebarQuickLinks.vue'
import TheSidebarContent from '@/components/TheSidebarContent.vue'
import Vuex from 'vuex'
import { report, secondReport } from '@/../test/stubs/report'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

describe('TheSidebar.vue', () => {
  let getters
  let store
  let mocks
  let localVue

  beforeEach(() => {
    getters = {
      sidebarVisible: jest.fn(),
      vessels: jest.fn()
    }

    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store({
      state: {},
      getters
    })

    mocks = {
      $route: {
        params: {
          id: '1'
        }
      }
    }
  })

  test('adds sidebar--collapsed when sidebarVisible is false', () => {
    getters.sidebarVisible.mockReturnValue(false)
    getters.vessels.mockReturnValue([firstVessel, secondVessel])

    const wrapper = shallow(TheSidebar, {
      localVue,
      store,
      mocks,
      propsData: {
        lastReport: report
      }
    })

    expect(wrapper.find('[data-test-the-sidebar]').classes()).toContain('sidebar--collapsed')
  })

  test('does not add sidebar--collapsed when sidebarVisible is true', () => {
    getters.sidebarVisible.mockReturnValue(true)
    getters.vessels.mockReturnValue([firstVessel, secondVessel])

    const wrapper = shallow(TheSidebar, {
      localVue,
      store,
      mocks,
      propsData: {
        lastReport: report
      }
    })

    expect(wrapper.find('[data-test-the-sidebar]').classes()).not.toContain('sidebar--collapsed')
  })

  test('renders TheSidebarHeader component', () => {
    getters.sidebarVisible.mockReturnValue(true)
    getters.vessels.mockReturnValue([firstVessel, secondVessel])

    const wrapper = shallow(TheSidebar, {
      localVue,
      store,
      mocks,
      propsData: {
        lastReport: report
      }
    })

    expect(wrapper.findAll(TheSidebarHeader)).toHaveLength(1)
  })

  test('renders TheSidebarQuickLinks component', () => {
    getters.sidebarVisible.mockReturnValue(true)
    getters.vessels.mockReturnValue([firstVessel])

    const wrapper = shallow(TheSidebar, {
      localVue,
      store,
      mocks,
      propsData: {
        lastReport: report
      }
    })

    expect(wrapper.findAll(TheSidebarQuickLinks)).toHaveLength(1)
  })

  test('renders TheSidebarContent component', () => {
    getters.sidebarVisible.mockReturnValue(true)
    getters.vessels.mockReturnValue([firstVessel])

    const wrapper = shallow(TheSidebar, {
      localVue,
      store,
      mocks,
      propsData: {
        lastReport: report
      }
    })

    expect(wrapper.findAll(TheSidebarContent)).toHaveLength(1)
  })

  describe('Computed properties', () => {
    it('vessel returns proper data', () => {
      getters.sidebarVisible.mockReturnValue(true)
      getters.vessels.mockReturnValue([firstVessel, secondVessel])

      const wrapper = mount(TheSidebar, {
        localVue,
        store,
        mocks,
        propsData: {
          lastReport: report
        }
      })

      expect(wrapper.vm.vessel).toEqual(firstVessel)
    })
  })
})
