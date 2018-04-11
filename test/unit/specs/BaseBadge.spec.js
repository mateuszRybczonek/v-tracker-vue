import { shallow } from 'vue-test-utils'
import BaseBadge from '@/components/BaseBadge'
import BaseIcon from '@/components/BaseIcon'

describe('BaseBadge.vue', () => {
  const wrapper = shallow(BaseBadge, {
    propsData: {
      color: 'blue',
      icon: 'IconWeather',
      title: 'My best badge'
    }
  })

  it('should render correct content', () => {
    expect(wrapper.findAll('[data-test-base-badge]')).toHaveLength(1)

    expect(wrapper.findAll(BaseIcon)).toHaveLength(1)
    expect(wrapper.find('[data-test-base-badge-title]').text()).toContain('My best badge')
  })

  it('should have proper color class added', () => {
    expect(wrapper.findAll('[data-test-base-badge].blue')).toHaveLength(1)
  })
})
