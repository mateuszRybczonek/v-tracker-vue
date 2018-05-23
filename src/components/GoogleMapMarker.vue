<template></template>
<script>
import { POINT_MARKER_ICON_CONFIG } from '@/constants/mapSettings'

export default {
  inject: ["google", "map"],
  props: {
    position: Object
  },

  data (){
    return { marker: null}
  },

  mounted (){
    const { Marker } = this.google.maps
    this.marker = new Marker({
      clickable: true,
      position: this.position,
      map: this.map,
      icon: POINT_MARKER_ICON_CONFIG
    })
  }
}
</script>
