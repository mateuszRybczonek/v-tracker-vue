import { shallow } from 'vue-test-utils'
import BaseCard from '@/components/BaseCard'

describe('BaseCard.vue', () => {
  const wrapper = shallow(BaseCard, {
    propsData: {
      to: '/dashboard/vessels'
    },

    slots: {
      default: '<div data-test-fake-slot></div>'
    }
  })

  it('should render correct content', () => {
    expect(wrapper.findAll('[data-test-base-card]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test-fake-slot]')).toHaveLength(1)
  })
})
