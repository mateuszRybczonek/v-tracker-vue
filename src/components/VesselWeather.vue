<template>
  <div class="vessel-weather">
    <iframe
      class="vessel-weather__map"
      :src="mapSrc"
      frameborder="0"
    />

    <ReportSelector
      class="vessel-dashboard__report-selector"
      :reports="sortedReports"
    />
  </div>
</template>

<script>
  import { get } from 'vuex-pathify'
  import { mapGetters } from 'vuex'
  import ReportSelector from './ReportSelector'

  export default {
    components: {
      ReportSelector
    },

    computed: {
      ...mapGetters([
        'sortedReports'
      ]),

      selectedReport: get('selectedReport'),

      mapSrc () {
        return `https://embed.windy.com/embed2.html?lat=${this.selectedReport.lat}&lon=${this.selectedReport.lng}&zoom=5&level=surface&overlay=wind&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=true&detailLat=${this.selectedReport.lat}&detailLon=${this.selectedReport.lng}&metricWind=kt&metricTemp=%C2%B0C`
      }
    }
  }
</script>

<style scoped lang="scss">
  .vessel-weather {
    &__map {
      padding: 20px 50px 0 0;
      height: 90vh;
      width: 100%;
    }
  }
</style>
