import { shallow } from 'vue-test-utils'
import GoogleMapLoader from '@/components/GoogleMapLoader'
import { mapSettings } from '@/constants/mapSettings'

describe('GoogleMapLoader.vue', () => {
  const setup = () => {
    const wrapper = shallow(GoogleMapLoader, {
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

  describe('Methods', () => {
    const { wrapper } = setup()

    describe('initializeMap', () => {
      wrapper.vm.google = {
        maps: {
          Map: function() { this.newMap = true },
          Marker: () => {},
          Polyline: () => {},
        },
      };
      wrapper.vm.initializeMap()

      it('sets map properly', () => {
        expect(wrapper.vm.map).toEqual({ newMap: true })
      })
    })
  })
})
