import { mount } from 'vue-test-utils'
import ReportSelector from '@/components/ReportSelector'
import CalendarCard from '@/components/CalendarCard'
import { Carousel, Slide } from 'vue-carousel'
import { report, secondReport } from '@/../test/stubs/report'

describe('ReportSelector.vue', () => {
  const wrapper = mount(ReportSelector, {
    propsData: {
      reports: [report, secondReport],
      fetchingReports: false
    }
  })

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
