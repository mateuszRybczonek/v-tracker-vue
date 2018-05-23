<template>
  <div>
    <GoogleMapLoader
      class="google-map-loader"
      :map-config="mapConfig"
      map-height="460px"
      apiKey="AIzaSyAcpHQzH108aO_4Ea9cS4zT5PTBqpopd8Q"
    >
      <template slot-scope="scopeProps">
        <GoogleMapMarker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :google="scopeProps.google"
          :map="scopeProps.map"
        />
        <GoogleMapLine
          v-for="(line, index) in lines"
          :key="index"
          :path.sync="line.path"
          :google="scopeProps.google"
          :map="scopeProps.map"
        />
      </template>
    </GoogleMapLoader>
  </div>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'
import GoogleMapLine from './GoogleMapLine'

import {
  mapSettings
} from '@/constants/mapSettings'

export default {
  props: {
    markers: Array,
    lines: Array,
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
    GoogleMapMarker,
    GoogleMapLine
  }
}
</script>
