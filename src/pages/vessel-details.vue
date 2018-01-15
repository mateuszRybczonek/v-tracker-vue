<template>
  <div class="vessel-details">
    <!--<md-app md-waterfall md-mode="fixed" class="vessel-details__header">-->
      <!--<md-app-toolbar class="md-primary">-->
        <!--<span class="md-title">Vessel details</span>-->
      <!--</md-app-toolbar>-->

    <v-sidebar
      :vessel="vessel"
    >

    </v-sidebar>
    <div class="vessel-details__content">
      <div class="vessel-details__last-report">
        <h3>Last reported data: {{lastReport.reportTime}}</h3>
      </div>
      <remaining-on-board
        class="vessel-details__item"
        :vessel="vessel"
        :lastReport="lastReport">
      </remaining-on-board>
    </div>

      <!--</md-app-content>-->
    <!--</md-app>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VesselInfo from '../components/vessel-details/vessel-info.vue'
  import RemainingOnBoard from '../components/vessel-details/remaining-on-board.vue'
  import VSidebar from '../components/molecules/sidebar.vue'

  export default {
    name: 'Waterfall',

    created () {
      this.$store.dispatch('fetchReports')
    },

    computed: {
      ...mapGetters([
        'vessels',
        'reports'
      ]),

      vessel () {
        return this.vessels.find(vessel => vessel.id === this.$route.params.id)
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
      RemainingOnBoard,
      VesselInfo,
      VSidebar
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
      margin-left: 300px;
      padding: 0 15px;
    }

    &__last-report {
      display: flex;
      justify-content: center;
      margin: 40px 20px;
    }

    &__item {
      margin-top: 40px;
    }
  }
</style>
