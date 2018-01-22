<template>
  <div class="sidebar__quick-links">
    <button
      v-for="button in buttons"
      class="sidebar__quick-links__icon"
      @click="selectVesselDetailsComponent(button.component)">
      <v-icon :icon=button.icon size="small" color="white"></v-icon>
    </button>
  </div>
</template>

<script>
  import VIcon from '../atoms/icon.vue'
  import EventBus from '../../services/event-bus.js'

  export default {
    computed: {
      buttons () {
        return [
          {
            'icon': 'trash',
            'component': 'v-vessel-dashboard'
          }, {
            'icon': 'trash',
            'component': 'v-weather'
          }, {
            'icon': 'trash',
            'component': 'v-statistics'
          }
        ]
      }
    },

    methods: {
      selectVesselDetailsComponent (component) {
        EventBus.selectVesselDetailsComponent(component)
      }
    },

    components: {
      VIcon
    }
  }
</script>

<style scoped lang="scss">
  .sidebar__quick-links {
    display: flex;
    justify-content: center;
    padding: 0 30px;
    margin-top: 20px;
    &__icon {
      display: flex;
      justify-content: center;
      transition: .6s ease-out;
      width: 90px;
      height: 30px;
      background-color: $color-blue-grey;
      list-style-type: none;
      padding: 0;
      border: none;

      &:hover {
        background-color: $color-dark-blue;
      }
    }
  }
</style>
