<template>
  <div class="sidebar__quick-links" :class="{ 'sidebar__quick-links--vertical': vertical }">
    <button
      v-for="button in buttons"
      class="sidebar__quick-links__icon"
      :class="{ 'sidebar__quick-links__icon--active': selectedComponent === button.component }"
      @click="selectVesselDetailsComponent(button.component)">
      <v-icon :icon=button.icon size="small" color="white"></v-icon>
    </button>
  </div>
</template>

<script>
  import VIcon from '../atoms/icon.vue'
  import EventBus from '../../services/event-bus.js'

  export default {
    data () {
      return {
        selectedComponent: 'v-vessel-dashboard'
      }
    },

    props: ['vertical'],

    computed: {
      buttons () {
        return [
          {
            'icon': 'overview',
            'component': 'v-vessel-dashboard'
          }, {
            'icon': 'files',
            'component': 'v-reports'
          }, {
            'icon': 'weather',
            'component': 'v-weather'
          }, {
            'icon': 'statistics',
            'component': 'v-statistics'
          }
        ]
      }
    },

    methods: {
      selectVesselDetailsComponent (component) {
        this.selectedComponent = component
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

    &--vertical {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 0;
      padding: 0;

      .sidebar__quick-links__icon {
        width: 50px;
        height: 50px;
        transition: all 1s;
      }
    }

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

      &--active {
        background-color: $color-whitey;

        &:hover {
          background-color: $color-whitey;
        }

        > i {
          background-color: $color-dark-blue;
        }
      }
    }
  }
</style>
