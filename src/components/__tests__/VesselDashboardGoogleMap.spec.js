import { shallow, createLocalVue } from 'vue-test-utils'
import VesselDashboardGoogleMap from '@/components/VesselDashboardGoogleMap'
import Vuex from 'vuex'
import { report, secondReport } from '@/../test/stubs/report'

describe('GoogleMap.vue', () => {
  const setup = () => {

    const getters = {
      reports: jest.fn(),
      sortedReports: jest.fn(),
      fetchingReports: jest.fn()
    }

    getters.reports.mockReturnValue([report, secondReport])
    getters.sortedReports.mockReturnValue([report, secondReport])
    getters.fetchingReports.mockReturnValue(false)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      getters
    })

    const wrapper = shallow(GoogleMap, {
      localVue,
      store
    })

    return { wrapper }
  }

  it('renders GoogleMap when fetchingReports is false', () => {
    const { wrapper } = setup()

    expect(wrapper.findAll('[data-test-google-map-placeholder]')).toHaveLength(0)
    expect(wrapper.findAll('[data-test-google-map]')).toHaveLength(1)
  })
})
