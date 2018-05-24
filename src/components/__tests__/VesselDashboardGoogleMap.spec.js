import { mount, createLocalVue } from 'vue-test-utils'
import VesselDashboardGoogleMap from '@/components/VesselDashboardGoogleMap'
import Vuex from 'vuex'
import { report, secondReport } from '@/../test/stubs/report'

describe('VesselDashboardGoogleMap.vue', () => {
  const setup = () => {

    const getters = {
      reports: jest.fn(),
      sortedReports: jest.fn(),
      fetchingReports: jest.fn()
    }

    getters.reports.mockReturnValue([report, secondReport])
    getters.sortedReports.mockReturnValue([report, secondReport])
    getters.fetchingReports.mockReturnValue(false)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      getters
    })

    const wrapper = mount(VesselDashboardGoogleMap, {
      localVue,
      store
    })

    return { wrapper }
  }

  it('renders VesselDashboardGoogleMap when fetchingReports is false', () => {
    const { wrapper } = setup()

    expect(wrapper.findAll('[data-test-google-map-placeholder]')).toHaveLength(0)
    expect(wrapper.findAll('[data-test-google-map]')).toHaveLength(1)
  })

  describe('Computed properties', () => {
    it('points returns proper value', () => {
      const { wrapper } = setup()
      const expectedResult = [
        {
          id: '-L7yuO7nLZtMgEe8qth6',
          position: {
            lat: 12.338,
            lng: 12.34
          },
          reportTime: '2018-02-10'
        }, {
          id: '-LAUKugHH0_YhkHdzcS-',
          position: {
            lat: 12.338,
            lng: -12.34
          },
          reportTime: '2018-04-16'
        }
      ]

      expect(wrapper.vm.points).toEqual(expectedResult)
    })

    it('lines returns proper value', () => {
      const { wrapper } = setup()
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
      const { wrapper } = setup()
      const expectedResult = { lat: 12.338, lng: 12.34 }
      expect(wrapper.vm.mapCenter).toEqual(expectedResult)
    })
  })

  describe('Methods', () => {
    describe('selectMarker', () => {
      const { wrapper } = setup()

      const marker = {
        id: '-L7yuO7nLZtMgEe8qth6',
        position: {
          lat: 12.338,
          lng: 12.34
        },
        reportTime: '2018-02-10'
      }

      wrapper.vm.selectMarker(marker)


      it('sets proper infoPosition', () => {
        expect(wrapper.vm.infoPosition).toEqual(marker.position)
      })

      it('sets proper infoContent', () => {
        expect(wrapper.vm.infoContent).toEqual(marker.reportTime)
      })

      it('sets infoOpened to true if info is hidden', () => {
        expect(wrapper.vm.infoOpened).toEqual(true)
      })

      it('sets infoOpened to true if info is hidden', () => {
        expect(wrapper.vm.infoOpened).toEqual(true)
      })

      it('sets infoCurrentKey to selected marker id', () => {
        expect(wrapper.vm.infoCurrentKey).toEqual('-L7yuO7nLZtMgEe8qth6')
      })
    })
  })
})
