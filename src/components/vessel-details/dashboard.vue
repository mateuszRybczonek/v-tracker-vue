<template>
  <div class="vessel-details__dashboard">
    <div class="vessel-details__last-report">
      <h4>Last reported data: {{componentProps.lastReport.reportTime}}</h4>
      <p>({{lastReportDaysAgo}})</p>
    </div>
    <div class="vessel-details__row">
      <weather-data class="vessel-details__item"
        :lastReport="componentProps.lastReport">
      </weather-data>
      <weather-data class="vessel-details__item"
        :lastReport="componentProps.lastReport">
      </weather-data>
      <weather-data class="vessel-details__item"
        :lastReport="componentProps.lastReport">
      </weather-data>
    </div>
    <remaining-on-board
      class="vessel-details__item"
      :lastReport="componentProps.lastReport">
    </remaining-on-board>
  </div>
</template>

<script>
  import WeatherData from './weather-data.vue'
  import RemainingOnBoard from './remaining-on-board.vue'

  export default {
    props: [
      'componentProps'
    ],

    computed: {
      lastReportDaysAgo () {
        return this.$moment(this.componentProps.lastReport.reportTime).fromNow()
      }
    },

    components: {
      RemainingOnBoard,
      WeatherData
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
    }

    &__item {
      margin-top: 40px;
      min-width: 30%;
    }
  }
</style>
