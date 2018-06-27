import { mount, createLocalVue } from 'vue-test-utils'
import TheSidebarFilter from '@/components/TheSidebarFilter'
import { report, secondReport } from '@/../test/stubs/report'
import Vuex from 'vuex'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

const setFilteredReportsSpy = jest.fn()

describe('TheSidebarFilter.vue', () => {
  const setup = () => {
    const getters = {
      reports: jest.fn()
    }

    const actions = {
      setFilteredReports: setFilteredReportsSpy
    }

    getters.reports.mockReturnValue([secondReport, report])

    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueMomentJS, moment)

    const store = new Vuex.Store({
      getters,
      actions
    })

    const wrapper = mount(TheSidebarFilter, {
      localVue,
      store,
      propsData: {
        lastReport: report
      },
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with start date datepicker', () => {
      expect(wrapper.findAll('[data-test-sidebar-filter-start-date-datepicker]')).toHaveLength(1)
    })

    test('with end date datepicker', () => {
      expect(wrapper.findAll('[data-test-sidebar-filter-end-date-datepicker]')).toHaveLength(1)
    })

    test('with filter button', () => {
      expect(wrapper.findAll('[data-test-sidebar-filter-button]')).toHaveLength(1)
    })
  })

  describe('Computed properties', () => {
    describe('firstReportDate', () => {
      it('returns proper value', () => {
        const { wrapper } = setup()
        wrapper.vm.filteredFirstReportDate = new Date('2018-06-20')
        expect(wrapper.vm.firstReportDate).toEqual(new Date('2018-06-20'))
      })
    })

    describe('filterMinDate', () => {
      it('returns proper value', () => {
        const { wrapper } = setup()
        expect(wrapper.vm.filterMinDate).toEqual(new Date('2018-02-10'))
      })
    })

    describe('filterMaxDate', () => {
      it('returns proper value', () => {
        const { wrapper } = setup()
        expect(wrapper.vm.filterMaxDate).toEqual(new Date('2018-04-16'))
      })
    })

    describe('disableFilterButton', () => {
      it('returns proper value when first date < last date', () => {
        const { wrapper } = setup()
        wrapper.vm.filteredFirstReportDate = '2018-02-20'
        wrapper.vm.filteredLastReportDate = '2018-03-20'
        expect(wrapper.vm.disableFilterButton).toEqual(false)
      })

      it('returns proper value when first date > last date', () => {
        const { wrapper } = setup()
        wrapper.vm.filteredFirstReportDate = '2018-03-20'
        wrapper.vm.filteredLastReportDate = '2018-02-20'
        expect(wrapper.vm.disableFilterButton).toEqual(true)
      })

      it('returns proper value when first date === last date', () => {
        const { wrapper } = setup()
        wrapper.vm.filteredFirstReportDate = '2018-02-20'
        wrapper.vm.filteredLastReportDate = '2018-02-20'
        expect(wrapper.vm.disableFilterButton).toEqual(false)
      })
    })
  })

  describe('Methods', () => {
    const { wrapper } = setup()

    describe('filterReports', () => {
      wrapper.vm.filteredFirstReportDate = new Date('2018-02-09')
      wrapper.vm.filteredLastReportDate = new Date('2018-02-11')

      wrapper.vm.filterReports()

      it('calls setFilteredReports', () => {
        expect(setFilteredReportsSpy).toHaveBeenCalled()
      })
    })
  })
})
