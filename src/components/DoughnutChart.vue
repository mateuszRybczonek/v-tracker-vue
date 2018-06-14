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
    this.renderChart(
      {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets
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
