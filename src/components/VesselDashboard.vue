<template>
  <div
    data-test-vessel-dashboard
    class="vessel-dashboard"
    :class="{ 'vessel-dashboard--full-width': !sidebarVisible }"
  >
    <h1
      data-test-vessel-dashboard-header
      class="vessel-dashboard__header">Report details</h1>

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
          :report="report"
          :fetchingReports="fetchingReports"
        />

        <NavigationData
          class="vessel-dashboard__row__item"
          :report="report"
          :fetchingReports="fetchingReports"
        />
      </div>
    </div>

    <WeatherData
      class="vessel-dashboard__row__item"
      :report="report"
      :fetchingReports="fetchingReports"
    />

    <RemainingOnBoard
      class="vessel-dashboard__item"
      v-if="!fetchingReports"
      :report="report"
      :previousReport="previousReport"
      :fetchingReports="fetchingReports"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VesselDashboardGoogleMap from './VesselDashboardGoogleMap.vue'
  import WeatherData from './WeatherData.vue'
  import PositionData from './PositionData.vue'
  import NavigationData from './NavigationData.vue'
  import RemainingOnBoard from './RemainingOnBoard.vue'
  import ReportSelector from './ReportSelector'

  export default {
    components: {
      VesselDashboardGoogleMap,
      RemainingOnBoard,
      WeatherData,
      PositionData,
      NavigationData,
      ReportSelector
    },

    data () {
      return {
        shrinkReportSelector: false
      }
    },

    computed: {
      ...mapGetters([
        'fetchingReports',
        'selectedReport',
        'sidebarVisible',
        'sortedReports',
        'reports'
      ]),

      report () {
        return this.selectedReport
      },

      previousReport () {
        const indexOfSelectedReport = this.reports.indexOf(this.report)
        return this.reports[indexOfSelectedReport + 1]
      }
    }
  }
</script>

<style scoped lang="scss">
  .vessel-dashboard {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    &__report-selector {
      position: absolute;
      right: 0;
      background-color: $color-blue-grey;
      transition: 600ms ease-in-out;
    }
    &__header {
      padding-top: 50px;
      text-align: center;
    }
    &__row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      &__item {
        margin-top: 40px;
        min-width: 49%;
      }
    }
    &__item {
      margin-top: 40px;
    }
  }
</style>
