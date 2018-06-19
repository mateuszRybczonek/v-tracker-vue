<template></template>
<script>
import { POINT_MARKER_ICON_CONFIG } from '@/constants/mapSettings'

export default {
  props: {
    google: Object,
    map: Object,
    marker: Object,
    markerIcon: Object,
    googleMapMarkers: Array,
    pulse: Boolean
  },

  data () {
    return { googleMarker: null }
  },

  mounted () {
    const { Marker } = this.google.maps

    this.googleMarker = new Marker({
      clickable: true,
      position: this.marker.position,
      marker: this.marker,
      clickHandler: this.clickHandler,
      map: this.map,
      icon: this.markerIcon || POINT_MARKER_ICON_CONFIG,
      pulse: this.pulse
    })

    this.googleMarker.addListener('click', () => {
      this.$emit('selectMarker', this.marker, this.googleMarker)
    })

    this.googleMapMarkers.push(this.googleMarker)

    if (this.googleMarker.pulse) {
      this.fadeInMarker(this.googleMarker, 0, 'UP')
    }
  },

  methods: {
    fadeInMarker (marker, markerOpacity, direction) {
      const markerOpacityIncrement = 0.03

      if (direction === 'UP') {
        if (markerOpacity >= 1) {
          direction = 'DOWN'
        } else {
          marker.setOpacity(markerOpacity)
          markerOpacity += markerOpacityIncrement
        }
      } else {
        if (markerOpacity <= 0) {
          direction = 'UP'
        } else {
          marker.setOpacity(markerOpacity)
          markerOpacity -= markerOpacityIncrement
        }
      }

      setTimeout(() => {
        this.fadeInMarker(marker, markerOpacity, direction)
      }, 50)
    }
  }
}
</script>
