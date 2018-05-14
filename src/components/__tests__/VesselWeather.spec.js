import { shallow } from 'vue-test-utils'
import VesselWeather from '@/components/VesselWeather.vue'

describe('VesselWeather.vue', () => {
  const setup = () => {
    const wrapper = shallow(VesselWeather)
    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with proper label', () => {
      expect(wrapper.text()).toContain('Weather')
    })
  })
})
