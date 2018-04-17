import { mount } from 'vue-test-utils'
import NavigationData from '@/components/NavigationData'
import BaseBadge from '@/components/BaseBadge'
import BaseList from '@/components/BaseList'
import { report } from '@/../test/stubs/report'

describe('NavigationData.vue', () => {
  const wrapper = mount(NavigationData, {
    propsData: {
      report,
      fetchingReports: false
    }
  })

  it('renders BaseBadge component', () => {
    expect(wrapper.findAll(BaseBadge)).toHaveLength(1)
  })

  it('renders BaseList component', () => {
    expect(wrapper.findAll(BaseList)).toHaveLength(1)
  })
})
