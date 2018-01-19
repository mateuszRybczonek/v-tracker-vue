<template>
  <div class="vessel-details">
    <v-sidebar
      :vessel="vessel"
      :lastReport="lastReport">
    </v-sidebar>
    <div class="vessel-details__content" :class="{ 'vessel-details__content--expanded': expandContent }">
      <keep-alive>
        <component
          :is="selectedComponent" :componentProps="componentProps">
        </component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import EventBus from '../services/event-bus.js'
  import VSidebar from '../components/sidebar/main.vue'
  import VVesselDashboard from '../components/vessel-details/dashboard/main.vue'
  import VStatistics from '../components/vessel-details/statistics/main.vue'
  import VWeather from '../components/vessel-details/weather/main.vue'

  export default {
    data () {
      return {
        expandContent: false,
        selectedComponent: 'v-vessel-dashboard'
      }
    },

    created () {
      this.$store.dispatch('fetchReports')
      EventBus.$on('sidebarToggle', this.sidebarToggleHandler)
      EventBus.$on('selectVesselDetailsComponent', this.selectVesselDetailsComponentHandler)
    },

    methods: {
      sidebarToggleHandler (sidebarVisible) {
        this.expandContent = !sidebarVisible
      },

      selectVesselDetailsComponentHandler (component) {
        this.selectedComponent = component
      }
    },

    computed: {
      ...mapGetters([
        'vessels',
        'reports'
      ]),

      vessel () {
        return this.vessels.find(vessel => vessel.id === this.$route.params.id)
      },

      componentProps () {
        if (this.selectedComponent === 'v-vessel-dashboard') {
          return { lastReport: this.lastReport }
        }
      },

      reports () {
        return [
          {
            reportTime: '2018-01-02',
            course: 230,
            doRob: 200,
            foRob: 100,
            fwRob: 300,
            lat: 20,
            lng: 20,
            pitch: 0.5,
            pob: 50,
            roll: 1,
            seaState: 3,
            swellDir: 200,
            swellHeight: 2,
            updatedAt: '2017-09-01T10:46:14.631Z',
            vessel: this.$route.params.id,
            windDir: 120,
            windSpd: 14
          }, {
            reportTime: '2018-01-04',
            course: 230,
            doRob: 200,
            foRob: 100,
            fwRob: 300,
            lat: 20,
            lng: 20,
            pitch: 0.5,
            pob: 50,
            roll: 1,
            seaState: 3,
            swellDir: 200,
            swellHeight: 2,
            updatedAt: '2017-09-01T10:46:14.631Z',
            vessel: this.$route.params.id,
            windDir: 120,
            windSpd: 14
          }, {
            reportTime: '2018-01-03',
            course: 230,
            doRob: 200,
            foRob: 100,
            fwRob: 300,
            lat: 20,
            lng: 20,
            pitch: 0.5,
            pob: 50,
            roll: 1,
            seaState: 3,
            swellDir: 200,
            swellHeight: 2,
            updatedAt: '2017-09-01T10:46:14.631Z',
            vessel: this.$route.params.id,
            windDir: 120,
            windSpd: 14
          }
        ]
      },

      reportsSortedAsc () {
        return this.reports.sort((a, b) => a.reportTime > b.reportTime)
      },

      reportsSortedDesc () {
        return this.reports.sort((a, b) => a.reportTime < b.reportTime)
      },

      lastReport () {
        return this.reportsSortedAsc.pop()
      }
    },

    components: {
      VSidebar,
      VVesselDashboard,
      VStatistics,
      VWeather
    }
  }
</script>

<style scoped lang="scss">
  .vessel-details {
    h1, p {
      text-align: center;
    }

    h1 {
      margin: 50px 0;
    }

    &__content {
      transition: margin-left .5s;
      margin-left: 300px;
      padding: 0 15px;

      &--expanded {
        margin-left: 50px;
      }
    }

    &__last-report {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 40px 20px;
    }

    &__item {
      margin-top: 40px;
    }
  }
</style>
