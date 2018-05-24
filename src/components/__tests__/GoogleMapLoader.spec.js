import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { MARKERS, LINES } from '@/../test/stubs/googleMap'
import { report } from '@/../test/stubs/report'
import GoogleMapLoader from '@/components/GoogleMapLoader'
import { mapSettings } from '@/constants/mapSettings'

const selectReportSpy = jest.fn()

describe('GoogleMapLoader.vue', () => {
  const setup = () => {
    const wrapper = mount(GoogleMapLoader, {
      propsData: {
        mapConfig: mapSettings,
        apiKey: '1',
        mapHeight: '460px'
      },
      stubs: ['GoogleMapMarker', 'GoogleMapLine']
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with map container', () => {
      expect(wrapper.findAll('[data-test-map-container]')).toHaveLength(1)
    })
  })
})
