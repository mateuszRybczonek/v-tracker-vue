<template>
  <div class='google-map'>
    <content-placeholders
      data-test-google-map-placeholder
      class='google-map__placeholder'
      v-if='fetchingReports'
    >
      <content-placeholders-img class='google-map__placeholder'></content-placeholders-img>
    </content-placeholders>

    <GoogleMap
      v-else
      data-test-google-map
      class='google-map__map'
      :markers='markers'
      :lines='lines'
      :center='mapCenter'
      @selectMarker='selectMarker'
    ></GoogleMap>
    <!-- <gmap-map
      :options='mapSettings.defaultMapOptions'
      :center='this.mapCenter'
      style='height: 460px;'
    >
      <gmap-info-window
        :options='infoOptions'
        :position='infoPosition'
        :opened='infoOpened'
        @closeclick='infoOpened=false'
      >
        {{infoContent}}
      </gmap-info-window>
      <gmap-marker data-test-google-map-marker class='google-map__marker'
        v-for='(marker, index) in markers'
        :key='marker.id'
        :position='marker.position'
        :icon='mapSettings.defaultIconSettings'
        @click='selectMarker(marker)'
      />
      <gmap-polyline
        v-for='(line, index) in lines'
        :key='index'
        :path.sync='line.path'
        :options='linePathConfig'
      />
    </gmap-map> -->
  </div>
</template>

<script>
import {
  mapSettings,
  LINE_PATH_CONFIG
} from '@/constants/mapSettings'

import { mapGetters } from 'vuex'
import {
  mapReportsToMarkers,
  mapReportsToLines
} from '@/utils/google-map-utils'

import GoogleMap from '@/components/GoogleMap'

export default {
  components: {
    GoogleMap
  },

  data() {
    return {
      linePathConfig: LINE_PATH_CONFIG,
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
      if(!this.fetchingReports) return mapReportsToMarkers(this.reports)
    },

    lines () {
      const { reports } = this
      const lines = []
      if (reports.length > 0) mapReportsToLines(reports, lines)
      return lines
    },

    mapCenter () {
      const lastReport = this.reports[0]

      return {
        lat: lastReport.lat,
        lng: lastReport.lng
      }
    }
  },

  watch: {
    reports () {
      if(!this.fetchingReports) this.markers = mapReportsToMarkers(this.reports)
    }
  },

  methods: {
    selectMarker(marker) {
      const markerId = marker.id
      this.infoPosition = marker.position
      this.infoContent = marker.reportTime
      if (this.infoCurrentKey === markerId) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = markerId
        const report = this.reports.find(report => report.id === markerId)
        this.$emit('markerClicked', report)
      }
    }
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
