import { mount, createLocalVue } from 'vue-test-utils'
import ReportSelector from '@/components/ReportSelector'
import CalendarCard from '@/components/CalendarCard'
import { Carousel, Slide } from 'vue-carousel'
import { report, secondReport } from '@/../test/stubs/report'
import Vuex from 'vuex'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

describe('ReportSelector.vue', () => {
  const setup = () => {
    const getters = {
      selectedReport: jest.fn()
    }

    getters.selectedReport.mockReturnValue(report)

    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueMomentJS, moment)

    const store = new Vuex.Store({
      state: {},
      getters
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

  const { wrapper } = setup()

  it('renders Carousel component', () => {
    expect(wrapper.findAll(Carousel)).toHaveLength(1)
  })

  it('renders Slide component for each report', () => {
    expect(wrapper.findAll(Slide)).toHaveLength(2)
  })

  it('renders CalendarCard component for each report', () => {
    expect(wrapper.findAll(CalendarCard)).toHaveLength(2)
  })
})
