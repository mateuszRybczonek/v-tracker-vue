import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import CalendarCard from '@/components/CalendarCard'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueMomentJS, moment)

describe('CalendarCard.vue', () => {
  const wrapper = shallow(CalendarCard, {
    localVue,
    computed: {
      selectedReport() { return { id: 1 } }
    },
    propsData: {
      report: {
        id: 1,
        reportTime: "2018-02-10"
      }
    }
  })

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
