import { mount, createLocalVue } from 'vue-test-utils'
import VesselsGoogleMap from '@/components/VesselsGoogleMap'
import Vuex from 'vuex'
import { report, secondReport } from '@/../test/stubs/report'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

const selectReportSpy = jest.fn()

describe('VesselsGoogleMap.vue', () => {
  const setup = () => {
    const getters = {
      reports: jest.fn(),
      sortedReports: jest.fn(),
      fetchingVessels: jest.fn(),
      selectedReport: jest.fn(),
      dashboardGoogleMap: jest.fn(),
    }

    const actions = {
      selectReport: selectReportSpy
    }

    getters.reports.mockReturnValue([report, secondReport])
    getters.sortedReports.mockReturnValue([report, secondReport])
    getters.fetchingVessels.mockReturnValue(false)
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

    const wrapper = mount(VesselsGoogleMap, {
      localVue,
      store,
      stubs: ['GoogleMapMarker'],
      propsData: {
        vessels: [firstVessel, secondVessel],
        google: {
          maps: {
            InfoWindow: function(props) {
              this.content = props.content
            }
          },
        },
      }
    })

    return { wrapper }
  }

  it('renders VesselsGoogleMap when fetchingVessels is false', () => {
    const { wrapper } = setup()

    expect(wrapper.findAll('[data-test-google-map-placeholder]')).toHaveLength(0)
    expect(wrapper.findAll('[data-test-google-map]')).toHaveLength(1)
  })

  describe('Computed properties', () => {
    const { wrapper } = setup()

    it('points returns proper value', () => {
      const expectedResult = [
        {
          'id': 1,
          'position': {
            'lat': 12.3,
            'lng': 30.4
          },
          'reportTime': '2018-06-20',
          'vesselId': '1',
          'vesselName': 'ENSCO DS-2'
        }, {
          'id': 2,
          'position': {
            'lat': 12.3,
            'lng': 30.4
          },
          'reportTime': '2018-06-10',
          'vesselId': '2',
          'vesselName': 'ENSCO DS-8'
        }
      ]

      expect(wrapper.vm.points).toEqual(expectedResult)
    })

    it('mapCenter returns position of last report', () => {
      const expectedResult = { lat: 12.3, lng: 30.4 }
      expect(wrapper.vm.mapCenter).toEqual(expectedResult)
    })
  })
})
