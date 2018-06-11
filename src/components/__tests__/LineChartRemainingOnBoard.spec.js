import { shallow } from 'vue-test-utils'
import { report, secondReport } from '@/../test/stubs/report'
import LineChartRemainingOnBoard from '@/components/LineChartRemainingOnBoard'
import LineChart from '@/components/LineChart'

describe('VesselStatistics.vue', () => {
  const setup = () => {
    const wrapper = shallow(LineChartRemainingOnBoard, {
      propsData: {
        reports: [report, secondReport]
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with chart header', () => {
      expect(wrapper.findAll('[data-test-chart-header]')).toHaveLength(1)
    })

    test('with LineChart component', () => {
      expect(wrapper.findAll(LineChart)).toHaveLength(1)
    })
  })

  describe('Computed properties', () => {
    it('labels returns proper data', () => {
      const { wrapper } = setup()

      const expectedResult = [
        report.reportTime,
        secondReport.reportTime
      ]

      expect(wrapper.vm.labels).toEqual(expectedResult)
    })

    it('foDataset returns proper data', () => {
      const { wrapper } = setup()

      const expectedResult = [
        report.foRob,
        secondReport.foRob
      ]

      expect(wrapper.vm.foDataset).toEqual(expectedResult)
    })

    it('doDataset returns proper data', () => {
      const { wrapper } = setup()

      const expectedResult = [
        report.doRob,
        secondReport.doRob
      ]

      expect(wrapper.vm.doDataset).toEqual(expectedResult)
    })

    it('fwDataset returns proper data', () => {
      const { wrapper } = setup()

      const expectedResult = [
        report.fwRob,
        secondReport.fwRob
      ]

      expect(wrapper.vm.fwDataset).toEqual(expectedResult)
    })

    it('chartData returns proper number of datasets', () => {
      const { wrapper } = setup()

      expect(wrapper.vm.chartData.datasets.length).toEqual(3)
    })
  })
})
