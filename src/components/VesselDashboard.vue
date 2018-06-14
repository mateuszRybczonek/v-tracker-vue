<template>
  <div
    data-test-vessel-dashboard
    class="vessel-dashboard"
    :class="{ 'vessel-dashboard--full-width': !sidebarVisible }"
  >
    <span
      data-test-vessel-dashboard-report-date
      class="vessel-dashboard__report-date"
    >
      {{reportDate}}
    </span>

    <ReportSelector
      class="vessel-dashboard__report-selector"
      :reports="sortedReports"
    />

    <div
      class="vessel-dashboard__row"
    >
      <VesselDashboardGoogleMap
        class="vessel-dashboard__row__item"
      />

      <div class="vessel-dashboard__row__item">
        <PositionData
          class="vessel-dashboard__row__item"
          :report="selectedReport"
          :fetchingReports="fetchingReports"
        />

        <NavigationData
          class="vessel-dashboard__row__item"
          :report="selectedReport"
          :fetchingReports="fetchingReports"
          :distanceMadeSinceLastReport="distanceMadeSinceLastReport"
        />
      </div>
    </div>

    <WeatherData
      class="vessel-dashboard__row__item"
      :report="selectedReport"
      :fetchingReports="fetchingReports"
    />

    <RemainingOnBoard
      class="vessel-dashboard__item"
      v-if="!fetchingReports"
      :report="selectedReport"
      :previousReport="previousReport"
      :fetchingReports="fetchingReports"
      :vesselCapacities="vesselCapacities"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { get } from 'vuex-pathify'
  import VesselDashboardGoogleMap from './VesselDashboardGoogleMap.vue'
  import WeatherData from './WeatherData.vue'
  import PositionData from './PositionData.vue'
  import NavigationData from './NavigationData.vue'
  import RemainingOnBoard from './RemainingOnBoard.vue'
  import ReportSelector from './ReportSelector'
  import { distanceBetweenPoints } from '@/utils/coordinates-utils'

  export default {
    components: {
      VesselDashboardGoogleMap,
      RemainingOnBoard,
      WeatherData,
      PositionData,
      NavigationData,
      ReportSelector
    },

    created () {
      this.setVessel(this.vessels.find(vessel => vessel.id === this.$route.params.id))

      const { maxFo, maxDo, maxFw } = this.vessel
      this.setVesselCapacities({
        maxFo: parseInt(maxFo),
        maxDo: parseInt(maxDo),
        maxFw: parseInt(maxFw)
      })
    },

    computed: {
      ...mapGetters([
        'sortedReports'
      ]),

      fetchingReports: get('fetchingReports'),
      selectedReport: get('selectedReport'),
      reports: get('reports'),
      sidebarVisible: get('sidebarVisible'),
      vessels: get('vessels'),
      vessel: get('vessel'),
      vesselCapacities: get('vesselCapacities'),

      previousReport () {
        const indexOfSelectedReport = this.reports.indexOf(this.selectedReport)
        return this.reports[indexOfSelectedReport + 1]
      },

      distanceMadeSinceLastReport () {
        if (!this.previousReport) return 0
        const { lat: prevLat, lng: prevLng } = this.previousReport
        const { lat, lng } = this.selectedReport
        return parseInt(distanceBetweenPoints(prevLat, prevLng, lat, lng))
      },

      reportDate () {
        if (this.selectedReport) return this.$moment(this.selectedReport.reportTime).format('MMMM YYYY')
      }
    },

    methods: {
     ...mapActions([
       'setVessel',
       'setVesselCapacities',
       'selectReport'
     ])
   }
  }
</script>

<style scoped lang="scss">
  .vessel-dashboard {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-right: 50px;

    &__report-selector {
      position: absolute;
      right: 0;
      background-color: $color-blue-grey;
      transition: 600ms ease-in-out;
    }

    &__report-date {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 50px;
      padding: 15px;
      background-color: $color-blue;
      color: $color-whitey;
    }

    &__row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;

      &:first-of-type {
        margin-top: 30px;
      }

      &__item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 20px;
        min-width: 49%;
      }
    }

    &__item {
      margin: 20px 0;
    }
  }
</style>
