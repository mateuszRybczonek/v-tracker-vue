import { mount } from 'vue-test-utils'
import VesselReportsListFormStep1 from '@/components/VesselReportsListFormStep1.vue'
import { rawSecondReport } from '@/../test/stubs/report'

const reportDataValidationsDefault = {
  lat: {
    $invalid: false
  },
  lng: {
    $invalid: false
  },
  reportTime: {
    $invalid: false
  },
  course: {
    $invalid: false
  },
  spd: {
    $invalid: false
  }
}

describe('VesselReportsListFormStep1.vue', () => {
  // eslint-disable-next-line no-unused-vars
  const setup = (step = 1, reportDataValidations = reportDataValidationsDefault) => {
    const mocks = {
      $v: {
        reportData: reportDataValidations
      }
    }

    const wrapper = mount(VesselReportsListFormStep1, {
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
      expect(wrapper.find('[data-test-vessel-reports-list-form-step-one-header]').text()).toEqual('Position')
    })

    test('with report time input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-one-report-time-input]')).toHaveLength(1)
    })

    test('with lat input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-one-report-lat-input]')).toHaveLength(1)
    })

    test('with lng input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-one-report-lng-input]')).toHaveLength(1)
    })

    test('with course input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-one-report-course-input]')).toHaveLength(1)
    })

    test('with speed input', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-step-one-report-spd-input]')).toHaveLength(1)
    })


    test('with continue button', () => {
      expect(wrapper.findAll('[data-test-vessel-reports-list-form-next-step-button]')).toHaveLength(1)
    })
  })

  describe('Computed', () => {
    it('invalidStep returns true if all valid', () => {
      const { wrapper } = setup()

      expect(wrapper.vm.invalidStep).toEqual(false)
    })

    const invalidLat = { lat: { $invalid: true }, lng: { $invalid: false }, reportTime: { $invalid: false }, course: { $invalid: false }, spd: { $invalid: false } }

    it('invalidStep returns true if lat is invalid', () => {
      const { wrapper } = setup(1, invalidLat)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidLng = { lat: { $invalid: false }, lng: { $invalid: true }, reportTime: { $invalid: false }, course: { $invalid: false }, spd: { $invalid: false } }

    it('invalidStep returns true if lng is invalid', () => {
      const { wrapper } = setup(1, invalidLng)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidReportTime = { lat: { $invalid: false }, lng: { $invalid: false }, reportTime: { $invalid: true }, course: { $invalid: false }, spd: { $invalid: false } }

    it('invalidStep returns true if reportTime is invalid', () => {
      const { wrapper } = setup(1, invalidReportTime)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidCourse = { lat: { $invalid: false }, lng: { $invalid: false }, reportTime: { $invalid: false }, course: { $invalid: true }, spd: { $invalid: false } }

    it('invalidStep returns true if course is invalid', () => {
      const { wrapper } = setup(1, invalidCourse)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })

    const invalidSpeed = { lat: { $invalid: false }, lng: { $invalid: false }, reportTime: { $invalid: false }, course: { $invalid: false }, spd: { $invalid: true } }

    it('invalidStep returns true if speed is invalid', () => {
      const { wrapper } = setup(1, invalidSpeed)

      expect(wrapper.vm.invalidStep).toEqual(true)
    })
  })

  describe('Methods', () => {
    it('previousStep emits previousStep', () => {
      const { wrapper } = setup()
      wrapper.vm.previousStep()
      expect(wrapper.emitted().previousStep).toBeTruthy()
    })

    it('nextStep emits nextStep', () => {
      const { wrapper } = setup()
      wrapper.vm.nextStep()
      expect(wrapper.emitted().nextStep).toBeTruthy()
    })
  })
})
