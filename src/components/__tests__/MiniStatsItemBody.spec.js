import { shallow } from 'vue-test-utils'
import MiniStatsItemBody from '@/components/MiniStatsItemBody'
import BaseIcon from '@/components/BaseIcon'
import DoughnutChartRemainingOnBoard from '@/components/DoughnutChartRemainingOnBoard'
import { miniStatsItem, miniStatsItemWithFreeSpace } from '@/../test/stubs/miniStatsItem'

describe('MiniStatsItemBody.vue', () => {
  const setup = (item = miniStatsItem) => {
    const wrapper = shallow(MiniStatsItemBody, {
      propsData: {
        item
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    it('and appends proper color class to the component', () => {
      expect(wrapper.find('[data-test-mini-stats-item-body]').classes()).toContain('black')
    })

    it('with proper description header', () => {
      expect(wrapper.find('[data-test-mini-stats-item-body-description]').text()).toContain('90')
    })

    it('with proper description text', () => {
      expect(wrapper.find('[data-test-mini-stats-item-body-description]').text()).toContain('cbm')
    })
  })

  describe('it renders properly when freeSpace property is not present in item', () => {
    const { wrapper } = setup()

    it('with BaseIcon component', () => {
      expect(wrapper.findAll(BaseIcon)).toHaveLength(1)
    })
  })

  describe('it renders properly when freeSpace property is present in item', () => {
    const { wrapper } = setup(miniStatsItemWithFreeSpace)

    it('renders DoughnutChartRemainingOnBoard component', () => {
      expect(wrapper.findAll(DoughnutChartRemainingOnBoard)).toHaveLength(1)
    })
  })
})
