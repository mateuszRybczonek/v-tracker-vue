import { mount, createLocalVue } from 'vue-test-utils'
import NewVesselPage from '@/pages/NewVesselPage.vue'
import FormWrapper from '@/components/FormWrapper.vue'
import ButtonPositive from '@/components/ButtonPositive.vue'
import Vuex from 'vuex'
import { firstVessel } from '@/../test/stubs/vessel'

const createNewVesselSpy = jest.fn()
const routerPushSpy = jest.fn()

describe('NewVesselPage.vue', () => {
  const setup = () => {
    const actions = {
      createNewVessel: createNewVesselSpy
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

    const router = {
      push: routerPushSpy
    }

    const mocks = {
      $v: {
        $invalid: false
      }
    }

    const wrapper = mount(NewVesselPage, {
      localVue,
      store,
      mocks,
      beforeCreate: function () {
        this._router = router
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with FormWrapper component', () => {
      expect(wrapper.findAll(FormWrapper)).toHaveLength(1)
      const formWrapper = wrapper.find(FormWrapper)
      expect(formWrapper.props().title).toEqual('Create new vessel')
      expect(formWrapper.props().size).toEqual('narrow')
    })

    test('with vessel name input', () => {
      expect(wrapper.findAll('[data-test-edit-vessel-form-name-input]')).toHaveLength(1)
    })

    test('with vessel imo input', () => {
      expect(wrapper.findAll('[data-test-edit-vessel-form-imo-input]')).toHaveLength(1)
    })

    test('with vessel callsign input', () => {
      expect(wrapper.findAll('[data-test-edit-vessel-form-callsign-input]')).toHaveLength(1)
    })

    test('with vessel mmsi input', () => {
      expect(wrapper.findAll('[data-test-edit-vessel-form-mmsi-input]')).toHaveLength(1)
    })

    test('with vessel gt input', () => {
      expect(wrapper.findAll('[data-test-edit-vessel-form-gt-input]')).toHaveLength(1)
    })

    test('with vessel yob input', () => {
      expect(wrapper.findAll('[data-test-edit-vessel-form-yob-input]')).toHaveLength(1)
    })

    test('with vessel flag input', () => {
      expect(wrapper.findAll('[data-test-edit-vessel-form-flag-input]')).toHaveLength(1)
    })

    test('with update vessel button', () => {
      expect(wrapper.findAll(ButtonPositive)).toHaveLength(1)
      const updateButton = wrapper.find(ButtonPositive)
      expect(updateButton.props().inProgress).toEqual(false)
    })
  })

  describe('when clicked on create new vessel button', () => {
    const { wrapper } = setup()

    wrapper.setData({
      vessel: firstVessel
    })

    const expectedFormData = {
      flag: 'Marshall Islands',
      gt: '47000',
      imoNumber: '123456789',
      mmsi: '987654321',
      name: 'ENSCO DS-2',
      owner: '1234',
      reports: [],
      yob: '1997'
    }

    wrapper.find(ButtonPositive).trigger('click')

    it('calls createNewVessel method with proper argument', () => {
      expect(createNewVesselSpy.mock.calls[0][1]).toEqual(expectedFormData)
    })

    it('sets isSubmitted to true', () => {
      expect(wrapper.vm.isSubmitted).toEqual(true)
    })
  })
})
