import { shallow } from 'vue-test-utils'
import { MARKERS } from '@/../test/stubs/googleMap'
import GoogleMapMarker from '@/components/GoogleMapMarker'
import { POINT_MARKER_ICON_CONFIG } from '@/constants/mapSettings'

const setOpacitySpy = jest.fn()

describe('GoogleMapMarker.vue', () => {
  const setup = () => {
    const wrapper = shallow(GoogleMapMarker, {
      propsData: {
        google: {
          maps: {
            Marker: function(props) {
              this.clickable = props.clickable
              this.position = props.position
              this.marker = props.marker
              this.clickHandler = props.clickHandler
              this.map = props.map
              this.icon = props.icon
              this.addListener = jest.fn()
              this.setOpacity = setOpacitySpy
            }
          }
        },
        map: { map: true },
        marker: MARKERS[0],
        googleMapMarkers: MARKERS,
        pulse: true
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
        'addListener',
        'setOpacity'
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

  describe('Methods', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('fadeInMarker calls setOpacity with proper value when going UP', () => {
      const { wrapper } = setup(true)
      wrapper.vm.fadeInMarker(wrapper.vm.googleMarker, 0.9, 'UP')

      expect(setOpacitySpy).toHaveBeenLastCalledWith(0.9)
      jest.runTimersToTime(51)
      expect(setOpacitySpy).toHaveBeenLastCalledWith(0.93)
      jest.runTimersToTime(101)
    })

    it('fadeInMarker calls setOpacity with proper value when going DOWN', () => {
      const { wrapper } = setup(true)
      wrapper.vm.fadeInMarker(wrapper.vm.googleMarker, 0.9, 'DOWN')

      expect(setOpacitySpy).toHaveBeenLastCalledWith(0.9)
      jest.runTimersToTime(51)
      expect(setOpacitySpy).toHaveBeenLastCalledWith(0.87)
    })

    it('fadeInMarker calls setOpacity with proper value when reaches the pivot point', () => {
      const { wrapper } = setup(true)
      wrapper.vm.fadeInMarker(wrapper.vm.googleMarker, 0.9, 'UP')

      expect(setOpacitySpy).toHaveBeenLastCalledWith(0.9)
      jest.runTimersToTime(51)
      expect(setOpacitySpy).toHaveBeenLastCalledWith(0.93)
      jest.runTimersToTime(101)
      expect(setOpacitySpy).toHaveBeenLastCalledWith(0.9900000000000001)
      jest.runTimersToTime(151)
      expect(setOpacitySpy).toHaveBeenLastCalledWith(0.99)
      jest.runTimersToTime(201)
      expect(setOpacitySpy).toHaveBeenLastCalledWith(0.8699999999999999)
    })
  })
})
