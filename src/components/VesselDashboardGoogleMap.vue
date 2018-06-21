<template>
  <div class="google-map">
    <content-placeholders
      data-test-google-map-placeholder
      class="google-map__placeholder"
      v-if="fetchingReports"
    >
      <content-placeholders-img class="google-map__placeholder"></content-placeholders-img>
    </content-placeholders>

    <GoogleMapLoader
      v-else
      data-test-google-map
      class="google-map__map"
      :setGoogleMap="setDashboardGoogleMap"
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
          :googleMapMarkers="googleMapMarkers"
          :google="google"
          :map="map"
          @selectMarker="selectMarker(marker)"
        />
        <GoogleMapLine
          data-test-google-map-line
          v-for="(line, index) in lines"
          :key="index"
          :path.sync="line.path"
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
import GoogleMapLine from './GoogleMapLine'

import {
  mapSettings,
  POINT_MARKER_ICON_CONFIG,
  SELECTED_POINT_MARKER_ICON_CONFIG,
  LINE_PATH_CONFIG
} from '@/constants/mapSettings'

import { mapGetters, mapActions } from 'vuex'
import { get } from 'vuex-pathify'

import {
  mapReportsToMarkers,
  mapReportsToLines
} from '@/utils/google-map-utils'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapLine
  },

  data () {
    return {
      linePathConfig: LINE_PATH_CONFIG,
      mapSettings,
      markers: this.points,
      googleMapMarkers: []
    }
  },

  mounted () {
    this.markers = this.points
  },

  computed: {
    ...mapGetters([
      'sortedReports'
    ]),
    dashboardGoogleMap: get('dashboardGoogleMap'),
    fetchingReports: get('fetchingReports'),
    selectedReport: get('selectedReport'),
    reports: get('reports'),

    newSelectedReport () {
      if(this.googleMapMarkers.length > 0) return this.selectedReport
    },

    points () {
      if(!this.fetchingReports) return mapReportsToMarkers(this.reports)
    },

    lines () {
      const { reports } = this
      const lines = []
      if (reports.length > 0) mapReportsToLines(reports, lines)
      return lines
    },

    mapConfig () {
      return {
        ...mapSettings,
        center: this.mapCenter
      }
    },

    mapCenter () {
      if (this.selectedReport === null) {
        return { lat: 0, lng: 0 }
      } else {
        if(!this.fetchingReports) {
          return {
            lat: this.selectedReport.lat,
            lng: this.selectedReport.lng
          }
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'selectReport',
      'setDashboardGoogleMap'
    ]),

    selectMarker(marker) {
      this.selectReport(marker.id)
    }
  },

  watch: {
    newSelectedReport (newValue) {
      if(!this.fetchingReports && this.googleMapMarkers.length) {
        this.googleMapMarkers.forEach(googleMapMarker => {
          googleMapMarker.setIcon(POINT_MARKER_ICON_CONFIG)
          googleMapMarker.setAnimation(null)
        })

        const selectedMarker = this.googleMapMarkers.find(marker => marker.marker.id === newValue.id)
        selectedMarker.setIcon(SELECTED_POINT_MARKER_ICON_CONFIG)
      }

      const { lat, lng } = newValue
      this.dashboardGoogleMap.panTo({ lat, lng })
    },

    reports () {
      if(!this.fetchingReports) this.markers = mapReportsToMarkers(this.reports)
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
    border: solid 1px $color-white;

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
