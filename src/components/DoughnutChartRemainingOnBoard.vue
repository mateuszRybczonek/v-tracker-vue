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

const { COLOR_BLACK, COLOR_BROWN, COLOR_BLUE, COLOR_WHITE } = colorPalette

export default {
  components: {
    DoughnutChart
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    chartData () {
      return {
        labels: [
          'Filled',
          'Empty'
        ],
        datasets: [
          {
            data: [parseInt(this.item.header), 10],
          }
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
