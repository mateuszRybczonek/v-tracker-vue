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
          v-if="showMapElements"
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
          v-if="showMapElements"
          data-test-google-map-line
          v-for="(line, index) in lines"
          :key="index"
          :path.sync="line.path"
          :googleMapLines="googleMapLines"
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
      googleMapMarkers: [],
      googleMapLines: [],
      showMapElements: true,
      isRerendered: false
    }
  },

  mounted () {
    this.markers = this.points
  },

  computed: {
    ...mapGetters([
      'sortedReports'
    ]),
    filteredReports: get('filteredReports'),
    dashboardGoogleMap: get('dashboardGoogleMap'),
    fetchingReports: get('fetchingReports'),
    selectedReport: get('selectedReport'),
    reports: get('reports'),

    newSelectedReport () {
      if(this.googleMapMarkers.length > 0 || this.isRerendered) return this.selectedReport
    },

    points () {
      if(!this.fetchingReports) return mapReportsToMarkers(this.filteredReports)
    },

    lines () {
      const { filteredReports } = this
      const lines = []
      if (filteredReports.length > 0) mapReportsToLines(filteredReports, lines)
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

    rerenderMapElements() {
      this.googleMapMarkers.forEach(googleMapMarker => {
        googleMapMarker.setIcon(null)
        googleMapMarker.setAnimation(null)
        googleMapMarker.setMap(null)
      })

      this.googleMapLines.forEach(googleMapLine => {
        googleMapLine.setMap(null)
      })

      this.googleMapMarkers = []
      this.googleMapLines = []

      this.showMapElements = false
      this.$nextTick(() => {
        this.showMapElements = true
      })
      this.isRerendered = true
    },

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

    filteredReports () {
      const markers = this.points
      this.selectReport(markers[0].id)
      this.rerenderMapElements()
      if(!this.fetchingReports) this.markers = mapReportsToMarkers(this.filteredReports)
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
