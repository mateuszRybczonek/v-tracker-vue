import { shallow } from 'vue-test-utils'
import { MARKERS } from '@/../test/stubs/googleMap'
import GoogleMapMarker from '@/components/GoogleMapMarker'
import { POINT_MARKER_ICON_CONFIG } from '@/constants/mapSettings'

describe('GoogleMapMarker.vue', () => {
  const setup = () => {
    const wrapper = shallow(GoogleMapMarker, {
      propsData: {
        google: {
          maps: {
            Marker: function(props) {
              this.clickable = props.clickable,
              this.position = props.position,
              this.marker = props.marker,
              this.clickHandler = props.clickHandler,
              this.map = props.map
              this.icon = props.icon
              this.addListener = jest.fn()
            }
          }
        },
        map: { map: true },
        marker: MARKERS[0],
        googleMapMarkers: MARKERS
      }
    })
    return { wrapper }
  }

  describe('mounted', () => {
    const { wrapper } = setup()

    it('sets googleMarker properly', () => {
      expect(Object.keys(wrapper.vm.googleMarker)).toEqual([
        'clickable',
        'position',
        'marker',
        'clickHandler',
        'map',
        'icon',
        'addListener'
      ])
    })

    it('sets position properly', () => {
      expect(wrapper.vm.googleMarker.position).toEqual({ lat: 10, lng: 20 })
    })

    it('sets clickable properly', () => {
      expect(wrapper.vm.googleMarker.clickable).toEqual(true)
    })

    it('sets marker properly', () => {
      expect(wrapper.vm.googleMarker.marker).toEqual(MARKERS[0])
    })

    it('sets map properly', () => {
      expect(wrapper.vm.googleMarker.map).toEqual({ map: true })
    })

    it('sets icon properly', () => {
      expect(wrapper.vm.googleMarker.icon).toEqual(POINT_MARKER_ICON_CONFIG)
    })
  })
})
