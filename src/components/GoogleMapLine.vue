<template></template>
<script>
import { LINE_PATH_CONFIG } from '@/constants/mapSettings'

export default {
  props: {
    google: Object,
    map: Object,
    path: Array,
    googleMapLines: Array,
  },

  data () {
    return { line: null }
  },

  mounted () {
    const { Polyline } = this.google.maps
    this.line = new Polyline({
      clickable: false,
      path: this.path,
      map: this.map,
      ...LINE_PATH_CONFIG
    })

    this.googleMapLines.push(this.line)
  }
}
</script>
