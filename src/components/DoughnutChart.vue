<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,

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
