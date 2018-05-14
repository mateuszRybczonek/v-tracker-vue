import { mount } from 'vue-test-utils'
import VesselsListItem from '@/components/VesselsListItem.vue'
import BaseCard from '@/components/BaseCard.vue'
import VesselsListItemBody from '@/components/VesselsListItemBody.vue'
import VesselsListItemActions from '@/components/VesselsListItemActions.vue'
import { firstVessel } from '@/../test/stubs/vessel'

describe('VesselsListItem.vue', () => {
  const setup = () => {
    const wrapper = mount(VesselsListItem, {
      propsData: {
        vessel: firstVessel
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    describe('BaseCard', () => {
      test('with proper link', () => {
        expect(wrapper.find(BaseCard).props().to).toEqual('/dashboard/vessels/1')
      })

      test('without faded class when inProgress is false', () => {
        expect(wrapper.find(BaseCard).classes()).not.toContain('vessels-list-item--faded')
      })

      test('with faded class when inProgress is true', () => {
        wrapper.setData({ inProgress: true })
        expect(wrapper.find(BaseCard).classes()).toContain('vessels-list-item--faded')
        wrapper.setData({ inProgress: false })
      })
    })

    describe('VesselsListItemBody', () => {
      test('with proper inProgress prop', () => {
        expect(wrapper.find(VesselsListItemBody).props().inProgress).toEqual(false)
      })

      test('with proper vesselName prop', () => {
        expect(wrapper.find(VesselsListItemBody).props().vesselName).toEqual('ENSCO DS-2')
      })

      test('with proper vesselImoNumber prop', () => {
        expect(wrapper.find(VesselsListItemBody).props().vesselImoNumber).toEqual('123456789')
      })
    })

    describe('VesselsListItemActions', () => {
      test('with proper vesselId prop', () => {
        expect(wrapper.find(VesselsListItemActions).props().vesselId).toEqual('1')
      })
    })
  })
})
