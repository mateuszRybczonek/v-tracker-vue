import Vue from 'vue'
import { loaded } from 'vue2-google-maps'
import colorPalette from '@/constants/colorPalette'

const { COLOR_POINT, COLOR_WATER, COLOR_LANDSCAPE } = colorPalette

const COLORS = {
  POINT: COLOR_POINT,
  LINE: '#FFFFFF',
  WATER: COLOR_WATER,
  LANDSCAPE: COLOR_LANDSCAPE,
}

const POINT_MARKER_ICON_CONFIG = {
  path: 'M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
  strokeOpacity: 1,
  strokeWeight: 4,
  strokeColor: COLORS.POINT,
  fillColor: '#FFFFFF',
  fillOpacity: 1,
  scale: 1
}

const LINE_SYMBOL_CONFIG = {
  path: 'M 0,-2 0,2',
  strokeOpacity: 1,
  strokeWeight: 2,
  scale: 1,
}

const LINE_PATH_CONFIG = {
  clickable: false,
  geodesic: false,
  strokeOpacity: 0,
  strokeColor: COLORS.LINE,
  icons: [{
    icon: LINE_SYMBOL_CONFIG,
    repeat: '10px',
  }],
}

const settings = new Vue({
    data() {
      return {
        defaultIconSettings: POINT_MARKER_ICON_CONFIG,
        defaultMapOptions: {
          clickableIcons: false,
	        streetViewControl: false,
	        panControlOptions: false,
	        gestureHandling: 'greedy',
          streetViewControl: false,
          backgroundColor: COLORS.LANDSCAPE,
          mapTypeControl: false,
          zoomControlOptions: {
            style: 'SMALL',
          },
          zoom: 8,
          minZoom: 2,
          maxZoom: 8,
          styles: [
            {
              featureType: 'landscape',
              elementType: 'geometry.fill',
              stylers: [{ color: COLORS.LANDSCAPE }],
            },
            {
              featureType: 'poi',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'road.highway',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'road.arterial',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'road.local',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'transit',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'administrative.province',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'administrative.locality',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'administrative.province',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'administrative.land_parcel',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'administrative.neighborhood',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'administrative.country',
              elementType: 'geometry.stroke',
              stylers: [
                { visibility: 'on' },
                { color: COLORS.WATER },
              ],
            },
            {
              featureType: 'administrative',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [
                { color: COLORS.WATER },
              ],
            },
          ],
        }
      }
    }
})

export {
  settings,
  LINE_PATH_CONFIG
}

loaded.then(() => {
    // settings.defaultIconSettings = /* Do something with google.maps.Size */
})
