import { mount } from 'vue-test-utils'
import MiniStatsItemBody from '@/components/MiniStatsItemBody'
import IconFuel from '@/components/Icons/IconFuel'
import BaseIcon from '@/components/BaseIcon'
import { miniStatsItem } from '../../stubs/miniStatsItem'

describe('MiniStatsItemBody.vue', () => {
  const wrapper = mount(MiniStatsItemBody, {
    propsData: {
      item: miniStatsItem
    }
  })

  it('appends proper color class to the component', () => {
    expect(wrapper.find('[data-test-mini-stats-item-body]').classes()).toContain('black')
  })

  it('renders BaseIcon component', () => {
    expect(wrapper.findAll(BaseIcon)).toHaveLength(1)
  })

  it('renders proper component inside BaseIcon', () => {
    expect(wrapper.findAll(IconFuel)).toHaveLength(1)
  })

  it('renders proper description header', () => {
    expect(wrapper.find('[data-test-mini-stats-item-body-description]').text()).toContain('90')
  })

  it('renders proper description text', () => {
    expect(wrapper.find('[data-test-mini-stats-item-body-description]').text()).toContain('cbm')
  })
})
