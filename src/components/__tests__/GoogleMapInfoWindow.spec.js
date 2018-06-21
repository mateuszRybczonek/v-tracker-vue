import { mount } from 'vue-test-utils'
import GoogleMapInfoWindow from '@/components/GoogleMapInfoWindow.vue'
import { report } from '@/../test/stubs/report'
import { decimalToDMS } from '@/utils/coordinates-utils'

const lat = decimalToDMS(report.lat)
const lng = decimalToDMS(report.lng)

describe('GoogleMapInfoWindow.vue', () => {
  const setup = () => {
    const wrapper = mount(GoogleMapInfoWindow, {
      propsData: {
        vesselName: report.vesselName,
        reportTime: report.reportTime,
        lat,
        lng,
        vesselId: report.vesselId
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with proper title', () => {
      expect(wrapper.find('[data-test-google-map-info-window-title]').text()).toContain(report.vesselName)
    })

    test('with reportTime in body', () => {
      expect(wrapper.find('[data-test-google-map-info-window-body]').text()).toContain(report.reportTime)
    })

    test('with lat in body', () => {
      expect(wrapper.find('[data-test-google-map-info-window-body]').text()).toContain(lat)
    })

    test('with lng in body', () => {
      expect(wrapper.find('[data-test-google-map-info-window-body]').text()).toContain(lng)
    })

    test('with lng in body', () => {
      expect(wrapper.findAll('[data-test-google-map-info-window-body-button]').length).toEqual(1)
    })
  })
})
