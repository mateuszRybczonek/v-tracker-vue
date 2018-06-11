<template>
  <div class="container">
      <div class="chart">
        <h2 class="chart__header">Remaining on board chart</h2>
        <LineChart
          :chartData="chartData"
        />
      </div>
    </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import colorPalette from '@/constants/colorPalette'

const { COLOR_BLACK, COLOR_BROWN, COLOR_BLUE, COLOR_WHITE } = colorPalette
export default {
  components: {
    LineChart
  },

  props: {
    reports: {
      type: Array,
      required: true
    }
  },

  computed: {
    labels () {
      return this.reports.map(report => {
        return report.reportTime
      })
    },

    foDataset () {
      return this.reports.map(report => {
        return report.foRob
      })
    },

    doDataset () {
      return this.reports.map(report => {
        return report.doRob
      })
    },

    fwDataset () {
      return this.reports.map(report => {
        return report.fwRob
      })
    },

    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'FO',
            borderColor: COLOR_BLACK,
            pointBackgroundColor: COLOR_WHITE,
            borderWidth: 1,
            pointBorderColor: COLOR_BLACK,
            data: this.foDataset
          },
          {
            label: 'DO',
            borderColor: COLOR_BROWN,
            pointBackgroundColor: COLOR_WHITE,
            pointBorderColor: COLOR_BROWN,
            borderWidth: 1,
            data: this.doDataset
          },
          {
            label: 'FW',
            borderColor: COLOR_BLUE,
            pointBackgroundColor: COLOR_WHITE,
            pointBorderColor: COLOR_BLUE,
            borderWidth: 1,
            data: this.fwDataset
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
    background: $color-white;
    padding: 20px;
    text-align: center;
    @include box-shadow(0 0 100px 1px rgba(0,0,0,0.1));

    &__header {
      margin-top: 0;
      padding: 15px 0;
      color:  $color-dark-grey;
    }
  }
}
</style>
