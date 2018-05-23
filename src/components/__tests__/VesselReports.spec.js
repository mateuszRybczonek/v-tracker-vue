import { shallow, createLocalVue } from 'vue-test-utils'
import VesselReports from '@/components/VesselReports.vue'
import VesselReportsList from '@/components/VesselReportsList.vue'
import { report, secondReport } from '@/../test/stubs/report'
import Vuex from 'vuex'

describe('VesselReports.vue', () => {
  const setup = () => {
    const getters = {
      sortedReports: jest.fn()
    }

    getters.sortedReports.mockReturnValue([secondReport, report])

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      getters
    })

    const wrapper = shallow(VesselReports, {
      localVue,
      store
    })

    return { wrapper }
  }

  test('renders VesselReportsList component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(VesselReportsList)).toHaveLength(1)
  })
})
