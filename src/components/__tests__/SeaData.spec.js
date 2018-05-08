import { shallow } from 'vue-test-utils'
import SeaData from '@/components/SeaData'
import SeaFlag from '@/components/SeaFlag'
import BaseList from '@/components/BaseList'

describe('SeaData.vue', () => {
  const wrapper = shallow(SeaData, {
    propsData: {
      seaData: [
        {
          title: "Sea state",
          value: "2"
        }, {
          title: "Swell direction",
          value: "100°"
        }, {
          title:"Swell height",
          value:"4.0 m"
        }
      ],
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
  })
})
