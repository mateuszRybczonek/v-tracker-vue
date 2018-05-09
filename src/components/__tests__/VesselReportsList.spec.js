import { shallow } from 'vue-test-utils'
import VesselReportsList from '@/components/VesselReportsList.vue'
import VesselReportsListItemNew from '@/components/VesselReportsListItemNew.vue'
import VesselReportsListForm from '@/components/VesselReportsListForm.vue'
import VesselReportsListItem from '@/components/VesselReportsListItem.vue'
import { report, secondReport } from '@/../test/stubs/report'

describe('VesselReportsList.vue', () => {
  const setup = () => {
    const wrapper = shallow(VesselReportsList, {
      propsData: {
        reports: [report, secondReport]
      }
    })

    return { wrapper }
  }

  describe('when showNewReportForm is false it', () => {
    const { wrapper } = setup()

    test('renders proper header', () => {
      expect(wrapper.find('[data-test-vessel-reports-list-header]').text()).toContain('Reports')
    })

    test('does not render VesselReportsListForm', () => {
      expect(wrapper.findAll(VesselReportsListForm)).toHaveLength(0)
    })

    test('renders VesselReportsListItemNew', () => {
      expect(wrapper.findAll(VesselReportsListItemNew)).toHaveLength(1)
    })

    test('renders VesselReportsListItem', () => {
      expect(wrapper.findAll(VesselReportsListItem)).toHaveLength(2)
    })
  })

  describe('when showNewReportForm is true it', () => {
    const { wrapper } = setup()
    wrapper.setData({ showNewReportForm: true })

    test('renders proper header', () => {
      expect(wrapper.find('[data-test-vessel-reports-list-header]').text()).toContain('New Report')
    })

    test('renders VesselReportsListForm', () => {
      expect(wrapper.findAll(VesselReportsListForm)).toHaveLength(1)
    })

    test('renders VesselReportsListItemNew', () => {
      expect(wrapper.findAll(VesselReportsListItemNew)).toHaveLength(1)
    })

    test('renders VesselReportsListItem', () => {
      expect(wrapper.findAll(VesselReportsListItem)).toHaveLength(2)
    })
  })

  describe('Computed properties', () => {
    describe('title', () => {
      const { wrapper } = setup()
      it('returns proper title when showNewReportForm is false', () => {
        expect(wrapper.vm.title).toEqual('Reports')
      })

      it('returns proper title when showNewReportForm is true', () => {
        wrapper.setData({ showNewReportForm: true })
        expect(wrapper.vm.title).toEqual('New Report')
      })
    })
  })

  describe('Methods', () => {
    it('showNewReportFormAction sets showNewReportForm to true', () => {
      const { wrapper } = setup()
      wrapper.vm.showNewReportFormAction()
      expect(wrapper.vm.showNewReportForm).toEqual(true)
    })

    it('hideReportForm sets showNewReportForm to false', () => {
      const { wrapper } = setup()
      wrapper.vm.hideReportForm()
      expect(wrapper.vm.showNewReportForm).toEqual(false)
    })
  })
})
