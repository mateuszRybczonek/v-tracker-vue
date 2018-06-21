import colorPalette from '@/constants/colorPalette'

const { COLOR_POINT, COLOR_LANDSCAPE, COLOR_BORDERS, COLOR_WATER, COLOR_LINE, COLOR_POINT_FILL, COLOR_SELECTED_POINT } = colorPalette

const COLORS = {
  BORDERS: COLOR_BORDERS,
  LANDSCAPE: COLOR_LANDSCAPE,
  LINE: COLOR_LINE,
  POINT: COLOR_POINT,
  POINT_FILL: COLOR_POINT_FILL,
  SELECTED_POINT: COLOR_SELECTED_POINT,
  WATER: COLOR_WATER
}

const POINT_MARKER_ICON_CONFIG = {
  path: 'M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
  strokeOpacity: 0.7,
  strokeWeight: 4,
  strokeColor: COLORS.POINT,
  fillColor: COLORS.POINT_FILL,
  fillOpacity: 0.7,
  scale: 1
}

const SELECTED_POINT_MARKER_ICON_CONFIG = {
  path: 'M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
  strokeOpacity: 0.8,
  strokeWeight: 8,
  strokeColor: COLORS.SELECTED_POINT,
  fillColor: COLORS.POINT_FILL,
  fillOpacity: 0.8,
  scale: 1.5
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

const mapSettings = {
  clickableIcons: false,
  streetViewControl: false,
  panControlOptions: false,
  gestureHandling: 'cooperative',
  backgroundColor: COLORS.LANDSCAPE,
  mapTypeControl: false,
  zoomControlOptions: {
    style: 'SMALL',
  },
  zoom: 5,
  minZoom: 2,
  maxZoom: 8,
  styles: [
    {
      featureType: 'landscape',
      stylers: [
          { hue: COLORS.LANDSCAPE },
          { saturation: 50.2 },
          { lightness: -34.8 },
          { gamma: 1 }
      ]
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road.highway',
      stylers: [
          { hue: COLORS.LANDSCAPE },
          { saturation: -19.8 },
          { lightness: -1.8 },
          { gamma: 1 }
      ]
    },
    {
      featureType: 'road.arterial',
      stylers: [
          { hue: COLORS.LANDSCAPE },
          { saturation: 72.4 },
          { lightness: -32.6 },
          { gamma: 1 }
      ]
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
        { color: COLORS.BORDERS },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      stylers: [
          { hue: COLORS.WATER },
          { saturation: -63.2 },
          { lightness: 38 },
          { gamma: 1 }
      ]
    }
  ],
}

const VESSELS_GOOGLE_MAP_MARKER_BASE = 'data:image/svg+xml;utf-8, \
  <svg width="36" height="36" viewBox="90 80 150 150" xmlns="http://www.w3.org/2000/svg"> \
    <path fill="rgb(0,184,83)" stroke="#FFF" stroke-width="6" d="M 200 100 c -11.5 -11.6 -27.3 -18.7 -44.9 -18.7 c -35 0 -63.4 28.5 -63.4 63.8 c 0 26 20.3 48.1 38.2 62.7 c 16.4 13.4 24 20.4 25.1 21.4 c 0.2 0.1 0.2 0.1 0.9 -0.6 c 2.3 -2.1 10 -9 24.5 -20.8 c 17.8 -14.6 38.2 -36.7 38.2 -62.7 c 0 -17.6 -7.1 -33.6 -18.6 -45.1 Z" /> \
  </svg>'

const VESSELS_GOOGLE_MAP_MARKER_CIRCLES = 'data:image/svg+xml;utf-8, \
  <svg width="36" height="36" viewBox="150 165 120 120" xmlns="http://www.w3.org/2000/svg"> \
    <g> \
      <path fill="rgba(255,255,255,0.5)" d="M241.3 211.9c-1.8-4.2-4.2-7.8-7.2-10.8s-6.6-5.5-10.8-7.2c-4.2-1.8-8.6-2.7-13.2-2.7s-9 .9-13.2 2.7c-4.2 1.8-7.8 4.2-10.8 7.2s-5.5 6.6-7.2 10.8c-1.8 4.2-2.7 8.6-2.7 13.2s.9 9 2.7 13.2c1.8 4.2 4.2 7.8 7.2 10.8s6.6 5.5 10.8 7.2c4.2 1.8 8.6 2.7 13.2 2.7s9-.9 13.2-2.7c4.2-1.8 7.8-4.2 10.8-7.2s5.5-6.6 7.2-10.8c1.8-4.2 2.7-8.6 2.7-13.2s-.9-9-2.7-13.2zm-5.7 24.1c-1.5 3.4-3.4 6.4-5.9 8.9-2.5 2.5-5.4 4.5-8.9 5.9-3.4 1.5-7 2.2-10.8 2.2s-7.4-.7-10.8-2.2c-3.4-1.5-6.4-3.4-8.9-5.9-2.5-2.5-4.5-5.4-5.9-8.9-1.5-3.4-2.2-7-2.2-10.8s.7-7.4 2.2-10.8c1.5-3.4 3.4-6.4 5.9-8.9 2.5-2.5 5.4-4.5 8.9-5.9 3.4-1.5 7-2.2 10.8-2.2 3.8 0 7.4.7 10.8 2.2 3.4 1.5 6.4 3.4 8.9 5.9 2.5 2.5 4.5 5.4 5.9 8.9 1.5 3.4 2.2 7 2.2 10.8s-.7 7.3-2.2 10.8z" /> \
      <path fill="rgba(255,255,255,1)" d="M225.3 209.9c-1.9-1.9-4.2-3.5-6.9-4.6-2.7-1.1-5.5-1.7-8.4-1.7s-5.7.6-8.4 1.7-5 2.7-6.9 4.6-3.5 4.2-4.6 6.9c-1.1 2.7-1.7 5.5-1.7 8.4 0 2.9.6 5.7 1.7 8.4s2.7 5 4.6 6.9 4.2 3.5 6.9 4.6c2.7 1.1 5.5 1.7 8.4 1.7s5.7-.6 8.4-1.7 5-2.7 6.9-4.6 3.5-4.2 4.6-6.9c1.1-2.7 1.7-5.5 1.7-8.4 0-2.9-.6-5.7-1.7-8.4s-2.7-5-4.6-6.9zm-1.1 21.3c-.8 1.9-1.9 3.6-3.3 4.9-1.4 1.4-3 2.5-4.9 3.3s-3.9 1.2-6 1.2-4.1-.4-6-1.2-3.6-1.9-4.9-3.3c-1.4-1.4-2.5-3-3.3-4.9-.8-1.9-1.2-3.9-1.2-6s.4-4.1 1.2-6 1.9-3.6 3.3-4.9c1.4-1.4 3-2.5 4.9-3.3 1.9-.8 3.9-1.2 6-1.2s4.1.4 6 1.2 3.5 1.9 4.9 3.3c1.4 1.4 2.5 3 3.3 4.9s1.2 3.9 1.2 6c.1 2.1-.4 4.1-1.2 6z" /> \
      <path fill="rgba(255,255,255,0.3)" d="M210 215.9c-2.6 0-4.7.9-6.6 2.7-1.8 1.8-2.7 4-2.7 6.6s.9 4.7 2.7 6.6c1.8 1.8 4 2.7 6.6 2.7s4.7-.9 6.6-2.7c1.8-1.8 2.7-4 2.7-6.6s-.9-4.7-2.7-6.6c-1.9-1.8-4-2.7-6.6-2.7zm2.2 11.4c-.6.6-1.3.9-2.2.9s-1.6-.3-2.2-.9c-.6-.6-.9-1.3-.9-2.2s.3-1.6.9-2.2c.6-.6 1.3-.9 2.2-.9s1.6.3 2.2.9c.6.6.9 1.3.9 2.2s-.3 1.6-.9 2.2z" /> \
    </g> \
  </svg>'

export {
  mapSettings,
  LINE_PATH_CONFIG,
  POINT_MARKER_ICON_CONFIG,
  SELECTED_POINT_MARKER_ICON_CONFIG,
  VESSELS_GOOGLE_MAP_MARKER_BASE,
  VESSELS_GOOGLE_MAP_MARKER_CIRCLES
}
