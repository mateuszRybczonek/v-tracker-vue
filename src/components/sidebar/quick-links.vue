<template>
  <div class="sidebar__quick-links">
    <button
      v-for="button in buttons"
      class="sidebar__quick-links__icon"
      @click="selectVesselDetailsComponent(button.component)">
      {{button.icon}}
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
            'icon': 'A',
            'component': 'v-vessel-dashboard'
          }, {
            'icon': 'B',
            'component': 'v-weather'
          }, {
            'icon': 'C',
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
