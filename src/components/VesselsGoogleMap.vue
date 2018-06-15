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
          :markerIcon="markerConfig"
          :googleMapMarkers="googleMapMarkers"
          :google="google"
          :map="map"
        />
      </template>
    </GoogleMapLoader>
  </div>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'

import {
  mapSettings,
  SELECTED_POINT_MARKER_ICON_CONFIG,
} from '@/constants/mapSettings'

import { mapActions } from 'vuex'
import { get } from 'vuex-pathify'

import {
  mapReportsToMarkers
} from '@/utils/google-map-utils'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker
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
      currentPlace: null,
      infoPosition: null,
      infoContent: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -10
        }
      },
      googleMapMarkers: []
    }
  },

  mounted () {
    this.markers = this.points
  },

  computed: {
    vesselsGoogleMap: get('vesselsGoogleMap'),

    markerConfig () {
      return SELECTED_POINT_MARKER_ICON_CONFIG
    },

    points () {
      if(!this.fetchingVessels) {
        const lastReports = this.vessels.map(vessel => {
          const { lastReport } = vessel

          return {
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
            windSpd: parseInt(lastReport.windSpd)
          }
        })

        return mapReportsToMarkers(lastReports)
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
      if(!this.fetchingVessels) {
        return {
          lat: parseFloat(this.points[1].position.lat),
          lng: parseFloat(this.points[1].position.lng)
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
    ])
  }
}
</script>

<style scoped lang='scss'>
  .google-map {
    display: flex;
    justify-content: center;
    align-items: center;
    @include box-shadow(0 0 100px 1px rgba(0,0,0,0.1));

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
