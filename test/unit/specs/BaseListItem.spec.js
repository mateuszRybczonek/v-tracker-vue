import { shallow } from 'vue-test-utils'
import BaseListItem from '@/components/BaseListItem'

describe('BaseListItem.vue', () => {
  const wrapper = shallow(BaseListItem, {
    slots: {
      default: '<div data-test-fake-slot></div>'
    }
  })

  it('should render correct content', () => {
    expect(wrapper.findAll('[data-test-base-list-item]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test-fake-slot]')).toHaveLength(1)
  })
})
