import { shallow } from 'vue-test-utils'
import VesselStatistics from '@/components/VesselStatistics.vue'

describe('VesselStatistics.vue', () => {
  const setup = () => {
    const wrapper = mount(VesselStatistics)
    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with proper label', () => {
      expect(wrapper.text()).toContain('Statistics')
    })
  })
})
