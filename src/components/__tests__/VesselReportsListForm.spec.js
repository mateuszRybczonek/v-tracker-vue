import { mount, createLocalVue } from 'vue-test-utils'
import VesselReportsListForm from '@/components/VesselReportsListForm.vue'
import FormWrapper from '@/components/FormWrapper.vue'
import VesselReportsListNewStepper from '@/components/VesselReportsListFormStepper.vue'
import Step1 from '@/components/VesselReportsListFormStep1.vue'
import Vuex from 'vuex'
import { taskSpy } from '@/../test/stubs/task'

const createNewReportSpy = jest.fn()
const createNewReportTaskSpy = taskSpy()

describe('VesselReportsListForm.vue', () => {
  const setup = (step = 1) => {
    const actions = {
      createNewReport: createNewReportSpy
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {
        auth: {
          userId: '1234'
        }
      },
      actions
    })

    const mocks = {
      $route: {
        params: {
          id: '1'
        }
      },
      $v: {
        reportData: {
          reportTime: {
            $invalid: false
          },
          lat: {
            $invalid: false
          },
          lng: {
            $invalid: false
          },
          course: {
            $invalid: false
          },
          spd: {
            $invalid: false
          }
        }
      },
      createNewReportTask: createNewReportTaskSpy
    }

    const wrapper = mount(VesselReportsListForm, {
      localVue,
      store,
      mocks
    })

    wrapper.vm.step = step

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with VesselReportsListNewStepper component', () => {
      expect(wrapper.findAll(VesselReportsListNewStepper)).toHaveLength(1)
      const stepper = wrapper.find(VesselReportsListNewStepper)
      expect(stepper.props().selectedStep).toEqual('step1')
      expect(stepper.props().isSubmitted).toEqual(false)
    })

    test('with FormWrapper component', () => {
      expect(wrapper.findAll(FormWrapper)).toHaveLength(1)
      const formWrapper = wrapper.find(FormWrapper)
      expect(formWrapper.props().title).toEqual('Navigation data')
      expect(formWrapper.props().size).toEqual('wide')
      expect(formWrapper.props().color).toEqual('blue')
    })

    test('with Step1 component', () => {
      expect(wrapper.findAll(Step1)).toHaveLength(1)
    })
  })

  describe('Computed properties', () => {
    it('selectedStep returns proper data', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.selectedStep).toEqual('step1')
    })

    it('lastStep returns proper data when not on last step', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.lastStep).toEqual(false)
    })

    it('lastStep returns proper data when on last step', () => {
      const { wrapper } = setup(4)
      expect(wrapper.vm.lastStep).toEqual(true)
    })

    it('isSubmitted returns proper value', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.isSubmitted).toEqual(false)
    })

    it('inProgress returns proper value', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.inProgress).toEqual(false)
    })

    describe('stepTitle', () => {
      it('returns proper title when on step 1', () => {
        const { wrapper } = setup()
        expect(wrapper.vm.stepTitle).toEqual('Navigation data')
      })

      it('returns proper title when on step 1', () => {
        const { wrapper } = setup(2)
        expect(wrapper.vm.stepTitle).toEqual('Weather data')
      })

      it('returns proper title when on step 3', () => {
        const { wrapper } = setup(3)
        expect(wrapper.vm.stepTitle).toEqual('Other data')
      })

      it('returns proper title when on step 4', () => {
        const { wrapper } = setup(4)
        expect(wrapper.vm.stepTitle).toEqual('Success')
      })
    })
  })

  describe('Methods', () => {
    it('nextStep sets showErrors to false and proceeds to next step when not on last step', () => {
      const { wrapper } = setup()
      wrapper.vm.nextStep(false)
      expect(wrapper.vm.showErrors).toEqual(false)
      expect(wrapper.vm.step).toEqual(2)
    })

    it('previousStep sets showErrors to false and go to previous step', () => {
      const { wrapper } = setup(2)
      wrapper.vm.previousStep()
      expect(wrapper.vm.showErrors).toEqual(false)
      expect(wrapper.vm.step).toEqual(1)
    })

    it('selectStep sets step', () => {
      const { wrapper } = setup(2)
      wrapper.vm.selectStep(4)
      expect(wrapper.vm.step).toEqual(4)
    })

    describe('submit', () => {
      it('shows errors and returns early if step is invalid', () => {
        const { wrapper } = setup()
        wrapper.vm.submit(true)
        expect(wrapper.vm.showErrors).toEqual(true)
      })

      describe('when the step is valid', () => {
        const { wrapper } = setup()
        wrapper.vm.submit(false)

        it('does\'t show errors', () => {
          expect(wrapper.vm.showErrors).toEqual(false)
        })

        it('runs createNewReportTask', () => {
          expect(createNewReportTaskSpy.run).toHaveBeenCalled()
        })
      })
    })
  })
})
