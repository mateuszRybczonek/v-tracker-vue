import { shallow } from 'vue-test-utils'
import VesselReports from '@/components/VesselReports.vue'
import VesselReportsList from '@/components/VesselReportsList.vue'
import { report, secondReport } from '@/../test/stubs/report'

describe('VesselReports.vue', () => {
  const setup = () => {
    const wrapper = shallow(VesselReports, {
      propsData: {
        componentProps: {
          last14Reports: [report, secondReport]
        }
      }
    })

    return { wrapper }
  }

  test('renders VesselReportsList component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(VesselReportsList)).toHaveLength(1)
  })
})
