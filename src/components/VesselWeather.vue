<template>
  <div class="vessel-weather">
    Weather
    <VesselDashboardGoogleMap
      class="vessel-dashboard__row__item"
      @markerClicked="markerClicked"
    />
  </div>
</template>

<script>
  import VesselDashboardGoogleMap from './VesselDashboardGoogleMap.vue'

  export default {
    components: {
      VesselDashboardGoogleMap
    }
  }
</script>

<style scoped lang="scss">
  .vessel-weather {}
</style>
