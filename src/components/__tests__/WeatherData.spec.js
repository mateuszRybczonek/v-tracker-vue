import { mount } from 'vue-test-utils'
import WeatherData from '@/components/WeatherData.vue'
import AccordionWrapper from '@/components/AccordionWrapper.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import SeaData from '@/components/SeaData.vue'
import WeatherSituation from '@/components/WeatherSituation.vue'
import WindData from '@/components/WindData.vue'
import { report } from '@/../test/stubs/report'

const expectedWindData = [
  {
    title: "Wind direction",
    value: "100°"
  }, {
    title: "Wind speed",
    value: "40 kn"
  }
]

const expectedSeaData = [
  {
    title: "Sea state",
    value: "2"
  }, {
    title: "Swell direction",
    value: "100°"
  }, {
    title: "Swell height",
    value: "4.0 m"
  }
]

describe('WeatherData.vue', () => {
  const setup = () => {
    const wrapper = mount(WeatherData, {
      propsData: {
        report,
        fetchingReports: false
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with AccordionWrapper component', () => {
      expect(wrapper.findAll(AccordionWrapper)).toHaveLength(1)
    })

    test('with BaseBadge component', () => {
      expect(wrapper.findAll(BaseBadge)).toHaveLength(1)
      const baseBadge = wrapper.find(BaseBadge)
      expect(baseBadge.props().title).toEqual('Weather info')
      expect(baseBadge.props().icon).toEqual('IconWeather')
      expect(baseBadge.props().color).toEqual('blue')
    })

    test('with weather body element', () => {
      expect(wrapper.findAll('[data-test-weather-body]')).toHaveLength(1)
    })

    test('with WindData component', () => {
      expect(wrapper.findAll(WindData)).toHaveLength(1)
      const windData = wrapper.find(WindData)

      expect(windData.props().windData).toEqual(expectedWindData)
      expect(windData.props().windDirProp).toEqual(100)
      expect(windData.props().windSpdProp).toEqual(40)
    })

    test('with SeaData component', () => {
      expect(wrapper.findAll(SeaData)).toHaveLength(1)
      const seaData = wrapper.find(SeaData)

      expect(seaData.props().seaData).toEqual(expectedSeaData)
      expect(seaData.props().swellHeightProp).toEqual(4)
      expect(seaData.props().swellDirProp).toEqual(100)
    })

    test('with WeatherSituation component', () => {
      expect(wrapper.findAll(WeatherSituation)).toHaveLength(1)
      expect(wrapper.find(WeatherSituation).props().report).toEqual(report)
    })
  })

  describe('Computed properties', () => {
    const { wrapper } = setup()

    it('windDir return proper data', () => {
      expect(wrapper.vm.windDir).toEqual(report.windDir)
    })

    it('windSpd return proper data', () => {
      expect(wrapper.vm.windSpd).toEqual(report.windSpd)
    })

    it('seaState return proper data', () => {
      expect(wrapper.vm.seaState).toEqual(report.seaState)
    })

    it('swellDir return proper data', () => {
      expect(wrapper.vm.swellDir).toEqual(report.swellDir)
    })

    it('swellHeight return proper data', () => {
      expect(wrapper.vm.swellHeight).toEqual(report.swellHeight)
    })

    it('windData return proper data', () => {
      expect(wrapper.vm.windData).toEqual(expectedWindData)
    })

    it('seaData return proper data', () => {
      expect(wrapper.vm.seaData).toEqual(expectedSeaData)
    })
  })
})
