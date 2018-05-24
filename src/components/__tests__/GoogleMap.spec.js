import { shallow, createLocalVue } from 'vue-test-utils'
import GoogleMap from '@/components/GoogleMap.vue'
import Vuex from 'vuex'
import { MARKERS, LINES } from '@/../test/stubs/googleMap'
import { report } from '@/../test/stubs/report'
import GoogleMapLoader from '@/components/GoogleMapLoader'

const selectReportSpy = jest.fn()

describe('GoogleMap.vue', () => {
  const setup = () => {
    const getters = {
      selectedReport: jest.fn()
    }

    const actions = {
      selectReport: selectReportSpy
    }

    getters.selectedReport.mockReturnValue(report)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      getters,
      actions
    })

    const wrapper = shallow(GoogleMap, {
      localVue,
      store,
      propsData: {
        markers: MARKERS,
        lines: LINES,
        center: {
          lat: 13.505,
          lng: 73.893
        }
      },
      stubs: ['GoogleMapMarker', 'GoogleMapLine'],
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with GoogleMapLoader', () => {
      expect(wrapper.findAll(GoogleMapLoader)).toHaveLength(1)
    })
  })

  describe('Computed properties', () => {
    const { wrapper } = setup(true)

    test('newSelectedReport return proper data', () => {
      expect(wrapper.vm.newSelectedReport).toEqual(report)
    })
  })

  describe('Methods', () => {
    const { wrapper } = setup()

    describe('selectMarker', () => {
      wrapper.vm.selectMarker(MARKERS[1])

      it('calls selectReport', () => {
        expect(selectReportSpy).toHaveBeenCalled()
      })
    })
  })
})
