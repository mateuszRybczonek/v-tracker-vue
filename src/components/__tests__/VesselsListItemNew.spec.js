import { mount } from 'vue-test-utils'
import VesselsListItemNew from '@/components/VesselsListItemNew.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import IconTilesPlus from '@/components/Icons/IconTilesPlus.vue'

describe('VesselsListItemNew.vue', () => {
  const setup = () => {
    const wrapper = mount(VesselsListItemNew)
    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with BaseCard component', () => {
      expect(wrapper.findAll(BaseCard)).toHaveLength(1)
      expect(wrapper.find(BaseCard).props().to).toEqual('/dashboard/vessels/new')
    })

    test('with BaseIcon component', () => {
      expect(wrapper.findAll(BaseIcon)).toHaveLength(1)
      expect(wrapper.find(BaseIcon).props().iconColor).toEqual('#999')
      expect(wrapper.find(BaseIcon).props().width).toEqual('200')
      expect(wrapper.find(BaseIcon).props().height).toEqual('200')
    })

    test('with IconTilesPlus component', () => {
      expect(wrapper.findAll(IconTilesPlus)).toHaveLength(1)
    })

    test('with proper label', () => {
      expect(wrapper.text()).toContain('Add new vessel')
    })
  })
})
