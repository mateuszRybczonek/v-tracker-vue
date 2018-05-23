<template>
  <div>
    <div id="map" :style="{ height: mapHeight }"></div>
    <template v-if="!!this.google && !!this.map">
      <GoogleMapProvider
        :google="google"
        :map="map"
      >
        <slot/>
      </GoogleMapProvider>
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import GoogleMapProvider from './GoogleMapProvider'

export default {
  props: {
    mapConfig: Object,
    apiKey: String,
    mapHeight: String
  },

  components: {
    GoogleMapProvider
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
