import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import CalendarCard from '@/components/CalendarCard'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import { report } from '@/../test/stubs/report'

describe('CalendarCard.vue', () => {
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

    const wrapper = shallow(CalendarCard, {
      localVue,
      store,
      propsData: {
        report
      }
    })

    return { wrapper }
  }

  const { wrapper } = setup()

  it('renders correct month', () => {
    expect(wrapper.find('[data-test-calendar-card]').text()).toContain('Feb')
  })

  it('renders correct day of month', () => {
    expect(wrapper.find('[data-test-calendar-card]').text()).toContain('10')
  })

  it('renders correct day of week', () => {
    expect(wrapper.find('[data-test-calendar-card]').text()).toContain('Saturday')
  })

  it('appends correct class when presentReportSelected is true', () => {
    expect(wrapper.find('[data-test-calendar-card]').classes()).toContain('calendar-card--selected')
  })
})
