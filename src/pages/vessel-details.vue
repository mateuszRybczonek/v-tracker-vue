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
  import VReports from '../components/vessel-details/reports/main.vue'

  export default {
    data () {
      return {
        expandContent: false,
        selectedComponent: 'v-vessel-dashboard'
      }
    },

    created () {
      this.$store.dispatch('fetchReports', this.$route.params.id)
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
        'reports',
      ]),

      vessel () {
        return this.vessels.find(vessel => vessel.id === this.$route.params.id)
      },

      componentProps () {
        if (this.selectedComponent === 'v-vessel-dashboard') {
          return {
            lastReport: this.lastReport,
            previousReport: this.previousReport
          }
        }
      },

//      reports () {
//        return [
//          {
//            reportTime: '2018-01-02',
//            course: 230,
//            spd: 15,
//            doRob: 200,
//            foRob: 100,
//            fwRob: 300,
//            lat: 20,
//            lng: 20,
//            pitch: 0.5,
//            pob: 50,
//            roll: 1,
//            seaState: 3,
//            swellDir: 200,
//            swellHeight: 2,
//            updatedAt: '2017-09-01T10:46:14.631Z',
//            vessel: this.$route.params.id,
//            windDir: 120,
//            windSpd: 14
//          }, {
//            reportTime: '2018-01-04',
//            lat: 13.505,
//            lng: 73.893,
//            course: 230,
//            spd: 17,
//            windDir: 120,
//            windSpd: 15,
//            seaState: 3,
//            swellDir: 200,
//            swellHeight: 3,
//            pitch: 0.5,
//            roll: 1,
//            doRob: 160,
//            foRob: 100,
//            fwRob: 320,
//            pob: 50,
//            updatedAt: '2017-09-01T10:46:14.631Z',
//            vessel: this.$route.params.id
//          }, {
//            reportTime: '2018-01-03',
//            course: 230,
//            spd: 15,
//            doRob: 180,
//            foRob: 100,
//            fwRob: 300,
//            lat: 20,
//            lng: 20,
//            pitch: 0.5,
//            pob: 50,
//            roll: 1,
//            seaState: 3,
//            swellDir: 200,
//            swellHeight: 2,
//            updatedAt: '2017-09-01T10:46:14.631Z',
//            vessel: this.$route.params.id,
//            windDir: 120,
//            windSpd: 14
//          }
//        ]
//      },

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
