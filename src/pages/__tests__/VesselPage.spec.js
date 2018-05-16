import { mount, createLocalVue } from 'vue-test-utils'
import VesselPage from '@/pages/VesselPage.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import VesselDashboard from '@/components/VesselDashboard.vue'
import { COMPONENT_NAMES } from '@/constants/vessel-details'
import Vuex from 'vuex'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'
import { report, secondReport } from '@/../test/stubs/report'

const { VESSEL_DASHBOARD, REPORTS, WEATHER, STATISTICS } = COMPONENT_NAMES

const fetchReportsSpy = jest.fn()

describe('VesselPage.vue', () => {
  const setup = (selectedComponent = VESSEL_DASHBOARD) => {
    const actions = {
      fetchReports: fetchReportsSpy
    }

    const getters = {
      vessels: jest.fn(),
      reports: jest.fn(),
      sidebarVisible: jest.fn(),
      selectedVesselDetailsComponent: jest.fn(),
      selectedReport: jest.fn()
    }

    getters.vessels.mockReturnValue([firstVessel, secondVessel])
    getters.reports.mockReturnValue([report, secondReport])
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

    const wrapper = mount(VesselPage, {
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
      expect(wrapper.find(TheSidebar).props().lastReport).toEqual(secondReport)
    })

    test('with proper dynamic component', () => {
      expect(wrapper.findAll(VesselDashboard)).toHaveLength(1)
      expect(wrapper.find(VesselDashboard).props().componentProps).toEqual({ reports: [secondReport, report] })
    })
  })

  test('created hook fetches reports', () => {
    expect(fetchReportsSpy.mock.calls[0][1]).toEqual('1')
  })

  describe('Computed properties', () => {
    it('reportsSortedAsc returns proper data', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.reportsSortedAsc).toEqual([report, secondReport])
    })

    it('reportsSortedDesc returns proper data', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.reportsSortedDesc).toEqual([secondReport, report])
    })

    it('previousReport returns proper data', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.previousReport).toEqual(report)
    })

    it('lastReport returns proper data', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.lastReport).toEqual(secondReport)
    })

    it('last14Reports returns proper data', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.last14Reports).toEqual([secondReport, report])
    })

    describe('componentProps', () => {
      it('returns proper data when selectedVesselDetailsComponent is VESSEL_DASHBOARD', () => {
        const { wrapper } = setup()
        expect(wrapper.vm.componentProps).toEqual({ reports: [secondReport, report] })
      })

      it('returns proper data when selectedVesselDetailsComponent is REPORTS', () => {
        const { wrapper } = setup(REPORTS)
        const expectedValue = {
          reports: [report, secondReport],
          last14Reports: [report, secondReport]
        }
        expect(wrapper.vm.componentProps).toEqual(expectedValue)
      })

      it('returns proper data when selectedVesselDetailsComponent is WEATHER', () => {
        const { wrapper } = setup(WEATHER)
        expect(wrapper.vm.componentProps).toEqual({})
      })

      it('returns proper data when selectedVesselDetailsComponent is STATISTICS', () => {
        const { wrapper } = setup(STATISTICS)
        expect(wrapper.vm.componentProps).toEqual({})
      })
    })
  })
})
