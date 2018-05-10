import { mount } from 'vue-test-utils'
import VesselReportsListItem from '@/components/VesselReportsListItem.vue'
import AccordionWrapper from '@/components/AccordionWrapper.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import VesselReportsListItemDetails from '@/components/VesselReportsListItemDetails.vue'
import VesselReportsListItemCollapsedBody from '@/components/VesselReportsListItemCollapsedBody.vue'
import { report } from '@/../test/stubs/report'
import { decimalToDMS } from '@/utils/coordinates-utils'


describe('VesselReportsListItem.vue', () => {
  const setup = () => {
    const wrapper = mount(VesselReportsListItem, {
      propsData: {
        report
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with AccordionWrapper', () => {
      expect(wrapper.findAll(AccordionWrapper)).toHaveLength(1)
    })

    test('with BaseBadge', () => {
      expect(wrapper.findAll(BaseBadge)).toHaveLength(1)
    })

    test('with VesselReportsListItemDetails', () => {
      expect(wrapper.findAll(VesselReportsListItemDetails)).toHaveLength(5)
    })

    test('with VesselReportsListItemCollapsedBody', () => {
      expect(wrapper.findAll(VesselReportsListItemCollapsedBody)).toHaveLength(1)
    })
  })

  describe('Computed properties', () => {
    const { wrapper } = setup()

    it('formattedLat returns proper value', () => {
      expect(wrapper.vm.formattedLat).toEqual('12° 20.3\' N')
    })

    it('formattedLng returns proper value', () => {
      expect(wrapper.vm.formattedLng).toEqual('012° 20.4\' E')
    })
  })
})
