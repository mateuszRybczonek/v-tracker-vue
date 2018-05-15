import { shallow } from 'vue-test-utils'
import WindData from '@/components/WindData.vue'
import WindFlag from '@/components/WindFlag.vue'
import BaseList from '@/components/BaseList.vue'

const windData = [
  {
    title: "Wind direction",
    value: "100°"
  }, {
    title: "Wind speed",
    value: "40 kn"
  }
]

describe('WindData.vue', () => {
  const setup = () => {
    const wrapper = shallow(WindData, {
      propsData: {
        windData,
        windDirProp: 100,
        windSpdProp: 40
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with WindFlag component', () => {
      expect(wrapper.findAll(WindFlag)).toHaveLength(1)

      const windFlag = wrapper.find(WindFlag)
      expect(windFlag.props().speed).toEqual(40)
      expect(windFlag.props().direction).toEqual(100)
      expect(windFlag.props().withBorder).toEqual(true)
    })

    test('with BaseList component', () => {
      expect(wrapper.findAll(BaseList)).toHaveLength(1)

      const baseList = wrapper.find(BaseList)
      expect(baseList.props().items).toEqual(windData)
      expect(baseList.props().size).toEqual('big')
    })
  })

  describe('Computed properties', () => {
    it('windDir return proper value when windDirProp is passed to the component', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.windDir).toEqual(100)
    })

    it('windSpd return proper value', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.windSpd).toEqual(40)
    })
  })
})
