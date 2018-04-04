<template>
  <div
    class="quick-links"
    :class="{ 'quick-links--vertical': vertical }"
  >
    <button
      v-for="button in buttons"
      :key="button.component"
      class="quick-links__icon"
      :class="{ 'quick-links__icon--active': selectedVesselDetailsComponent === button.component }"
      @click="selectVesselDetailsComponent(button.component)">
      <BaseIcon
        width="32"
        height="32"
        :viewBox="button.viewBox"
      >
        <component :is="button.icon"></component>
      </BaseIcon>
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { COMPONENT_NAMES } from '../constants/vessel-details'
  import BaseIcon from './BaseIcon.vue'
  import IconFiles from './Icons/IconFiles.vue'
  import IconOverview from './Icons/IconOverview.vue'
  import IconWeather from './Icons/IconWeather.vue'
  import IconStatistics from './Icons/IconStatistics.vue'

  const { VESSEL_DASHBOARD, REPORTS, WEATHER, STATISTICS } = COMPONENT_NAMES

  export default {
    props: {
      vertical: {
        type: Boolean,
        required: true
      }
    },

    computed: {
      ...mapGetters([
        'selectedVesselDetailsComponent'
      ]),

      buttons () {
        return [
          {
            'icon': 'IconOverview',
            'component': VESSEL_DASHBOARD
          }, {
            'icon': 'IconFiles',
            'component': REPORTS
          }, {
            'icon': 'IconWeather',
            'component': WEATHER,
            'viewBox': '0 0 32 32'
          }, {
            'icon': 'IconStatistics',
            'component': STATISTICS
          }
        ]
      }
    },

    methods: {
      selectVesselDetailsComponent (componentName) {
        this.$store.dispatch('selectedVesselDetailsComponent', componentName)
      }
    },

    components: {
      IconFiles,
      BaseIcon,
      IconOverview,
      IconWeather,
      IconStatistics
    }
  }
</script>

<style scoped lang="scss">
  .quick-links {
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

      .quick-links__icon {
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
      color: $color-whitey;
      list-style-type: none;
      padding: 0;
      border: none;

      &:hover {
        background-color: $color-dark-blue;
      }

      &--active {
        background-color: $color-whitey;
        color: $color-dark-blue;

        g {
          fill: $color-dark-blue;
        }

        &:hover {
          background-color: $color-whitey;
        }

      }
    }
  }
</style>
