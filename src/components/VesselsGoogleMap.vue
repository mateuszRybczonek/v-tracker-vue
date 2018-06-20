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
import { mapSettings } from '@/constants/mapSettings'
import { mapActions } from 'vuex'
import { get } from 'vuex-pathify'
import { mapReportsToMarkers } from '@/utils/google-map-utils'
import { decimalToDMS } from '@/utils/coordinates-utils'


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
        url: 'data:image/svg+xml;utf-8, \
          <svg width="36" height="36" viewBox="90 80 150 150" xmlns="http://www.w3.org/2000/svg"> \
            <path fill="rgb(0,184,83)" stroke="#FFF" stroke-width="6" d="M 200 100 c -11.5 -11.6 -27.3 -18.7 -44.9 -18.7 c -35 0 -63.4 28.5 -63.4 63.8 c 0 26 20.3 48.1 38.2 62.7 c 16.4 13.4 24 20.4 25.1 21.4 c 0.2 0.1 0.2 0.1 0.9 -0.6 c 2.3 -2.1 10 -9 24.5 -20.8 c 17.8 -14.6 38.2 -36.7 38.2 -62.7 c 0 -17.6 -7.1 -33.6 -18.6 -45.1 Z" /> \
          </svg>'
      }
    },

    markerConfigCircles () {
      return {
        // eslint-disable-next-line no-undef
        anchor: new google.maps.Point(18, 34),
        url: 'data:image/svg+xml;utf-8, \
          <svg width="36" height="36" viewBox="150 165 120 120" xmlns="http://www.w3.org/2000/svg"> \
            <g> \
              <path fill="rgba(255,255,255,0.5)" d="M241.3 211.9c-1.8-4.2-4.2-7.8-7.2-10.8s-6.6-5.5-10.8-7.2c-4.2-1.8-8.6-2.7-13.2-2.7s-9 .9-13.2 2.7c-4.2 1.8-7.8 4.2-10.8 7.2s-5.5 6.6-7.2 10.8c-1.8 4.2-2.7 8.6-2.7 13.2s.9 9 2.7 13.2c1.8 4.2 4.2 7.8 7.2 10.8s6.6 5.5 10.8 7.2c4.2 1.8 8.6 2.7 13.2 2.7s9-.9 13.2-2.7c4.2-1.8 7.8-4.2 10.8-7.2s5.5-6.6 7.2-10.8c1.8-4.2 2.7-8.6 2.7-13.2s-.9-9-2.7-13.2zm-5.7 24.1c-1.5 3.4-3.4 6.4-5.9 8.9-2.5 2.5-5.4 4.5-8.9 5.9-3.4 1.5-7 2.2-10.8 2.2s-7.4-.7-10.8-2.2c-3.4-1.5-6.4-3.4-8.9-5.9-2.5-2.5-4.5-5.4-5.9-8.9-1.5-3.4-2.2-7-2.2-10.8s.7-7.4 2.2-10.8c1.5-3.4 3.4-6.4 5.9-8.9 2.5-2.5 5.4-4.5 8.9-5.9 3.4-1.5 7-2.2 10.8-2.2 3.8 0 7.4.7 10.8 2.2 3.4 1.5 6.4 3.4 8.9 5.9 2.5 2.5 4.5 5.4 5.9 8.9 1.5 3.4 2.2 7 2.2 10.8s-.7 7.3-2.2 10.8z" /> \
              <path fill="rgba(255,255,255,1)" d="M225.3 209.9c-1.9-1.9-4.2-3.5-6.9-4.6-2.7-1.1-5.5-1.7-8.4-1.7s-5.7.6-8.4 1.7-5 2.7-6.9 4.6-3.5 4.2-4.6 6.9c-1.1 2.7-1.7 5.5-1.7 8.4 0 2.9.6 5.7 1.7 8.4s2.7 5 4.6 6.9 4.2 3.5 6.9 4.6c2.7 1.1 5.5 1.7 8.4 1.7s5.7-.6 8.4-1.7 5-2.7 6.9-4.6 3.5-4.2 4.6-6.9c1.1-2.7 1.7-5.5 1.7-8.4 0-2.9-.6-5.7-1.7-8.4s-2.7-5-4.6-6.9zm-1.1 21.3c-.8 1.9-1.9 3.6-3.3 4.9-1.4 1.4-3 2.5-4.9 3.3s-3.9 1.2-6 1.2-4.1-.4-6-1.2-3.6-1.9-4.9-3.3c-1.4-1.4-2.5-3-3.3-4.9-.8-1.9-1.2-3.9-1.2-6s.4-4.1 1.2-6 1.9-3.6 3.3-4.9c1.4-1.4 3-2.5 4.9-3.3 1.9-.8 3.9-1.2 6-1.2s4.1.4 6 1.2 3.5 1.9 4.9 3.3c1.4 1.4 2.5 3 3.3 4.9s1.2 3.9 1.2 6c.1 2.1-.4 4.1-1.2 6z" /> \
              <path fill="rgba(255,255,255,0.3)" d="M210 215.9c-2.6 0-4.7.9-6.6 2.7-1.8 1.8-2.7 4-2.7 6.6s.9 4.7 2.7 6.6c1.8 1.8 4 2.7 6.6 2.7s4.7-.9 6.6-2.7c1.8-1.8 2.7-4 2.7-6.6s-.9-4.7-2.7-6.6c-1.9-1.8-4-2.7-6.6-2.7zm2.2 11.4c-.6.6-1.3.9-2.2.9s-1.6-.3-2.2-.9c-.6-.6-.9-1.3-.9-2.2s.3-1.6.9-2.2c.6-.6 1.3-.9 2.2-.9s1.6.3 2.2.9c.6.6.9 1.3.9 2.2s-.3 1.6-.9 2.2z" /> \
            </g> \
          </svg>'
      }
    },

    points () {
      if(!this.fetchingVessels) {
        const lastReports = this.vessels.map(vessel => {
          const { lastReport, name } = vessel

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

      // eslint-disable-next-line no-undef
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="iw-container">
            <div class="iw-title">
              <span>${vesselName}</span>
            </div>
            <div class="iw-body">
              <span>${reportTime}</span>
              <div class="iw-body__position">
                <span class="iw-body__item">
                  <span>Latitude:</span>
                  <span>${decimalToDMS(lat)}</span>
                </span>
                <span class="iw-body__item">
                  <span>Longitude:</span>
                  <span>${decimalToDMS(lng, false)}</span>
                </span>
                <a href="/dashboard/vessels/${vesselId}" class="router-link-exact-active router-link-active">Go to details</a>
              </div>
            </div>
          </div>
        `
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
