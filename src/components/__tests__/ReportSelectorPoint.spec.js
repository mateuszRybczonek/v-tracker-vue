import { shallow, createLocalVue } from 'vue-test-utils'
import ReportSelectorPoint from '@/components/ReportSelectorPoint.vue'
import { report, secondReport } from '@/../test/stubs/report'
import Vuex from 'vuex'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

const selectReportSpy = jest.fn()

describe('ReportSelectorPoint.vue', () => {
  const setup = (selectedReport = report) => {
    const getters = {
      selectedReport: jest.fn()
    }

    const actions = {
      selectReport: selectReportSpy
    }

    getters.selectedReport.mockReturnValue(selectedReport)

    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueMomentJS, moment)

    const store = new Vuex.Store({
      state: {},
      getters,
      actions
    })

    const wrapper = shallow(ReportSelectorPoint, {
      localVue,
      store,
      propsData: {
        report
      }
    })

    return { wrapper }
  }

  test('renders marker line', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll('[data-test-report-selector-point-marker-line]').length).toEqual(1)
  })

  test('renders marker connector', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll('[data-test-report-selector-point-marker-connector]').length).toEqual(1)
  })

  test('renders marker report day', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll('[data-test-report-selector-point-report-day]').length).toEqual(1)
    expect(wrapper.find('[data-test-report-selector-point-report-day]').text()).toContain('10')
  })

  describe('Computed properties', () => {
    describe('presentReportSelected', () => {
      it('returns proper data', () => {
        const { wrapper } = setup()
        expect(wrapper.vm.presentReportSelected).toEqual(true)
      })
    })

    it('reportTime returns proper data', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.reportTime).toEqual("2018-02-10")
    })

    it('reportDay returns proper data', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.reportDay).toEqual("10")
    })
  })
})
