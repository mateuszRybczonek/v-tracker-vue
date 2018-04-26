import { shallow } from 'vue-test-utils'
import BaseListItem from '@/components/BaseListItem'

describe('BaseListItem.vue', () => {
  const wrapper = shallow(BaseListItem, {
    slots: {
      default: '<div data-test-fake-slot></div>'
    }
  })

  it('renders passed slot content', () => {
    expect(wrapper.findAll('[data-test-fake-slot]')).toHaveLength(1)
  })
})
