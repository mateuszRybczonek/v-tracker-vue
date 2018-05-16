import { mount, createLocalVue } from 'vue-test-utils'
import VesselReportsListFormStep1 from '@/components/VesselReportsListFormStep1.vue'
import ButtonPositive from '@/components/ButtonPositive.vue'
import InputWithErrors from '@/components/InputWithErrors.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import IconCalendar from '@/components/Icons/IconCalendar.vue'
import IconFi from '@/components/Icons/IconFi.vue'
import IconLambda from '@/components/Icons/IconLambda.vue'
import IconNavigation from '@/components/Icons/IconNavigation.vue'
import IconSpeed from '@/components/Icons/IconSpeed.vue'

const reportData = {
  reportTime: '2017-12-12',
  lat: '12 20.3 N',
  lng: '012 20.4 W',
  course: '123',
  spd: '12',
  windDir: '200',
  windSpd: '14',
  seaState: '2',
  swellDir: '300',
  swellHeight: '2',
  doRob: '100',
  foRob: '90',
  fwRob: '80',
  pob: '67',
  pitch: '1',
  roll: '0.3',
  updatedAt: '',
  vessel: '1',
  createdBy: '1234'
}

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

describe('VesselReportsListForm.vue', () => {
  const setup = (step = 1, reportDataValidations = reportDataValidationsDefault) => {
    const mocks = {
      $v: {
        reportData: reportDataValidations
      }
    }

    const wrapper = mount(VesselReportsListFormStep1, {
      mocks,
      propsData: {
        reportData,
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
      const { wrapper } = setup(1, invalidLng)

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

    it('nextStep emits previousStep', () => {
      const { wrapper } = setup()
      wrapper.vm.nextStep()
      expect(wrapper.emitted().nextStep).toBeTruthy()
    })
  })
})
