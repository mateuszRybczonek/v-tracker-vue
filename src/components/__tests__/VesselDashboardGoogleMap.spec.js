import { mount, createLocalVue } from 'vue-test-utils'
import VesselDashboardGoogleMap from '@/components/VesselDashboardGoogleMap'
import Vuex from 'vuex'
import { report, secondReport } from '@/../test/stubs/report'

const selectReportSpy = jest.fn()
const googleMapMarkerStub = {
  setIcon: jest.fn(),
  setAnimation: jest.fn(),
  setMap: jest.fn(),
  marker: { ...report }
}

describe('VesselDashboardGoogleMap.vue', () => {
  const setup = () => {

    const getters = {
      reports: jest.fn(),
      sortedReports: jest.fn(),
      filteredReports: jest.fn(),
      fetchingReports: jest.fn(),
      selectedReport: jest.fn(),
      dashboardGoogleMap: jest.fn()
    }

    const actions = {
      selectReport: selectReportSpy
    }

    getters.reports.mockReturnValue([report, secondReport])
    getters.sortedReports.mockReturnValue([report, secondReport])
    getters.filteredReports.mockReturnValue([report, secondReport])
    getters.fetchingReports.mockReturnValue(false)
    getters.selectedReport.mockReturnValue(report)
    getters.dashboardGoogleMap.mockReturnValue({
      panTo: jest.fn()
    })

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      getters,
      actions
    })

    const wrapper = mount(VesselDashboardGoogleMap, {
      localVue,
      store,
      stubs: ['GoogleMapMarker', 'GoogleMapLine'],
    })

    return { wrapper }
  }

  it('renders VesselDashboardGoogleMap when fetchingReports is false', () => {
    const { wrapper } = setup()

    expect(wrapper.findAll('[data-test-google-map-placeholder]')).toHaveLength(0)
    expect(wrapper.findAll('[data-test-google-map]')).toHaveLength(1)
  })

  describe('Computed properties', () => {
    const { wrapper } = setup()

    it('points returns proper value', () => {
      const expectedResult = [
        {
          id: '-L7yuO7nLZtMgEe8qth6',
          position: {
            lat: 12.338,
            lng: 12.34
          },
          reportTime: '2018-02-10',
          vesselId: '1',
          vesselName: 'test vessel'
        }, {
          id: '-LAUKugHH0_YhkHdzcS-',
          position: {
            lat: 12.338,
            lng: -12.34
          },
          reportTime: '2018-04-16',
          vesselId: undefined,
          vesselName: '-'
        }
      ]

      expect(wrapper.vm.points).toEqual(expectedResult)
    })

    it('lines returns proper value', () => {
      const expectedResult = [
        {
          path: [
            {
              lat: 12.338,
              lng: 12.34
            }, {
              lat: 12.338,
              lng: -12.34
            }
          ]
        }
      ]

      expect(wrapper.vm.lines).toEqual(expectedResult)
    })

    it('mapCenter returns position of last report', () => {
      const expectedResult = { lat: 12.338, lng: 12.34 }
      expect(wrapper.vm.mapCenter).toEqual(expectedResult)
    })

    it('newSelectedReport return proper data', () => {
      wrapper.setData({ googleMapMarkers: [googleMapMarkerStub] })
      expect(wrapper.vm.newSelectedReport).toEqual(report)
    })
  })

  describe('Methods', () => {
    const { wrapper } = setup()

    describe('selectMarker', () => {
      const marker = {
        id: '-L7yuO7nLZtMgEe8qth6',
        position: {
          lat: 12.338,
          lng: 12.34
        },
        reportTime: '2018-02-10',
        vesselId: '1',
        vesselName: 'test vessel'
      }

      wrapper.vm.selectMarker(marker)

      it('sets proper infoPosition', () => {
        expect(selectReportSpy).toHaveBeenCalled
      })

    })
  })
})
