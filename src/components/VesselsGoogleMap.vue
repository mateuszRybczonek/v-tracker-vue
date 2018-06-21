<template>
  <div class="google-map">
    <content-placeholders
      data-test-google-map-placeholder
      class="google-map__placeholder"
      v-if="fetchingVessels"
    >
      <content-placeholders-img class="google-map__placeholder"></content-placeholders-img>
    </content-placeholders>

    <GoogleMapLoader
      v-else
      data-test-google-map
      class="google-map__map"
      :setGoogleMap="setVesselsGoogleMap"
      :mapConfig="mapConfig"
      mapHeight="460px"
      apiKey="AIzaSyAcpHQzH108aO_4Ea9cS4zT5PTBqpopd8Q"
    >
      <template slot-scope="{ google, map }">
        <GoogleMapMarker
          data-test-google-map-marker
          v-for="marker in markers"
          :key="marker.id"
          :marker="marker"
          :markerIcon="markerConfigMain"
          :googleMapMarkers="googleMapMarkers"
          :google="google"
          :map="map"
        />
        <GoogleMapMarker
          data-test-google-map-marker
          v-for="marker in markers"
          :pulse="true"
          :key="marker.id"
          :marker="marker"
          :markerIcon="markerConfigCircles"
          :googleMapMarkers="googleMapMarkers"
          :google="google"
          :map="map"
          @selectMarker="selectMarker(...arguments)"
        />
      </template>
    </GoogleMapLoader>
  </div>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'
import GoogleMapInfoWindow from './GoogleMapInfoWindow'

import {
  mapSettings,
  VESSELS_GOOGLE_MAP_MARKER_BASE,
  VESSELS_GOOGLE_MAP_MARKER_CIRCLES
} from '@/constants/mapSettings'

import { mapActions } from 'vuex'
import { get } from 'vuex-pathify'
import { mapReportsToMarkers } from '@/utils/google-map-utils'
import { decimalToDMS } from '@/utils/coordinates-utils'
import Vue from 'vue'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapInfoWindow
  },

  props: {
    fetchingVessels: {
      type: Boolean
    },
    vessels: {
      type: Array
    }
  },

  data () {
    return {
      mapSettings,
      markers: this.points,
      googleMapMarkers: [],
      infoWindow: null
    }
  },

  mounted () {
    this.markers = this.points
  },

  computed: {
    vesselsGoogleMap: get('vesselsGoogleMap'),

    markerConfigMain () {
      return {
        // eslint-disable-next-line no-undef
        anchor: new google.maps.Point(16, 32),
        url: VESSELS_GOOGLE_MAP_MARKER_BASE
      }
    },

    markerConfigCircles () {
      return {
        // eslint-disable-next-line no-undef
        anchor: new google.maps.Point(18, 34),
        url: VESSELS_GOOGLE_MAP_MARKER_CIRCLES
      }
    },

    points () {
      if(!this.fetchingVessels) {
        const lastReports = this.vessels.map(vessel => {
          const { lastReport, name } = vessel

          if (lastReport !== undefined) {
            return {
              id: lastReport.id,
              course: parseInt(lastReport.course),
              doRob: parseInt(lastReport.doRob),
              foRob: parseInt(lastReport.foRob),
              fwRob: parseInt(lastReport.fwRob),
              lat: parseFloat(lastReport.lat),
              lng: parseFloat(lastReport.lng),
              pitch: parseFloat(lastReport.pitch),
              roll: parseFloat(lastReport.roll),
              pob: parseInt(lastReport.pob),
              seaState: parseInt(lastReport.seaState),
              spd: parseInt(lastReport.spd),
              swellDir: parseInt(lastReport.swellDir),
              swellHeight: parseFloat(lastReport.swellHeight),
              windDir: parseInt(lastReport.windDir),
              windSpd: parseInt(lastReport.windSpd),
              reportTime: lastReport.reportTime,
              vesselName: name,
              vesselId: vessel.id
            }
          }
        })

        if (lastReports[0] !== undefined) return mapReportsToMarkers(lastReports)
      }
    },

    mapConfig () {
      return {
        ...mapSettings,
        zoom: 3,
        center: this.mapCenter
      }
    },

    mapCenter () {
      if (this.points === undefined) {
        return { lat: 0, lng: 0 }
      } else {
        if(!this.fetchingVessels) {
          if (this.points.length === 1) return { lat: parseFloat(this.points[0].position.lat), lng: parseFloat(this.points[0].position.lng) }

          const lats = this.points.map(point => {
            return point.position.lat
          })

          const lngs = this.points.map(point => {
            return point.position.lng
          })

          const avgLat = lats.reduce((a, b) => a + b) / lats.length
          const avgLng = lngs.reduce((a, b) => a + b) / lngs.length

          return {
            lat: avgLat,
            lng: avgLng
          }
        }
      }
    }
  },

  watch: {
    points () {
      if(!this.fetchingVessels) this.markers = this.points
    }
  },

  methods: {
    ...mapActions([
      'setVesselsGoogleMap'
    ]),

    selectMarker(marker, googleMarker) {
      const {
        reportTime,
        position: {
          lat,
          lng
        },
        vesselName,
        vesselId
      } = marker

      const InfoWindow = Vue.extend(GoogleMapInfoWindow)
      const infoWindowInstance = new InfoWindow({
        propsData: {
          vesselName,
          reportTime,
          lat: decimalToDMS(lat),
          lng: decimalToDMS(lng, false),
          vesselId
        }
      })

      infoWindowInstance.$mount()

      // eslint-disable-next-line no-undef
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowInstance.$el,
      })

      if (this.infoWindow) this.infoWindow.close()
      this.infoWindow = infoWindow
      infoWindow.open(this.map, googleMarker)
    }
  }
}
</script>

<style scoped lang='scss'>
  .google-map {
    display: flex;
    justify-content: center;
    align-items: center;
    @include box-shadow(0 0 10px 1px rgba(0,0,0,0.1));
    border-top: solid 2px $color-white;
    border-bottom: solid 2px $color-white;

    &__map {
      height: 460px;
      width: 100%;
    }

    &__placeholder {
      height: 460px;
      width: 100%;
    }
  }
</style>
