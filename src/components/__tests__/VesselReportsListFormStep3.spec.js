import { mount } from 'vue-test-utils'
import VesselReportsListFormStep3 from '@/components/VesselReportsListFormStep3.vue'
import { rawSecondReport } from '@/../test/stubs/report'

describe('VesselReportsListFormStep3.vue', () => {
  // eslint-disable-next-line no-unused-vars
  const setup = (step = 3, reportDataValidations = reportDataValidationsDefault) => {
    const mocks = {
      $v: {
        reportData: reportDataValidations
      }
    }

    const wrapper = mount(VesselReportsListFormStep3, {
      mocks,
      propsData: {
        reportData: rawSecondReport,
        showErrors: false
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with proper header in first section', () => {
      expect(wrapper.find('[data-test-vessel-reports-list-form-step-three-section-one-header]').text()).toEqual('Remaining on board')
    })

    test('with foRob input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-three-fo-rob-input]')).toHaveLength(1)
    })

    test('with doRob input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-three-do-rob-input]')).toHaveLength(1)
    })

    test('with fwRob input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-three-fw-rob-input]')).toHaveLength(1)
    })

    test('with proper header in second section', () => {
      expect(wrapper.find('[data-test-vessel-reports-list-form-step-three-section-two-header]').text()).toEqual('Other')
    })

    test('with pob input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-three-pob-input]')).toHaveLength(1)
    })

    test('with pitch input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-three-pitch-input]')).toHaveLength(1)
    })


    test('with roll input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-three-roll-input]')).toHaveLength(1)
    })

    test('with continue button', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-next-step-button]')).toHaveLength(1)
    })

    test('with back button', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-previous-step-button]')).toHaveLength(1)
    })
  })

  describe('Methods', () => {
    it('previousStep emits previousStep', () => {
      const { wrapper } = setup()
      wrapper.vm.previousStep()
      expect(wrapper.emitted().previousStep).toBeTruthy()
    })

    it('submit emits submit', () => {
      const { wrapper } = setup()
      wrapper.vm.submit()
      expect(wrapper.emitted().submit).toBeTruthy()
    })
  })
})
