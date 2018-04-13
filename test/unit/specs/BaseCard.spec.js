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

  it('renders passed slot content', () => {
    expect(wrapper.findAll('[data-test-fake-slot]')).toHaveLength(1)
  })
})
