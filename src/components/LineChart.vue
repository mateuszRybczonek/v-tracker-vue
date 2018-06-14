<script>
import { Line } from 'vue-chartjs'
import { convertToRgba } from '@/utils/color-utils'

export default {
  extends: Line,

  props: {
    chartData: {
      type: Object,
      required: true
    }
  },

  mounted () {
    const datasets = this.chartData.datasets.map(dataset => {
      const gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      gradient.addColorStop(0, convertToRgba(dataset.borderColor, 0.5))
      gradient.addColorStop(0.5, convertToRgba(dataset.borderColor, 0.25))
      gradient.addColorStop(1, convertToRgba(dataset.borderColor, 0))

      const changed = {
        ...dataset,
        backgroundColor: gradient
      }

      return changed
    })

    const labels = this.chartData.labels

    this.renderChart(
      { labels, datasets },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'left'
        },
        elements: {
          point: {
            radius: 4,
            pointStyle: 'circle',
            hoverRadius: 5,
            hitRadius: 20
          }
        }
      }
    )
  }
}
</script>
