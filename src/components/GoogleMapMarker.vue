<template></template>
<script>
import {
  POINT_MARKER_ICON_CONFIG
} from '@/constants/mapSettings'

export default {
  props: {
    google: Object,
    map: Object,
    marker: Object,
    googleMapMarkers: Array
  },

  data () {
    return { googleMarker: null}
  },

  mounted () {
    const { Marker } = this.google.maps
    this.googleMarker = new Marker({
      clickable: true,
      position: this.marker.position,
      marker: this.marker,
      clickHandler: this.clickHandler,
      map: this.map,
      icon: POINT_MARKER_ICON_CONFIG
    })

    this.googleMarker.addListener('click', () => {
      this.$emit('selectMarker', this.marker)
    })

    this.googleMapMarkers.push(this.googleMarker)
  }
}
</script>
