import { shallow } from 'vue-test-utils'
import VesselsList from '@/components/VesselsList.vue'
import VesselsListItem from '@/components/VesselsListItem.vue'
import VesselsListItemNew from '@/components/VesselsListItemNew.vue'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

describe('VesselsList.vue', () => {
  const setup = () => {
    const wrapper = shallow(VesselsList, {
      propsData: {
        vessels: [firstVessel, secondVessel]
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with VesselsListItemNew component', () => {
      expect(wrapper.findAll(VesselsListItemNew)).toHaveLength(1)
    })

    test('with proper number of VesselsListItem component', () => {
      expect(wrapper.findAll(VesselsListItem)).toHaveLength(2)
    })
  })
})
