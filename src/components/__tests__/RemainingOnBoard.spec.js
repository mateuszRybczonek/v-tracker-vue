import { mount } from 'vue-test-utils'
import RemainingOnBoard from '@/components/RemainingOnBoard'
import MiniStatsItem from '@/components/MiniStatsItem'
import { report, secondReport } from '@/../test/stubs/report'

describe('RemainingOnBoard.vue', () => {
  const wrapper = mount(RemainingOnBoard, {
    propsData: {
      report,
      previousReport: secondReport,
      fetchingReports: false
    }
  })

  it('renders proper number of MiniStatsItem components', () => {
    expect(wrapper.findAll(MiniStatsItem)).toHaveLength(4)
  })

  describe('Computed properties', () => {
    it('foRob returns proper data', () => {
      const expectedResult = 90
      expect(wrapper.vm.foRob).toEqual(expectedResult)
    }),

    it('doRob returns proper data', () => {
      const expectedResult = 100
      expect(wrapper.vm.doRob).toEqual(expectedResult)
    }),

    it('fwRob returns proper data', () => {
      const expectedResult = 80
      expect(wrapper.vm.fwRob).toEqual(expectedResult)
    }),

    it('pob returns proper data', () => {
      const expectedResult = 67
      expect(wrapper.vm.pob).toEqual(expectedResult)
    }),

    it('miniStatsItems returns proper data', () => {
      const expectedResult = [
        {
          "change": 5,
          "color": "black",
          "customClass": "mini-stats__item--fo",
          "description": "Fuel Oil",
          "header": "90",
          "icon": "IconFuel",
          "unit": "cbm"
        }, {
          "change": 10,
          "color": "brown",
          "customClass": "mini-stats__item--do",
          "description": "Diesel Oil",
          "header": "100",
          "icon": "IconFuel",
          "unit": "cbm"
        }, {
          "change": 3,
          "color": "light-blue",
          "customClass": "mini-stats__item--fw",
          "description": "Fresh Water",
          "header": "80",
          "icon": "IconWater",
          "unit": "cbm"
        }, {
          "change": 0,
          "color": "green",
          "customClass": "mini-stats__item--pob",
          "description": "People On Board",
          "header": "67",
          "icon": "IconPeople",
          "unit": "persons"
        }
      ]
      expect(wrapper.vm.miniStatsItems).toEqual(expectedResult)
    })
  })
})
