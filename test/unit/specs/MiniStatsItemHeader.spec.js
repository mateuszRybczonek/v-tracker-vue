import { mount } from 'vue-test-utils'
import MiniStatsItemHeader from '@/components/MiniStatsItemHeader'
import IconFuel from '@/components/Icons/IconFuel'
import BaseIcon from '@/components/BaseIcon'

describe('MiniStatsItemHeader.vue', () => {
  const wrapper = mount(MiniStatsItemHeader, {
    propsData: {
      icon: 'IconFuel',
      description: 'Fuel Oil'
    }
  })

  it('renders BaseIcon component', () => {
    expect(wrapper.findAll(BaseIcon)).toHaveLength(1)
  })

  it('renders proper component inside BaseIcon', () => {
    expect(wrapper.findAll(IconFuel)).toHaveLength(1)
  })

  it('renders proper description', () => {
    expect(wrapper.find('[data-test-mini-stats-item-header]').text()).toContain('Fuel Oil')
  })
})
