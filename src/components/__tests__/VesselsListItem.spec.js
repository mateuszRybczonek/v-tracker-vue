import { mount } from 'vue-test-utils'
import VesselsListItem from '@/components/VesselsListItem.vue'
import BaseCard from '@/components/BaseCard.vue'
import VesselsListItemBody from '@/components/VesselsListItemBody.vue'
import VesselsListItemActions from '@/components/VesselsListItemActions.vue'
import { firstVessel } from '@/../test/stubs/vessel'

describe('VesselsListItem.vue', () => {
  const deleteVesselTaskSpy = (isActive, isResolved) => {
    return {
      isActive,
      isResolved,
      run: jest.fn()
    }
  }

  const setup = (isActive = false, isResolved = false) => {
    const wrapper = mount(VesselsListItem, {
      propsData: {
        vessel: firstVessel
      },
      mocks: {
        deleteVesselTask: deleteVesselTaskSpy(isActive, isResolved)
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    describe('BaseCard', () => {
      test('with proper link', () => {
        const { wrapper } = setup()
        expect(wrapper.find(BaseCard).props().to).toEqual('/dashboard/vessels/1')
      })

      test('without faded class when inProgress is false', () => {
        const { wrapper } = setup()
        expect(wrapper.find(BaseCard).classes()).not.toContain('vessels-list-item--faded')
      })

      test('with faded class when inProgress is true', () => {
        const { wrapper } = setup(true)
        expect(wrapper.find(BaseCard).classes()).toContain('vessels-list-item--faded')
      })
    })

    describe('VesselsListItemBody', () => {
      const { wrapper } = setup()

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
      const { wrapper } = setup()

      test('with proper vesselId prop', () => {
        expect(wrapper.find(VesselsListItemActions).props().vesselId).toEqual('1')
      })
    })

    describe('Computed properties', () => {
      it('inProgress returns proper value', () => {
        const { wrapper } = setup()
        expect(wrapper.vm.inProgress).toEqual(false)
      })
  })
})
