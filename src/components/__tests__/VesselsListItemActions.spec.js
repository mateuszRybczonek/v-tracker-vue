import { mount, createLocalVue } from 'vue-test-utils'
import VesselsListItemActions from '@/components/VesselsListItemActions.vue'
import IconPencil from '@/components/Icons/IconPencil.vue'
import IconTrash from '@/components/Icons/IconTrash.vue'
import Vuex from 'vuex'

const deleteVesselSpy = jest.fn()

describe('VesselsListItemActions.vue', () => {
  const setup = () => {
    const actions = {
      deleteVessel: deleteVesselSpy
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      actions
    })

    const wrapper = mount(VesselsListItemActions, {
      localVue,
      store,
      propsData: {
        vesselId: '99'
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with IconPencil component', () => {
      expect(wrapper.findAll(IconPencil)).toHaveLength(1)
    })

    test('with delete action element', () => {
      expect(wrapper.findAll('[data-test-vessels-list-item-actions-delete]')).toHaveLength(1)
    })

    test('with IconTrash component', () => {
      expect(wrapper.findAll(IconTrash)).toHaveLength(1)
    })
  })

  it('should call deleteVessel method when delete button is clicked', () => {
    const { wrapper } = setup()

    wrapper.find('[data-test-vessels-list-item-actions-delete]').trigger('click')
    expect(deleteVesselSpy).toHaveBeenCalled()
  })

  it('should emit enableInProgress when delete button is clicked', () => {
    const { wrapper } = setup()

    wrapper.find('[data-test-vessels-list-item-actions-delete]').trigger('click')
    expect(wrapper.emitted().enableInProgress).toBeTruthy()
  })

  describe('Computed properties', () => {
    it('editLink return proper link', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.editLink).toEqual('/dashboard/vessels/99/edit')
    })
  })
})
