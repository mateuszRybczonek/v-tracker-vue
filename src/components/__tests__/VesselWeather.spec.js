import { shallow, createLocalVue } from 'vue-test-utils'
import { report, secondReport } from '@/../test/stubs/report'
import VesselWeather from '@/components/VesselWeather.vue'
import ReportSelector from '@/components/ReportSelector'
import Vuex from 'vuex'

describe('VesselWeather.vue', () => {
  const setup = () => {
    const getters = {
      selectedReport: jest.fn(),
      sortedReports: jest.fn()
    }

    getters.sortedReports.mockReturnValue([secondReport, report])

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      getters
    })

    const wrapper = shallow(VesselWeather, {
      localVue,
      store,

      computed: {
        selectedReport: () => secondReport,
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    test('with ReportSelector component', () => {
      const { wrapper } = setup()
      expect(wrapper.findAll(ReportSelector)).toHaveLength(1)
    })
  })
})
