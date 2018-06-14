import { mount, createLocalVue } from 'vue-test-utils'
import EditVesselPage from '@/pages/EditVesselPage.vue'
import FormWrapper from '@/components/FormWrapper.vue'
import ButtonPositive from '@/components/ButtonPositive.vue'
import Vuex from 'vuex'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

const editVesselSpy = jest.fn()
const routerPushSpy = jest.fn()

describe('EditVesselPage.vue', () => {
  const setup = () => {
    const getters = {
      vessels: jest.fn()
    }

    getters.vessels.mockReturnValue([firstVessel, secondVessel])

    const actions = {
      editVessel: editVesselSpy
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {
        auth: {
          userId: '1234'
        }
      },
      actions,
      getters
    })

    const route = {
      params: {
        id: '1'
      }
    }

    const router = {
      push: routerPushSpy,
    }

    const mocks = {
      $v: {
        $invalid: false,
        vessel: {
          name: {
            $invalid: false
          },
          imoNumber: {
            $invalid: false
          },
          mmsi: {
            $invalid: false
          },
          gt: {
            $invalid: false
          },
          yob: {
            $invalid: false
          },
          flag: {
            $invalid: false
          },
          maxFo: {
            $invalid: false
          },
          maxDo: {
            $invalid: false
          },
          maxFw: {
            $invalid: false
          }
        }
      }
    }

    const wrapper = mount(EditVesselPage, {
      localVue,
      store,
      mocks,
      beforeCreate: function () {
        this._route = route
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
      expect(formWrapper.props().title).toEqual('Edit vessel details')
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

  describe('when clicked on update button', () => {
    const { wrapper } = setup()
    const expectedFormData = {
      flag: 'Marshall Islands',
      gt: '47000',
      id: '1',
      imoNumber: '123456789',
      mmsi: '987654321',
      name: 'ENSCO DS-2',
      owners: {
        '1234': true
      },
      yob: '1997',
      maxDo: '650',
      maxFo: '0',
      maxFw: '660'
    }

    wrapper.find(ButtonPositive).trigger('click')

    it('calls editVessel method with proper argument', () => {
      expect(editVesselSpy.mock.calls[0][1]).toEqual(expectedFormData)
    })

    it('sets isSubmitted to true', () => {
      expect(wrapper.vm.isSubmitted).toEqual(true)
    })
  })

  test('created hook set proper vessel', () => {
    const { wrapper } = setup()
    expect(wrapper.vm.vessel).toEqual(firstVessel)
  })
})
