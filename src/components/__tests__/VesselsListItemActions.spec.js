import { mount } from 'vue-test-utils'
import VesselsListItemActions from '@/components/VesselsListItemActions.vue'
import IconPencil from '@/components/Icons/IconPencil.vue'
import IconTrash from '@/components/Icons/IconTrash.vue'
import { taskSpy } from '@/../test/stubs/task'

describe('VesselsListItemActions.vue', () => {
  const deleteVesselTaskSpy = taskSpy()

  const setup = () => {
    const wrapper = mount(VesselsListItemActions, {
      propsData: {
        vesselId: '99',
        deleteVesselTask: deleteVesselTaskSpy
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
    expect(deleteVesselTaskSpy.run).toHaveBeenCalled()
  })

  describe('Computed properties', () => {
    it('editLink return proper link', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.editLink).toEqual('/dashboard/vessels/99/edit')
    })
  })
})
