import { mount } from 'vue-test-utils'
import VesselReportsListItemNew from '@/components/VesselReportsListItemNew.vue'
import BaseListItem from '@/components/BaseListItem.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import IconTilesPlus from '@/components/Icons/IconTilesPlus.vue'

const showNewReportFormActionSpy = jest.fn()

describe('VesselReportsListItemNew.vue', () => {
  const setup = () => {
    const wrapper = mount(VesselReportsListItemNew, {
      propsData: {
        showNewReportFormAction: showNewReportFormActionSpy
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with BaseListItem component', () => {
      expect(wrapper.findAll(BaseListItem)).toHaveLength(1)
    })

    test('with BaseIcon component', () => {
      expect(wrapper.findAll(BaseIcon)).toHaveLength(1)
    })

    test('with IconTilesPlus component', () => {
      expect(wrapper.findAll(IconTilesPlus)).toHaveLength(1)
    })

    test('with proper content', () => {
      expect(wrapper.find(BaseListItem).text()).toContain('Add new report')
    })
  })
})
