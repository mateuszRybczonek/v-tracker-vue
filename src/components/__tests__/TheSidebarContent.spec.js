import { shallow, createLocalVue } from 'vue-test-utils'
import TheSidebarContent from '@/components/TheSidebarContent.vue'
import Vuex from 'vuex'
import { report, secondReport } from '@/../test/stubs/report'
import { firstVessel } from '@/../test/stubs/vessel'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

let originalDateNow
const mockDateNow = () => 1524475888010

describe('TheSidebarContent.vue', () => {
  const setup = sidebarVisible => {
    const getters = {
      sidebarVisible: jest.fn(),
      vessels: jest.fn()
    }

    getters.sidebarVisible.mockReturnValue(sidebarVisible)

    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueMomentJS, moment)

    const store = new Vuex.Store({
      state: {},
      getters
    })

    const wrapper = shallow(TheSidebarContent, {
      localVue,
      store,
      propsData: {
        report,
        lastReport: secondReport,
        vessel: firstVessel
      }
    })

    return { wrapper, getters }
  }

  describe('when sidebarVisible is false', () => {
    const { wrapper, getters } = setup(false)

    test('status marker is rendered', () => {
      expect(wrapper.find('[data-test-sidebar-content-status]').text()).toContain('')
      expect(wrapper.findAll('[data-test-sidebar-content-status-marker]')).toHaveLength(1)
    })

    test('last-report data is not rendered', () => {
      expect(wrapper.findAll('[data-test-sidebar-content-list-last-report]')).toHaveLength(0)
    })

    test('list items are not rendered', () => {
      const { wrapper, getters } = setup()

      expect(wrapper.findAll('[data-test-sidebar-content-list-items]')).toHaveLength(0)
    })
  })

  describe('when sidebarVisible is true', () => {
    const { wrapper, getters } = setup(true)

    test('status label and marker is rendered', () => {
      expect(wrapper.find('[data-test-sidebar-content-status]').text()).toContain('Status')
      expect(wrapper.findAll('[data-test-sidebar-content-status-marker]')).toHaveLength(1)
    })

    test('last-report data is rendered', () => {
      expect(wrapper.find('[data-test-sidebar-content-list-last-report]')
        .text()).toContain('Last reported data: 2018-04-16')
    })

    test('list items are rendered', () => {
      expect(wrapper.findAll('[data-test-sidebar-content-list-items]')).toHaveLength(1)
      expect(wrapper.findAll('[data-test-sidebar-content-list-item]')).toHaveLength(6)
    })

    test('list items have proper titles', () => {
      const sidebarContentListItems = wrapper.find('[data-test-sidebar-content-list-items]')
      expect(sidebarContentListItems.text()).toContain('Name')
      expect(sidebarContentListItems.text()).toContain('IMO Number')
      expect(sidebarContentListItems.text()).toContain('MMSI')
      expect(sidebarContentListItems.text()).toContain('Gross tonnage')
      expect(sidebarContentListItems.text()).toContain('Year of build')
      expect(sidebarContentListItems.text()).toContain('Flag')
    })

    test('list items have proper data', () => {
      const sidebarContentListItems = wrapper.find('[data-test-sidebar-content-list-items]')
      expect(sidebarContentListItems.text()).toContain(wrapper.vm.vessel.name)
      expect(sidebarContentListItems.text()).toContain(wrapper.vm.vessel.imoNumber)
      expect(sidebarContentListItems.text()).toContain(wrapper.vm.vessel.mmsi)
      expect(sidebarContentListItems.text()).toContain(wrapper.vm.vessel.gt)
      expect(sidebarContentListItems.text()).toContain(wrapper.vm.vessel.yob)
      expect(sidebarContentListItems.text()).toContain(wrapper.vm.vessel.flag)
    })
  })

  describe('Computed properties', () => {
    const { wrapper } = setup(true)

    test('items return proper data', () => {
      const expectedResult = [
        { 'title': 'Name', 'value': wrapper.vm.vessel.name },
        { 'title': 'IMO Number', 'value': wrapper.vm.vessel.imoNumber },
        { 'title': 'MMSI', 'value': wrapper.vm.vessel.mmsi },
        { 'title': 'Gross tonnage', 'value': wrapper.vm.vessel.gt },
        { 'title': 'Year of build', 'value': wrapper.vm.vessel.yob },
        { 'title': 'Flag', 'value': wrapper.vm.vessel.flag }
      ]

      expect(wrapper.vm.items).toEqual(expectedResult)
    })

    test('lastReportDate return proper data', () => {
      expect(wrapper.vm.lastReportDate).toEqual('2018-04-16')
    })

    test('vesselStatusClass return proper data', () => {
      expect(wrapper.vm.vesselStatusClass).toEqual('status--red')
    })
  })
})
