import { mount, createLocalVue } from 'vue-test-utils'
import VesselReportsListForm from '@/components/VesselReportsListForm.vue'
import FormWrapper from '@/components/FormWrapper.vue'
import VesselReportsListNewStepper from '@/components/VesselReportsListFormStepper.vue'
import Step1 from '@/components/VesselReportsListFormStep1.vue'
import Step2 from '@/components/VesselReportsListFormStep2.vue'
import Step3 from '@/components/VesselReportsListFormStep3.vue'
import Step4 from '@/components/VesselReportsListFormStep4.vue'
import Vuex from 'vuex'

const createNewReportSpy = jest.fn()

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

let originalDateNow

const mockDateNow = () => 1524475888010

beforeEach(() => {
  originalDateNow = Date.now
  Date.now = mockDateNow
})

afterEach(() => {
  Date.now = originalDateNow
})

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
      }
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
      const step1 = wrapper.find(Step1)
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

        it('calls createNewReport', () => {
          expect(createNewReportSpy).toHaveBeenCalled()
        })

        it('proceeds to next step', () => {
          expect(wrapper.vm.step).toEqual(2)
        })
      })
    })
  })
})
