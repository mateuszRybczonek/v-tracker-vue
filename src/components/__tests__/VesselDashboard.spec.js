import { shallow, createLocalVue } from 'vue-test-utils'
import VesselDashboard from '@/components/VesselDashboard.vue'
import VesselDashboardGoogleMap from '@/components/VesselDashboardGoogleMap.vue'
import WeatherData from '@/components/WeatherData.vue'
import PositionData from '@/components/PositionData.vue'
import NavigationData from '@/components/NavigationData.vue'
import RemainingOnBoard from '@/components/RemainingOnBoard.vue'
import ReportSelector from '@/components/ReportSelector'
import Vuex from 'vuex'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import { report, secondReport } from '@/../test/stubs/report'
import { vesselCapacities, firstVessel, secondVessel } from '@/../test/stubs/vessel'

const setVesselSpy = jest.fn()
const setVesselCapacitiesSpy = jest.fn()

describe('VesselDashboard.vue', () => {
  const setup = () => {
    const getters = {
      sidebarVisible: jest.fn(),
      selectedReport: jest.fn(),
      fetchingReports: jest.fn(),
      sortedReports: jest.fn(),
      reports: jest.fn(),
      vesselCapacities: jest.fn()
    }

    getters.sortedReports.mockReturnValue([secondReport, report])

    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueMomentJS, moment)

    const store = new Vuex.Store({
      state: {},
      getters
    })

    const wrapper = shallow(VesselDashboard, {
      localVue,
      store,
      mocks: {
        $route: {
          params: {
            id: '1'
          }
        },
      },
      computed: {
        fetchingReports: () => false,
        selectedReport: () => secondReport,
        reports: () => [secondReport, report],
        sidebarVisible: () => true,
        vessels: () => [firstVessel, secondVessel],
        vessel: () => firstVessel,
        vesselCapacities: () => vesselCapacities
      },

      methods: {
        setVessel: setVesselSpy,
        setVesselCapacities: setVesselCapacitiesSpy
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('not full width dashboard', () => {
      expect(wrapper.find('[data-test-vessel-dashboard]').classes()).not.toContain('vessel-dashboard--full-width')
    })

    test('with proper report month', () => {
      const { wrapper } = setup()
      expect(wrapper.find('[data-test-vessel-dashboard-report-date]').text()).toContain('April 2018')
    })

    test('with ReportSelector component', () => {
      const { wrapper } = setup()
      expect(wrapper.findAll(ReportSelector)).toHaveLength(1)
    })

    test('with GoogleMap component', () => {
      const { wrapper } = setup()
      expect(wrapper.findAll(VesselDashboardGoogleMap)).toHaveLength(1)
    })

    test('with PositionData component', () => {
      const { wrapper } = setup()
      expect(wrapper.findAll(PositionData)).toHaveLength(1)
    })

    test('with NavigationData component', () => {
      const { wrapper } = setup()
      expect(wrapper.findAll(NavigationData)).toHaveLength(1)
    })

    test('with WeatherData component', () => {
      const { wrapper } = setup()
      expect(wrapper.findAll(WeatherData)).toHaveLength(1)
    })

    test('with RemainingOnBoard component', () => {
      const { wrapper } = setup()
      expect(wrapper.findAll(RemainingOnBoard)).toHaveLength(1)
    })
  })

  test('it calls SetVessel method with proper arguments', () => {
    const { wrapper } = setup()
    expect(setVesselSpy).toHaveBeenCalledWith(firstVessel)
  })

  test('it calls setVesselCapacities method with proper arguments', () => {
    const { wrapper } = setup()
    const { maxFo, maxDo, maxFw } = firstVessel

    const expectedResult = {
      maxFo: parseInt(maxFo),
      maxDo: parseInt(maxDo),
      maxFw: parseInt(maxFw)
    }

    expect(setVesselCapacitiesSpy).toHaveBeenCalledWith(expectedResult)
  })

  describe('Computed properties', () => {
    it('previousReport returns proper report', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.previousReport).toEqual(report)
    })

    describe('distanceMadeSinceLastReport returns proper value', () => {
      const { wrapper } = setup()

      it('returns properly calculated distance when previuosReport exist', () => {
        expect(wrapper.vm.distanceMadeSinceLastReport).toEqual(1447)
      })

      it('returns early when previuosReport does not exist', () => {
        wrapper.setComputed({ previousReport: undefined })
        expect(wrapper.vm.distanceMadeSinceLastReport).toEqual(0)
      })
    })
  })
})
