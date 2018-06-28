import { mount, createLocalVue } from 'vue-test-utils'
import TheSidebarContent from '@/components/TheSidebarContent.vue'
import Vuex from 'vuex'
import { report, secondReport } from '@/../test/stubs/report'
import { firstVessel } from '@/../test/stubs/vessel'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import pathify from 'vuex-pathify'
import { make } from 'vuex-pathify'
import { COMPONENT_NAMES } from '@/constants/vessel-details'

const { VESSEL_DASHBOARD } = COMPONENT_NAMES
const setFilteredReportsSpy = jest.fn()

describe('TheSidebarContent.vue', () => {
  const setup = sidebarVisible => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueMomentJS, moment)

    const state = {
      sidebarVisible,
      selectedVesselDetailsComponent: VESSEL_DASHBOARD,
      dashboardGoogleMap: {},
      reports: [report, secondReport],
      fetchingReports: false
    }

    const actions = {
      setFilteredReports: setFilteredReportsSpy
    }

    const store = new Vuex.Store({
      plugins: [ pathify.plugin ],
      state,
      getters: { ...make.getters(state) },
      actions
    })

    const wrapper = mount(TheSidebarContent, {
      localVue,
      store,
      propsData: {
        report,
        lastReport: secondReport,
        vessel: firstVessel
      }
    })

    return { wrapper }
  }

  describe('when sidebarVisible is false', () => {
    const { wrapper } = setup(false)

    test('status marker is rendered', () => {
      expect(wrapper.find('[data-test-sidebar-content-status]').text()).toContain('')
      expect(wrapper.findAll('[data-test-sidebar-content-status-marker]')).toHaveLength(1)
    })

    test('filter is not rendered', () => {
      expect(wrapper.findAll('[data-test-sidebar-contnent-filter]')).toHaveLength(0)
    })

    test('last-report data is not rendered', () => {
      expect(wrapper.findAll('[data-test-sidebar-content-list-last-report]')).toHaveLength(0)
    })

    test('list items are not rendered', () => {
      expect(wrapper.findAll('[data-test-sidebar-content-list-items]')).toHaveLength(0)
    })
  })

  describe('when sidebarVisible is true', () => {
    const { wrapper } = setup(true)
    wrapper.setComputed({ sidebarVisible: true })

    test('status label and marker is rendered', () => {
      expect(wrapper.find('[data-test-sidebar-content-status]').text()).toContain('Status')
      expect(wrapper.findAll('[data-test-sidebar-content-status-marker]')).toHaveLength(1)
    })

    test('filter is rendered', () => {
      expect(wrapper.findAll('[data-test-sidebar-contnent-filter]')).toHaveLength(1)
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
