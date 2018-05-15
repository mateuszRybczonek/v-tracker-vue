import { mount } from 'vue-test-utils'
import WeatherSituation from '@/components/WeatherSituation.vue'
import WindFlag from '@/components/WindFlag.vue'
import SeaFlag from '@/components/SeaFlag.vue'
import IconVessel from '@/components/Icons/IconVessel.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { report } from '@/../test/stubs/report'

Object.defineProperty(document, 'getElementById', {
  value: jest.fn().mockReturnValue({
    style: {
      transform: ''
    }
  }
  ),
})

describe('WeatherSituation.vue', () => {
  const setup = () => {
    const wrapper = mount(WeatherSituation, {
      propsData: {
        report
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with BaseIcon component', () => {
      expect(wrapper.findAll(BaseIcon)).toHaveLength(3)
    })

    test('with IconVessel component', () => {
      expect(wrapper.findAll(IconVessel)).toHaveLength(1)
    })

    test('with WindFlag component', () => {
      expect(wrapper.findAll(WindFlag)).toHaveLength(1)

      const windFlag = wrapper.find(WindFlag)
      expect(windFlag.props().speed).toEqual(40)
      expect(windFlag.props().direction).toEqual(100)
      expect(windFlag.props().withBorder).toEqual(false)
    })

    test('with SeaFlag component', () => {
      expect(wrapper.findAll(SeaFlag)).toHaveLength(1)

      const seaFlag = wrapper.find(SeaFlag)
      expect(seaFlag.props().height).toEqual(4)
      expect(seaFlag.props().direction).toEqual(100)
      expect(seaFlag.props().withBorder).toEqual(false)
    })
  })

  describe('setSituation method', () => {
    const { wrapper } = setup()
    wrapper.vm.setSituation()

    it('sets proper transform on wind flag wrapper', () => {
      expect(document.getElementById('weather-situation__wind-flag-wrapper').style.transform)
        .toEqual('rotate(90deg)')
    })

    it('sets proper transform on sea flag wrapper', () => {
      expect(document.getElementById('weather-situation__sea-flag-wrapper').style.transform)
        .toEqual('rotate(90deg)')
    })

    it('sets proper transform on vessel wrapper', () => {
      expect(document.getElementById('weather-situation__vessel-wrapper').style.transform)
        .toEqual('rotate(90deg)')
    })
  })
})
