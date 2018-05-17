import { mount } from 'vue-test-utils'
import VesselReportsListFormStep3 from '@/components/VesselReportsListFormStep3.vue'
import { rawSecondReport } from '@/../test/stubs/report'

const reportDataValidationsDefault = {
  foRob: {
    $invalid: false
  },
  doRob: {
    $invalid: false
  },
  fwRob: {
    $invalid: false
  },
  pob: {
    $invalid: false
  },
  pitch: {
    $invalid: false
  },
  roll: {
    $invalid: false
  }
}

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

  describe('Computed', () => {
    it('invalidStep returns true if all valid', () => {
      const { wrapper } = setup()

      expect(wrapper.vm.invalidStep).toEqual(false)
    })

    const invalidFoRob = { foRob: { $invalid: true }, doRob: { $invalid: false }, fwRob: { $invalid: false }, pob: { $invalid: false }, pitch: { $invalid: false }, roll: { $invalid: false } }

    it('invalidStep returns true if foRob is invalid', () => {
      const { wrapper } = setup(3, invalidFoRob)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidDoRob = { foRob: { $invalid: false }, doRob: { $invalid: true }, fwRob: { $invalid: false }, pob: { $invalid: false }, pitch: { $invalid: false }, roll: { $invalid: false } }

    it('invalidStep returns true if doRob is invalid', () => {
      const { wrapper } = setup(3, invalidDoRob)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidFwRob = { foRob: { $invalid: false }, doRob: { $invalid: false }, fwRob: { $invalid: true }, pob: { $invalid: false }, pitch: { $invalid: false }, roll: { $invalid: false } }

    it('invalidStep returns true if fwRob is invalid', () => {
      const { wrapper } = setup(3, invalidFwRob)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidPob = { foRob: { $invalid: false }, doRob: { $invalid: false }, fwRob: { $invalid: false }, pob: { $invalid: true }, pitch: { $invalid: false }, roll: { $invalid: false } }

    it('invalidStep returns true if pob is invalid', () => {
      const { wrapper } = setup(3, invalidPob)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidPitch = { foRob: { $invalid: false }, doRob: { $invalid: false }, fwRob: { $invalid: false }, pob: { $invalid: false }, pitch: { $invalid: true }, roll: { $invalid: false } }

    it('invalidStep returns true if pitch is invalid', () => {
      const { wrapper } = setup(3, invalidPitch)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidRoll = { foRob: { $invalid: false }, doRob: { $invalid: false }, fwRob: { $invalid: false }, pob: { $invalid: false }, pitch: { $invalid: false }, roll: { $invalid: true } }

    it('invalidStep returns true if roll is invalid', () => {
      const { wrapper } = setup(3, invalidRoll)

      expect(wrapper.vm.invalidStep).toEqual(true)
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
