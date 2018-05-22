<template>
  <div class="google-map">
    <content-placeholders
      data-test-google-map-placeholder
      class="google-map__placeholder"
      v-if="fetchingReports"
    >
      <content-placeholders-img class="google-map__placeholder"></content-placeholders-img>
    </content-placeholders>

    <div
      v-else
      data-test-google-map
      class="google-map__map"
    >
      <gmap-map
        :options="mapSettings.defaultMapOptions"
        :center="this.mapCenter"
        style="height: 460px;"
      >
        <gmap-info-window
          :options="infoOptions"
          :position="infoPosition"
          :opened="infoOpened"
          @closeclick="infoOpened=false"
        >
          {{infoContent}}
        </gmap-info-window>
        <gmap-marker class="google-map__marker"
          v-for="(marker, index) in markers"
          :key="marker.id"
          :position="marker.position"
          :class="{ 'selected': marker.selected }"
          :icon="mapSettings.defaultIconSettings"
          @click="selectMarker(marker)"
        />
        <gmap-polyline
          v-for="(line, index) in lines"
          :key="index"
          :path.sync="line.path"
          :options="linePathConfig"
        />
      </gmap-map>
    </div>
  </div>
</template>

<script>
import {
  mapSettings,
  LINE_PATH_CONFIG
} from '@/constants/mapSettings'

import { mapGetters } from 'vuex'

export default {
  name: "GoogleMap",

  data() {
    return {
      linePathConfig: LINE_PATH_CONFIG,
      mapSettings,
      markers: this.points,
      places: [],
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
      }
    }
  },

  mounted() {
    this.markers = this.points
  },

  computed: {
    ...mapGetters([
      'reports',
      'sortedReports',
      'fetchingReports'
    ]),

    points () {
      if(!this.fetchingReports) {
        return this.reports.map(report => {
          return {
            id: report.id,
            reportTime: report.reportTime,
            position: {
              lat: report.lat,
              lng: report.lng
            }
          }
        })
      }
    },

    lines () {
      const lines = [];
      const reports = this.reports

      if (reports.length > 0) {
        reports.forEach( (report, index) => {
          const nextReport = reports[index + 1]

          if (nextReport === undefined) return

          const depLat = report.lat
          const depLng = report.lng
          const arrLat = nextReport.lat
          const arrLng = nextReport.lng

          lines.push({
            path: [
              { lat: depLat, lng: depLng },
              { lat: arrLat, lng: arrLng },
            ]
          })
        })
      }

      return lines;
    },

    mapCenter () {
      const reports = this.reports
      const lastReport = reports[0]
      return {
        lat: lastReport.lat,
        lng: lastReport.lng
      }
    }
  },

  watch: {
    reports () {
      if(!this.fetchingReports) {
        const markers = this.reports.map(report => {
          return {
            id: report.id,
            reportTime: report.reportTime,
            position: {
              lat: report.lat,
              lng: report.lng
            }
          }
        })
        this.markers = markers
      }
    }
  },

  methods: {
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({
          position: marker
        })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },

    selectMarker(marker) {
      this.infoPosition = marker.position
      this.infoContent = marker.reportTime
      if (this.infoCurrentKey == marker.id) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = marker.id
        const report = this.reports.find(report => report.id === marker.id)
        marker.selected = true
        this.$emit('markerClicked', report)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .google-map {
    display: flex;
    justify-content: center;
    align-items: center;
    @include box-shadow(0 0 100px 1px rgba(0,0,0,0.1));

    &__map {
      width: 100%;
    }

    &__placeholder {
      height: 460px;
      width: 100%;
    }

    &__marker.selected {
      transform: scale(1.5);
    }
  }
</style>