import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { report, secondReport } from '@/../test/stubs/report'
import VesselStatistics from '@/components/VesselStatistics.vue'
import LineChartRemainingOnBoard from '@/components/LineChartRemainingOnBoard'

describe('VesselStatistics.vue', () => {
  const setup = () => {
    const getters = {
      sortedReportsDesc: jest.fn()
    }

    getters.sortedReportsDesc.mockReturnValue([secondReport, report])

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      getters
    })

    const wrapper = shallow(VesselStatistics, {
      localVue,
      store,
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with LineChartRemainingOnBoard component', () => {
      expect(wrapper.findAll(LineChartRemainingOnBoard)).toHaveLength(1)
    })
  })
})
