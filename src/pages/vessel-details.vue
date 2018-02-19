<template>
  <div class="vessel-details">
    <v-sidebar
      :vessel="vessel"
      :lastReport="lastReport">
    </v-sidebar>
    <div class="vessel-details__content" :class="{ 'vessel-details__content--expanded': !sidebarVisible }">
      <keep-alive>
        <component
          :is="selectedVesselDetailsComponent" :componentProps="componentProps">
        </component>
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
        'selectedVesselDetailsComponent'
      ]),

      vessel () {
        return this.vessels.find(vessel => vessel.id === this.$route.params.id)
      },

      componentProps () {
        switch (this.selectedVesselDetailsComponent) {
          case VESSEL_DASHBOARD:
            return {
              lastReport: this.lastReport,
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

      lastReport () {
        return this.reportsSortedAsc.slice(-1)[0]
      },

      previousReport () {
        return this.reportsSortedAsc.slice(-2)[0]
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
</style>
