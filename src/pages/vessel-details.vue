<template>
  <div class="vessel-details">
    <v-sidebar
      :vessel="vessel"
      :report="selectedReport"
      :lastReport="lastReport">
    </v-sidebar>
    <div class="vessel-details__content" :class="{ 'vessel-details__content--expanded': !sidebarVisible }">
      <keep-alive>
        <transition name="slide" mode="out-in">
          <component
            :is="selectedVesselDetailsComponent" :componentProps="componentProps">
          </component>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VSidebar from '../components/sidebar/main.vue'
  import VVesselDashboard from '../components/vessel-details/dashboard/main.vue'
  import VStatistics from '../components/vessel-details/statistics/main.vue'
  import VWeather from '../components/vessel-details/weather/main.vue'
  import VReports from '../components/vessel-details/reports/main.vue'
  import { COMPONENT_NAMES } from '../constants/vessel-details'

  const { VESSEL_DASHBOARD, REPORTS, WEATHER, STATISTICS } = COMPONENT_NAMES

  export default {
    created () {
      this.$store.dispatch('fetchReports', this.$route.params.id)
    },

    computed: {
      ...mapGetters([
        'vessels',
        'reports',
        'sidebarVisible',
        'selectedVesselDetailsComponent',
        'selectedReport'
      ]),

      vessel () {
        return this.vessels.find(vessel => vessel.id === this.$route.params.id)
      },

      componentProps () {
        switch (this.selectedVesselDetailsComponent) {
          case VESSEL_DASHBOARD:
            return {
              report: this.selectedReport,
              previousReport: this.previousReport
            }
          case REPORTS:
            return {
              reports: this.reports
            }
          case WEATHER: return {}
          case STATISTICS: return {}
        }
      },

      reportsSortedAsc () {
        return this.reports.sort((a, b) => a.reportTime > b.reportTime)
      },

      reportsSortedDesc () {
        return this.reports.sort((a, b) => a.reportTime < b.reportTime)
      },

      previousReport () {
        return this.reportsSortedAsc.slice(-2)[0]
      },

      lastReport () {
        return this.reportsSortedAsc.slice(-1)[0]
      }
    },

    components: {
      VSidebar,
      VVesselDashboard,
      VStatistics,
      VWeather,
      VReports
    }
  }
</script>

<style scoped lang="scss">
  .vessel-details {
    h1, p {
      text-align: center;
    }

    h1 {
      padding: 50px 0;
    }

    &__content {
      transition: margin-left .5s;
      margin-left: 300px;
      padding: 0 15px;

      &--expanded {
        margin-left: 50px;
      }
    }

    &__item {
      margin-top: 20px;
    }
  }

  .fade-enter {
    /*1 frame at the beginning*/
    opacity: 0;
  }

  .fade-enter-active {
      transition:  opacity 500ms;
  }

  .fade-leave {
      /*opacity: 1;*/
  }

  .fade-leave-active {
      transition:  opacity 500ms;
      opacity: 0;
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 250ms ease-out forwards;
    transition:  opacity 250ms;
  }

  .slide-leave-active {
    animation: slide-out 250ms ease-out backwards;
    transition:  opacity 250ms;
    opacity: 0;

    /*to animate when the list item is removed*/
    position: absolute;
  }

  @keyframes slide-in {
    from {
      transform: rotateY(90deg);
      transform-origin: left;
    }
    to {
      transform: rotateY(0);
      transform-origin: left;
    }
  }

  @keyframes slide-out {
    from {
      transform: rotateY(0);
      transform-origin: left;
    }
    to {
      transform: rotateY(90deg);
      transform-origin: left;
    }
  }
</style>
