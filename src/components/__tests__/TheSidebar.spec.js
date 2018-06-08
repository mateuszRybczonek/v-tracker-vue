import { shallow, mount, createLocalVue } from 'vue-test-utils'
import TheSidebar from '@/components/TheSidebar.vue'
import TheSidebarHeader from '@/components/TheSidebarHeader.vue'
import TheSidebarQuickLinks from '@/components/TheSidebarQuickLinks.vue'
import TheSidebarContent from '@/components/TheSidebarContent.vue'
import Vuex from 'vuex'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import pathify from 'vuex-pathify'
import { report } from '@/../test/stubs/report'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'
import { COMPONENT_NAMES } from '@/constants/vessel-details'
const { VESSEL_DASHBOARD } = COMPONENT_NAMES

describe('TheSidebar.vue', () => {
  const setup = sidebarVisible => {
    const getters = {
      selectedVesselDetailsComponent: () => VESSEL_DASHBOARD,
      sidebarVisible: () => sidebarVisible,
      vessels: () => [firstVessel, secondVessel]
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueMomentJS, moment)

    const store = new Vuex.Store({
      plugins: [ pathify.plugin ],
      state: {},
      getters
    })

    const wrapper = shallow(TheSidebar, {
      localVue,
      store,
      propsData: {
        lastReport: report
      },
      mocks: {
        $route: {
          params: {
            id: '1'
          }
        },
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup(true)

    test('TheSidebarHeader component', () => {
      expect(wrapper.findAll(TheSidebarHeader)).toHaveLength(1)
    })

    test('TheSidebarQuickLinks component', () => {
      expect(wrapper.findAll(TheSidebarQuickLinks)).toHaveLength(1)
    })

    test('TheSidebarContent component', () => {
      expect(wrapper.findAll(TheSidebarContent)).toHaveLength(1)
    })
  })

  describe('when sidebarVisible is false', () => {
    const { wrapper } = setup(false)

    test('adds sidebar--collapsed', () => {
      wrapper.setComputed({ sidebarVisible: false })
      expect(wrapper.find('[data-test-the-sidebar]').classes()).toContain('sidebar--collapsed')
    })
  })

  describe('when sidebarVisible is true', () => {
    const { wrapper } = setup(true)

    test('does not add sidebar--collapsed', () => {
      expect(wrapper.find('[data-test-the-sidebar]').classes()).not.toContain('sidebar--collapsed')
    })
  })

  describe('Computed properties', () => {
    const { wrapper } = setup(true)

    test('vessel returns proper data', () => {
      expect(wrapper.vm.vessel).toEqual(firstVessel)
    })
  })
})
