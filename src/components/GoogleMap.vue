<template>
  <div>
    <GoogleMapLoader
      class="google-map-loader"
      :map-config="mapConfig"
      map-height="460px"
      apiKey="AIzaSyAcpHQzH108aO_4Ea9cS4zT5PTBqpopd8Q"
    >
      <template v-for="marker in markers">
        <GoogleMapMarker :position="marker.position" />
      </template>
    </GoogleMapLoader>
  </div>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'

import {
  mapSettings
} from '@/constants/mapSettings'

export default {
  props: {
    markers: Array,
    center: Object
  },

  data (){
    return {
      mapConfig: {
        ...mapSettings,
        center: this.center
      }
    }
  },

  components: {
    GoogleMapLoader,
    GoogleMapMarker
  }
}
</script>
