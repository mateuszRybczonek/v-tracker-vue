import { mount } from 'vue-test-utils'
import NavigationData from '@/components/NavigationData'
import BaseBadge from '@/components/BaseBadge'
import BaseList from '@/components/BaseList'
import { report } from '@/../test/stubs/report'

describe('NavigationData.vue', () => {
  const wrapper = mount(NavigationData, {
    propsData: {
      report,
      fetchingReports: false,
      distanceMadeSinceLastReport: 120
    }
  })

  it('renders BaseBadge component', () => {
    expect(wrapper.findAll(BaseBadge)).toHaveLength(1)
  })

  it('renders BaseList component', () => {
    expect(wrapper.findAll(BaseList)).toHaveLength(1)
  })

  it('renders proper number of items', () => {
    expect(wrapper.findAll('[data-test-base-list-item]')).toHaveLength(3)
  })

  it('contains Course item', () => {
    expect(wrapper.text()).toContain('90°')
  })

  it('contains Speed item', () => {
    expect(wrapper.text()).toContain('12 kn')
  })

  it('contains Distance made since last report value', () => {
    expect(wrapper.text()).toContain('120 Nm')
  })
})
