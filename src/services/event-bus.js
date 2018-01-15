import Vue from 'vue'

const EventBus = new Vue({
  methods: {
    sidebarToggle (show) {
      this.$emit('sidebarToggle', show)
    }
  }
})

export default EventBus
