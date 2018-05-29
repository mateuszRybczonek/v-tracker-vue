import { mount, createLocalVue } from 'vue-test-utils'
import ReportSelector from '@/components/ReportSelector'
import { report, secondReport } from '@/../test/stubs/report'
import Vuex from 'vuex'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import ReportSelectorPoint from '@/components/ReportSelectorPoint.vue'

const selectReportSpy = jest.fn()

describe('ReportSelector.vue', () => {
  const setup = () => {
    const getters = {
      selectedReport: jest.fn()
    }

    const actions = {
      selectReport: selectReportSpy
    }

    getters.selectedReport.mockReturnValue(report)

    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueMomentJS, moment)

    const store = new Vuex.Store({
      state: {},
      getters,
      actions
    })

    const wrapper = mount(ReportSelector, {
      localVue,
      store,
      propsData: {
        reports: [report, secondReport],
        fetchingReports: false
      }
    })

    return { wrapper }
  }

  test('renders proper number of ReportSelectorPoint components', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(ReportSelectorPoint).length).toEqual(2)
  })

  test('calls selectReport actions when clicked on a ReportSelectorPoint component', () => {
    const { wrapper } = setup()
    wrapper.find(ReportSelectorPoint).trigger('click')
    expect(selectReportSpy).toHaveBeenCalled()
  })
})
