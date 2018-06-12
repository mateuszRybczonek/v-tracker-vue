<template>
  <div class="container">
      <div class="chart">
        <DoughnutChart
          :chartData="chartData"
          :width="150"
          :height="150"
        />
      </div>
    </div>
</template>

<script>
import DoughnutChart from '@/components/DoughnutChart'
import colorPalette from '@/constants/colorPalette'

const {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_BLUE,
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
            backgroundColor: this.colorSet
          }
        ]
      }
    },

    changeColor () {
      return this.change > 0 ? COLOR_GREEN : COLOR_TOMATO
    },

    colorSet () {
      switch (this.color) {
        case 'black':
          return [
            COLOR_BLACK,
            this.changeColor,
            COLOR_WHITEY
          ]
        case 'brown':
          return [
            COLOR_BROWN,
            this.changeColor,
            COLOR_WHITEY
          ]
        case 'light-blue':
          return [
            COLOR_BLUE,
            this.changeColor,
            COLOR_WHITEY
          ]
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  .chart {
    background: transparent;
    padding: 20px;
    text-align: center;

    &__header {
      margin-top: 0;
      padding: 15px 0;
      color:  $color-dark-grey;
    }
  }
}
</style>
