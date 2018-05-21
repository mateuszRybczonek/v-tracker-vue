<template>
  <div class="vessel-weather">
    Weather
    <GoogleMap
      class="vessel-dashboard__row__item"
      @markerClicked="markerClicked"
    ></GoogleMap>
  </div>
</template>

<script>
  import GoogleMap from './GoogleMap.vue'

  export default {
    components: {
      GoogleMap
    }
  }
</script>

<style scoped lang="scss">
  .vessel-weather {}
</style>
