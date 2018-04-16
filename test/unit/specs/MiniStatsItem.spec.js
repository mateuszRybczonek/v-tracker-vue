import { mount } from 'vue-test-utils'
import MiniStatsItem from '@/components/MiniStatsItem'
import BaseBadge from '@/components/BaseBadge.vue'
import MiniStatsItemBody from '@/components/MiniStatsItemBody.vue'
import MiniStatsItemFooter from '@/components/MiniStatsItemFooter.vue'
import { miniStatsItem } from '../../stubs/miniStatsItem'

describe('MiniStatsItem.vue', () => {
  const wrapper = mount(MiniStatsItem, {
    propsData: {
      showPlaceholder: false,
      item: miniStatsItem
    }
  })

  it('renders miniStatsItem accordion when fetchingReports is false', () => {
    expect(wrapper.findAll('[data-test-mini-stats-item-placeholder]')).toHaveLength(0)
    expect(wrapper.findAll('[data-test-mini-stats-item-accordion]')).toHaveLength(1)
  })

  it('renders BaseBadge component as header', () => {
    expect(wrapper.findAll(BaseBadge)).toHaveLength(1)
  })

  it('renders MiniStatsItemBody component as body', () => {
    expect(wrapper.findAll(MiniStatsItemBody)).toHaveLength(1)
  })

  it('renders MiniStatsItemFooter component as footer', () => {
    expect(wrapper.findAll(MiniStatsItemFooter)).toHaveLength(1)
  })
})
