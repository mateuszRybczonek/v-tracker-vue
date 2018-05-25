import { shallow, createLocalVue } from 'vue-test-utils'
import VesselPage from '@/pages/VesselPage.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import { COMPONENT_NAMES } from '@/constants/vessel-details'
import Vuex from 'vuex'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'
import { report, secondReport } from '@/../test/stubs/report'

const { VESSEL_DASHBOARD } = COMPONENT_NAMES

const fetchReportsSpy = jest.fn()

describe('VesselPage.vue', () => {
  const setup = (selectedComponent = VESSEL_DASHBOARD) => {
    const actions = {
      fetchReports: fetchReportsSpy
    }

    const getters = {
      vessels: jest.fn(),
      sortedReports: jest.fn(),
      sidebarVisible: jest.fn(),
      selectedVesselDetailsComponent: jest.fn(),
      selectedReport: jest.fn()
    }

    getters.vessels.mockReturnValue([firstVessel, secondVessel])
    getters.sortedReports.mockReturnValue([report, secondReport])
    getters.sidebarVisible.mockReturnValue(false)
    getters.selectedVesselDetailsComponent.mockReturnValue(selectedComponent)
    getters.selectedReport.mockReturnValue(report)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      actions,
      getters
    })

    const mocks = {
      $route: {
        params: {
          id: '1'
        }
      }
    }

    const wrapper = shallow(VesselPage, {
      localVue,
      store,
      mocks
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with proper content', () => {
      expect(wrapper.find('[data-test-vessel-page-content]').classes()).toContain('vessel__content--expanded')
  })

    test('with TheSidebar component', () => {
      expect(wrapper.findAll(TheSidebar)).toHaveLength(1)
      expect(wrapper.find(TheSidebar).props().lastReport).toEqual(report)
    })
  })

  test('created hook fetches reports', () => {
    expect(fetchReportsSpy.mock.calls[0][1]).toEqual('1')
  })

  describe('Computed properties', () => {
    it('lastReport returns proper data', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.lastReport).toEqual(report)
    })
  })
})
