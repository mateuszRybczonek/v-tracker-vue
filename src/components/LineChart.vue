<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,

  data () {
    return {
      gradient: null,
      gradient2: null
    }
  },

  props: {
    chartData: {
      type: Object,
      required: true
    }
  },

  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')

    const gradients = [
      this.gradient,
      this.gradient2
    ]

    const datasets = this.chartData.datasets.map((dataset, index) => {
      const changed = {
        ...dataset,
        backgroundColor: gradients[index]
      }

      return changed
    })

    const labels = this.chartData.labels

    this.renderChart(
      { labels, datasets },
      { responsive: true, maintainAspectRatio: false }
    )
  }
}
</script>
