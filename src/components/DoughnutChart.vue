<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],

  props: {
    chartData: {
      type: Object,
      required: true
    }
  },

  mounted () {
    const labels = this.chartData.labels
    const datasets = this.chartData.datasets

    this.renderChart(
      {
        labels,
        datasets
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        }
      }
    )
  }
}
</script>
