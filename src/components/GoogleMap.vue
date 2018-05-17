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
        :center="center"
        :zoom="9"
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
        <gmap-marker
          :key="marker.id"
          v-for="(marker, index) in markers"
          :position="marker.position"
          @click="toggleInfo(marker)"/>
      </gmap-map>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",

  props: {
    fetchingReports: {
      type: Boolean
    },
    reports: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      center: { lat: 54.5, lng: 18.5 },
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
          height: -35
        }
      }
    }
  },

  mounted() {
    console.log(this.reports)
    this.markers = this.points
  },

  computed: {
    points () {
      if(!this.fetchingReports) {
        return this.reports.map(report => {
          return {
            id: report.id,
            position: {
              lat: report.lat,
              lng: report.lng
            }
          }
        })
      }
    }
  },

  watch: {
    reports () {
      if(!this.fetchingReports) {
        const markers = this.reports.map(report => {
          return {
            id: report.id,
            position: {
              lat: report.lat,
              lng: report.lng
            },
            // icon: {
            //   path: 'M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
            //   strokeOpacity: 1,
            //   strokeWeight: 4,
            //   strokeColor: '#FFFFFF',
            //   fillColor: '#FFFFFF',
            //   fillOpacity: 1,
            //   scale: 1,
            // },
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
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },

    toggleInfo(marker) {
      this.infoPosition = marker.position
      this.infoContent = marker.id
      if (this.infoCurrentKey == marker.id) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = marker.id
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
  }
</style>
