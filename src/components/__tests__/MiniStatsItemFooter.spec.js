import { mount } from 'vue-test-utils'
import MiniStatsItemFooter from '@/components/MiniStatsItemFooter'
import IconChange from '@/components/Icons/IconChange'
import BaseIcon from '@/components/BaseIcon'

describe('MiniStatsItemFooter.vue', () => {
  const wrapper = mount(MiniStatsItemFooter, {
    propsData: {
      change: 25,
      unit: 'cbm'
    }
  })

  it('renders BaseIcon component', () => {
    expect(wrapper.findAll(BaseIcon)).toHaveLength(1)
  })

  it('renders proper component inside BaseIcon', () => {
    expect(wrapper.findAll(IconChange)).toHaveLength(1)
  })

  it('renders proper change value', () => {
    expect(wrapper.find('[data-test-mini-stats-item-footer]').text()).toContain('25')
  })

  it('renders proper unit value', () => {
    expect(wrapper.find('[data-test-mini-stats-item-footer]').text()).toContain('cbm')
  })

  it('appends proper color class if value > 0', () => {
    wrapper.setData({ change: 25 })
    expect(wrapper.find('[data-test-mini-stats-item-footer]').classes()).toContain('green')
  })

  it('appends proper rotation class if value > 0', () => {
    wrapper.setData({ change: 25 })
    expect(wrapper.find(BaseIcon).classes()).toContain('more')
  })

  it('appends proper color class if value = 0', () => {
    wrapper.setData({ change: 0 })
    expect(wrapper.find('[data-test-mini-stats-item-footer]').classes()).toContain('black')
  })

  it('appends proper rotation class if value = 0', () => {
    wrapper.setData({ change: 0 })
    expect(wrapper.find(BaseIcon).classes()).not.toContain('less')
    expect(wrapper.find(BaseIcon).classes()).not.toContain('more')
  })

  it('appends proper color class if value < 0', () => {
    wrapper.setData({ change: -25 })
    expect(wrapper.find('[data-test-mini-stats-item-footer]').classes()).toContain('red')
  })

  it('appends proper rotation class if value < 0', () => {
    wrapper.setData({ change: -25 })
    expect(wrapper.find(BaseIcon).classes()).toContain('less')
  })
})
