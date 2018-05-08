import { shallow, createLocalVue } from 'vue-test-utils'
import TheSidebarHeader from '@/components/TheSidebarHeader.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import IconPencil from '@/components/Icons/IconPencil.vue'
import Vuex from 'vuex'
import { firstVessel } from '@/../test/stubs/vessel'

const toggleSidebarSpy = jest.fn()

describe('TheSidebarHeader.vue', () => {
  const setup = sidebarVisible => {
    const getters = {
      sidebarVisible: jest.fn()
    }

    const actions = {
      toggleSidebar: toggleSidebarSpy
    }

    getters.sidebarVisible.mockReturnValue(sidebarVisible)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      getters,
      actions
    })

    const wrapper = shallow(TheSidebarHeader, {
      localVue,
      store,
      propsData: {
        vessel: firstVessel
      },
      stubs: ['router-link']
    })

    return { wrapper }
  }

  describe('when sidebarVisible is false', () => {
    const { wrapper } = setup(false)

    test('renders open icon', () => {
      expect(wrapper.find('[data-test-sidebar-header-close-icon]').classes()).toContain('sidebar__header__close__icon--open')
    })
  })

  describe('when sidebarVisible is true', () => {
    const { wrapper } = setup(true)

    test('close icon is rendered', () => {
      expect(wrapper.find('[data-test-sidebar-header-close-icon]').classes()).not.toContain('sidebar__header__close__icon--open')
    })

    test('vessel name is rendered', () => {
      expect(wrapper.html()).toContain('ENSCO DS-2')
    })

    test('proper edit link is rendered', () => {
      const link = wrapper.find('routerlink')
      expect(link.attributes().to).toBe('/dashboard/vessels/1/edit')
      expect(link.find(BaseIcon))
      expect(link.find(IconPencil))
    })
  })

  describe('Methods', () => {
    it('toggleSidebar calls toggleSidebar action', () => {
      const { wrapper } = setup(true)
      wrapper.vm.toggleSidebar()

      expect(toggleSidebarSpy).toHaveBeenCalled()
    })
  })

  describe('Computed properties', () => {
    it('editLink returns proper link', () => {
      const { wrapper } = setup(true)
      expect(wrapper.vm.editLink).toEqual("/dashboard/vessels/1/edit")
    })

    it('items returns proper number of items', () => {
      const { wrapper } = setup(true)

      const expectedValue = [
        { "title": "Name",
          "value": "ENSCO DS-2"
        }, {
          "title": "IMO Number",
          "value": "123456789"
        }, {
          "title": "MMSI",
          "value": "987654321"
        }, {
          "title": "Gross tonnage",
          "value": "47000"
        }, {
          "title": "Year of build",
          "value": "1997"
        }, {
          "title": "Flag",
          "value": "Marshall Islands"
        }
      ]

      expect(wrapper.vm.items).toEqual(expectedValue)
    })
  })
})
