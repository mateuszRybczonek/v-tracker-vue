import { mount } from 'vue-test-utils'
import GoogleMapInfoWindow from '@/components/GoogleMapInfoWindow.vue'
import { report } from '@/../test/stubs/report'

const goToVesselDetailsSpy = jest.fn()

describe('GoogleMapInfoWindow.vue', () => {
  const setup = () => {
    const wrapper = mount(GoogleMapInfoWindow, {
      propsData: {
        vesselName: report.vesselName,
        reportTime: report.reportTime,
        lat: report.lat,
        lng: report.lng,
        vesselId: report.vesselId
      },
      methods: {
        goToVesselDetails() { goToVesselDetailsSpy }
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with proper title title', () => {
      expect(wrapper.find('[data-test-google-map-info-window-title]').text()).toContain(report.vesselName)
    })
  })


  test('calls goToVesselDetailsSpy method when clicked on a buttom', () => {
    const { wrapper } = setup()

    wrapper.find('[data-test-google-map-info-window-body-button]').trigger('click')
    expect(goToVesselDetailsSpy).toHaveBeenCalled()
  })
})
