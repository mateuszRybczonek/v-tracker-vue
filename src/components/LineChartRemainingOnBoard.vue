<template>
  <div class="container">
      <div class="chart">
        <h2>Remaining on board</h2>
        <LineChart
          :chartData="chartData"
        />
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/components/LineChart'
import colorPalette from '@/constants/colorPalette'

const { COLOR_BLACK, COLOR_BROWN, COLOR_BLUE } = colorPalette
export default {
  components: {
    LineChart
  },

  props: {
    reports: {
      type: Object,
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
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: COLOR_BLACK,
            data: this.foDataset
          },
          {
            label: 'DO',
            borderColor: COLOR_BROWN,
            pointBackgroundColor: 'white',
            pointBorderColor: COLOR_BROWN,
            borderWidth: 1,
            data: this.doDataset
          },
          {
            label: 'FW',
            borderColor: COLOR_BLUE,
            pointBackgroundColor: 'white',
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

    h2 {
      margin-top: 0;
      padding: 15px 0;
      color:  rgba(255, 0,0, 0.5);
      border-bottom: 1px solid #323d54;
    }
  }
}
</style>
