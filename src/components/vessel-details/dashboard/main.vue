<template>
  <div class="vessel-details__dashboard">
    <div class="vessel-details__last-report">
      <h4>Last reported data: {{lastReport.reportTime}}</h4>
      <p>({{lastReportDaysAgo}})</p>
    </div>
    <div class="vessel-details__row">
      <position-data class="vessel-details__row__item"
        :lastReport="lastReport">
      </position-data>
      <navigation-data class="vessel-details__row__item"
        :lastReport="lastReport">
      </navigation-data>
    </div>
    <remaining-on-board
      class="vessel-details__item"
      :lastReport="lastReport">
    </remaining-on-board>
    <div class="vessel-details__row">
      <weather-data class="vessel-details__row__item"
        :lastReport="lastReport">
      </weather-data>
    </div>
  </div>
</template>

<script>
  import WeatherData from './weather-data.vue'
  import PositionData from './position-data.vue'
  import NavigationData from './navigation-data.vue'
  import RemainingOnBoard from './remaining-on-board.vue'

  export default {
    props: [
      'componentProps'
    ],

    computed: {
      lastReport () {
        return this.componentProps.lastReport
      },

      lastReportDaysAgo () {
        return this.$moment(this.lastReport.reportTime).fromNow()
      }
    },

    components: {
      RemainingOnBoard,
      WeatherData,
      PositionData,
      NavigationData
    }
  }
</script>

<style scoped lang="scss">
  .vessel-details {
    &__last-report {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 40px 20px;
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
