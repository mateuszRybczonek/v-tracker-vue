import { mount } from 'vue-test-utils'
import VesselReportsListFormStepper from '@/components/VesselReportsListFormStepper.vue'

describe('VesselReportsListFormStepper.vue', () => {
  const setup = (selectedStep = 'step1') => {
    const wrapper = mount(VesselReportsListFormStepper, {
      propsData: {
        selectedStep,
        isSubmitted: false
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    describe('when on step one', () => {
      const { wrapper } = setup()

      test('with proper class on step1 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-one]').classes()).toContain('active')
      })

      test('with proper badge on step1 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-one]').text()).toEqual('Navigation')
      })

      test('with proper class on step2 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-two]').classes()).toContain('disabled')
      })

      test('with proper class on step3 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-three]').classes()).toContain('disabled')
      })
    })

    describe('when on step two', () => {
      const { wrapper } = setup('step2')

      test('with proper class on step1 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-one]').classes()).toContain('completed')
      })

      test('with proper class on step2 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-two]').classes()).toContain('active')
      })

      test('with proper badge on step2 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-two]').text()).toEqual('Weather')
      })

      test('with proper class on step3 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-three]').classes()).toContain('disabled')
      })
    })

    describe('when on step three', () => {
      const { wrapper } = setup('step3')

      test('with proper class on step1 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-one]').classes()).toContain('completed')
      })

      test('with proper class on step2 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-two]').classes()).toContain('completed')
      })

      test('with proper class on step3 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-three]').classes()).toContain('active')
      })

      test('with proper badge on step3 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-three]').text()).toEqual('Other')
      })
    })

    describe('when on step four', () => {
      const { wrapper } = setup('step4')

      test('with proper class on step1 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-one]').classes()).toContain('completed')
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-one]').classes()).toContain('successful')
      })

      test('with proper class on step2 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-two]').classes()).toContain('completed')
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-two]').classes()).toContain('successful')
      })

      test('with proper class on step3 element', () => {
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-three]').classes()).toContain('completed')
        expect(wrapper.find('[data-test-vessel-reports-list-form-stepper-step-three]').classes()).toContain('successful')
      })
    })
  })

  describe('Methods', () => {
    it('selectStep emits selectStep', () => {
      const { wrapper } = setup()
      wrapper.vm.selectStep('step2')
      expect(wrapper.emitted().selectStep).toBeTruthy()
    })
  })
})
