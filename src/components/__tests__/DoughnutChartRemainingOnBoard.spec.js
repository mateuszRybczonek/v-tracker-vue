import { shallow } from 'vue-test-utils'
import DoughnutChartRemainingOnBoard from '@/components/DoughnutChartRemainingOnBoard'
import DoughnutChart from '@/components/DoughnutChart'
import colorPalette from '@/constants/colorPalette'

const {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_LIGHT_BLUE,
  COLOR_GREEN,
  COLOR_TOMATO,
  COLOR_WHITEY
} = colorPalette

describe('DoughnutChartRemainingOnBoard.vue', () => {
  const setup = (change = -25, color = 'black') => {
    const wrapper = shallow(DoughnutChartRemainingOnBoard, {
      propsData: {
        filled: 100,
        empty: 50,
        change,
        color
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with DoughnutChart component', () => {
      expect(wrapper.findAll(DoughnutChart)).toHaveLength(1)
    })
  })

  describe('Computed properties', () => {
    describe('changeColor', () => {
      it('returns proper data for negative value', () => {
        const { wrapper } = setup()
        expect(wrapper.vm.changeColor).toEqual(COLOR_TOMATO)
      })

      it('returns proper data for positive value', () => {
        const { wrapper } = setup(25)
        expect(wrapper.vm.changeColor).toEqual(COLOR_GREEN)
      })
    })

    describe('changeColor', () => {
      it('returns proper data in case of black color', () => {
        const { wrapper } = setup()
        expect(wrapper.vm.filledColor).toEqual(COLOR_BLACK)
      })

      it('returns proper data in case of brown color', () => {
        const { wrapper } = setup(25, 'brown')
        expect(wrapper.vm.filledColor).toEqual(COLOR_BROWN)
      })

      it('returns proper data in case of light-blue color', () => {
        const { wrapper } = setup(25, 'light-blue')
        expect(wrapper.vm.filledColor).toEqual(COLOR_LIGHT_BLUE)
      })
    })

    it('chartData returns proper data', () => {
      const { wrapper } = setup()

      const expectedResult = {
        datasets: [
          {
            backgroundColor: [
            COLOR_BLACK,
            COLOR_TOMATO,
            COLOR_WHITEY
          ],
            data: [
              100,
              -25,
              50
            ]
          }
        ],
        labels: [
          'Filled',
           'Change',
           'Empty'
         ]
       }
      expect(wrapper.vm.chartData).toEqual(expectedResult)
    })
  })
})
