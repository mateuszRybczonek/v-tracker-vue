<template>
  <div>
    <div
      data-test-map-container
      id="map"
      :style="{ height: mapHeight }"
    ></div>
    <template v-if="!!this.google && !!this.map">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  props: {
    mapConfig: Object,
    apiKey: String,
    mapHeight: String
  },

  data (){
    return {
      google: null,
      map: null
    }
  },

  mounted () {
    GoogleMapsApiLoader({
      apiKey: this.apiKey
    }).then((google) => {
      this.google = google
      this.initializeMap()
    })
  },

  methods: {
    initializeMap (){
      const mapContainer = this.$el.querySelector('#map')
      const { Map } = this.google.maps
      this.map = new Map(mapContainer, this.mapConfig)
    }
  }
}
</script>

<style scoped>
#map {
  width: 100%;
}
</style>
