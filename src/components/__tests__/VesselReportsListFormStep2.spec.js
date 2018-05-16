import { mount } from 'vue-test-utils'
import VesselReportsListFormStep2 from '@/components/VesselReportsListFormStep2.vue'
import { rawSecondReport } from '@/../test/stubs/report'

const reportDataValidationsDefault = {
  windDir: {
    $invalid: false
  },
  windSpd: {
    $invalid: false
  },
  seaState: {
    $invalid: false
  },
  swellDir: {
    $invalid: false
  },
  swellHeight: {
    $invalid: false
  }
}

describe('VesselReportsListFormStep2.vue', () => {
  // eslint-disable-next-line no-unused-vars
  const setup = (step = 2, reportDataValidations = reportDataValidationsDefault) => {
    const mocks = {
      $v: {
        reportData: reportDataValidations
      }
    }

    const wrapper = mount(VesselReportsListFormStep2, {
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

    test('with proper header', () => {
      expect(wrapper.find('[data-test-vessel-reports-list-form-step-two-header]').text()).toEqual('Wind')
    })

    test('with wind direction input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-two-wind-direction-input]')).toHaveLength(1)
    })

    test('with wind speed input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-two-wind-speed-input]')).toHaveLength(1)
    })

    test('with sea state input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-two-sea-state-input]')).toHaveLength(1)
    })

    test('with swell direction input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-two-swell-direction-input]')).toHaveLength(1)
    })

    test('with swell height input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-two-swell-height-input]')).toHaveLength(1)
    })


    test('with continue button', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-next-step-button]')).toHaveLength(1)
    })

    test('with back button', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-previous-step-button]')).toHaveLength(1)
    })
  })

  describe('Computed', () => {
    it('invalidStep returns true if all valid', () => {
      const { wrapper } = setup()

      expect(wrapper.vm.invalidStep).toEqual(false)
    })

    const invalidWindDir = { windDir: { $invalid: true }, windSpd: { $invalid: false }, seaState: { $invalid: false }, swellDir: { $invalid: false }, swellHeight: { $invalid: false } }

    it('invalidStep returns true if windDir is invalid', () => {
      const { wrapper } = setup(1, invalidWindDir)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidWindSpd = { windDir: { $invalid: false }, windSpd: { $invalid: true }, seaState: { $invalid: false }, swellDir: { $invalid: false }, swellHeight: { $invalid: false } }

    it('invalidStep returns true if windSpd is invalid', () => {
      const { wrapper } = setup(1, invalidWindSpd)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidSeaState = { windDir: { $invalid: false }, windSpd: { $invalid: false }, seaState: { $invalid: true }, swellDir: { $invalid: false }, swellHeight: { $invalid: false } }

    it('invalidStep returns true if seaState is invalid', () => {
      const { wrapper } = setup(1, invalidSeaState)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidSwellDir = { windDir: { $invalid: false }, windSpd: { $invalid: false }, seaState: { $invalid: false }, swellDir: { $invalid: true }, swellHeight: { $invalid: false } }

    it('invalidStep returns true if swellDir is invalid', () => {
      const { wrapper } = setup(1, invalidSwellDir)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidSwellHeight = { windDir: { $invalid: false }, windSpd: { $invalid: false }, seaState: { $invalid: false }, swellDir: { $invalid: false }, swellHeight: { $invalid: true } }

    it('invalidStep returns true if swellHeight is invalid', () => {
      const { wrapper } = setup(1, invalidSwellHeight)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })
  })

  describe('Methods', () => {
    it('previousStep emits previousStep', () => {
      const { wrapper } = setup()
      wrapper.vm.previousStep()
      expect(wrapper.emitted().previousStep).toBeTruthy()
    })

    it('nextStep emits previousStep', () => {
      const { wrapper } = setup()
      wrapper.vm.nextStep()
      expect(wrapper.emitted().nextStep).toBeTruthy()
    })
  })
})
