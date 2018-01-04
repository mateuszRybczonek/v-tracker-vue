<template>
  <div id="vessel-details">
    <h1>Vessel details</h1>
    <h1>{{vessel.name}}</h1>
    <mini-stats :vessel="vessel" :lastReport="lastReport"></mini-stats>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MiniStats from '../components/vessel-details/mini-stats.vue'

  export default {
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
      MiniStats
    }
  }
</script>

<style scoped lang="scss">
  h1, p {
    text-align: center;
  }

  h1 {
    margin: 50px 0;
  }
</style>
