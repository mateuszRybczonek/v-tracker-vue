<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],

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
    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)')
    this.gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    this.gradient2.addColorStop(0, 'rgba(205, 133, 63, 0.7)')
    this.gradient2.addColorStop(0.5, 'rgba(205,133, 63, 0.25)')
    this.gradient2.addColorStop(1, 'rgba(205, 133, 63, 0)')

    this.gradient3.addColorStop(0, 'rgba(195, 230, 255, 0.9)')
    this.gradient3.addColorStop(0.5, 'rgba(195, 230, 255, 0.25)')
    this.gradient3.addColorStop(1, 'rgba(195, 230, 255, 0)')

    const gradients = [
      this.gradient,
      this.gradient2,
      this.gradient3
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
            hitRadius: 20,
          },
          line: {
            
          }
        }
      }
    )
  }
}
</script>
