import { shallow } from 'vue-test-utils'
import GoogleMap from '@/components/GoogleMap'

describe('GoogleMap.vue', () => {
  const wrapper = shallow(GoogleMap, {
    propsData: {
      fetchingReports: false
    }
  })

  it('renders GoogleMap when fetchingReports is false', () => {
    expect(wrapper.findAll('[data-test-google-map-placeholder]')).toHaveLength(0)
    expect(wrapper.findAll('[data-test-google-map]')).toHaveLength(1)
  })
})
