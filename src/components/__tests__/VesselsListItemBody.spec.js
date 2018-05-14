import { shallow } from 'vue-test-utils'
import VesselsListItemBody from '@/components/VesselsListItemBody.vue'

describe('VesselsListItemBody.vue', () => {
  const setup = () => {
    const wrapper = shallow(VesselsListItemBody, {
      propsData: {
        inProgress: false,
        vesselName: 'ENSCO DS-2',
        vesselImoNumber: '123456789'
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with vessel name', () => {
      expect(wrapper.text()).toContain('ENSCO DS-2')
    })

    test('with vessel imo number', () => {
      expect(wrapper.text()).toContain('IMO number: 123456789')
    })
  })
})
