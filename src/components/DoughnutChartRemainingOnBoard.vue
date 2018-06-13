<template>
  <DoughnutChart
    class="doughnut-chart"
    :chartData="chartData"
    :width="150"
    :height="150"
  />
</template>

<script>
import DoughnutChart from '@/components/DoughnutChart'
import colorPalette from '@/constants/colorPalette'

const {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_LIGHT_BLUE,
  COLOR_WHITEY,
  COLOR_GREEN,
  COLOR_TOMATO
} = colorPalette

export default {
  components: {
    DoughnutChart
  },

  props: {
    filled: {
      type: String,
      required: true
    },
    empty: {
      type: Number,
      required: true
    },
    change: {
      type: Number,
      requried: true
    },
    color: {
      type: String
    }
  },

  computed: {
    chartData () {
      return {
        labels: [
          'Filled',
          'Change',
          'Empty'
        ],
        datasets: [
          {
            data: [
              this.filled,
              this.change,
              this.empty
            ],
            backgroundColor: [
              this.filledColor,
              this.changeColor,
              COLOR_WHITEY
            ]
          }
        ]
      }
    },

    changeColor () {
      return this.change > 0 ? COLOR_GREEN : COLOR_TOMATO
    },

    filledColor () {
      switch (this.color) {
        case 'black': return COLOR_BLACK
        case 'brown': return COLOR_BROWN
        case 'light-blue': return COLOR_LIGHT_BLUE
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.doughnut-chart {
  background: transparent;
  padding: 20px;
  text-align: center;

  &__header {
    margin-top: 0;
    padding: 15px 0;
    color:  $color-dark-grey;
  }
}
</style>
