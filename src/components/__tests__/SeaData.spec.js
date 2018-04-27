import { shallow } from 'vue-test-utils'
import SeaData from '@/components/SeaData'
import SeaFlag from '@/components/SeaFlag'
import BaseList from '@/components/BaseList'

describe('SeaData.vue', () => {
  const wrapper = shallow(SeaData, {
    propsData: {
      seaData: {
        swellHeight: 3,
        swellDir: 300
      },
      swellHeightProp: 3,
      swellDirProp: 300
    }
  })

  it('renders SeaFlag component', () => {
    expect(wrapper.findAll(SeaFlag)).toHaveLength(1)
  })

  it('renders BaseList component', () => {
    expect(wrapper.findAll(BaseList)).toHaveLength(1)
  })

  describe('Computed properties', () => {
    it('swellHeight returns proper data', () => {
      const expectedResult = 3
      expect(wrapper.vm.swellHeight).toEqual(expectedResult)
    }),

    it('swellDir returns proper data', () => {
      const expectedResult = 300
      expect(wrapper.vm.swellDir).toEqual(expectedResult)
    })

    wrapper.setData({
      swellHeightProp: null,
      swellDirProp: null
    })

    it('swellHeight returns proper data', () => {
      const expectedResult = 3
      expect(wrapper.vm.swellHeight).toEqual(expectedResult)
    }),

    it('swellDir returns proper data', () => {
      const expectedResult = 300
      expect(wrapper.vm.swellDir).toEqual(expectedResult)
    })
  })
})
