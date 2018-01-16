import Vue from 'vue'

const EventBus = new Vue({
  methods: {
    sidebarToggle (show) {
      this.$emit('sidebarToggle', show)
    },

    selectVesselDetailsComponent (component) {
      this.$emit('selectVesselDetailsComponent', component)
    }
  }
})

export default EventBus
