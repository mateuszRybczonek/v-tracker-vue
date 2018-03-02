<template>
  <div class="vessel-details">
    <h1 class="vessel-details__header">Report details</h1>
    <div class="vessel-details__report-selection">
      <calendar-card :report="report" v-for="report in reports"></calendar-card>
    </div>
    <div class="vessel-details__row">
      <content-placeholders class="vessel-details__row__item" v-if="fetchingReports">
        <content-placeholders-img class="google-map--placeholder"></content-placeholders-img>
      </content-placeholders>
      <div class="vessel-details__row__item google-map" v-else>
        Mini-Google map will go here
      </div>

      <div class="vessel-details__row__item">
        <content-placeholders v-if="fetchingReports">
          <content-placeholders-img class="vessel-details__row__item--placeholder"></content-placeholders-img>
        </content-placeholders>
        <position-data class="vessel-details__row__item" v-else
          :report="report">
        </position-data>

        <content-placeholders v-if="fetchingReports" class="vessel-details__row__item">
          <content-placeholders-img class="vessel-details__row__item__placeholder"></content-placeholders-img>
        </content-placeholders>
        <navigation-data class="vessel-details__row__item" v-else
          :report="report">
        </navigation-data>
      </div>
    </div>

    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="vessel-details__row__item--weather-data-placeholder"></content-placeholders-img>
    </content-placeholders>
    <weather-data class="vessel-details__row__item" v-else
      :report="report">
    </weather-data>

    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img></content-placeholders-img>
    </content-placeholders>
    <remaining-on-board class="vessel-details__item" v-else
      :report="report"
      :previousReport="previousReport">
    </remaining-on-board>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import WeatherData from './weather-data.vue'
  import PositionData from './position-data.vue'
  import NavigationData from './navigation-data.vue'
  import RemainingOnBoard from './remaining-on-board.vue'
  import CalendarCard from '../../molecules/calendar-card.vue'

  export default {
    props: {
      componentProps: {
        type: Object,
        required: true
      }
    },

    computed: {
      ...mapGetters([
        'fetchingReports',
        'selectedReport'
      ]),

      reports () {
        return this.componentProps.reports
      },

      report () {
        return this.selectedReport
      },

      previousReport () {
        const indexOfSelectedReport = this.reports.indexOf(this.report)
        return this.reports[indexOfSelectedReport - 1]
      }
    },

    components: {
      RemainingOnBoard,
      WeatherData,
      PositionData,
      NavigationData,
      CalendarCard
    }
  }
</script>

<style scoped lang="scss">
  .vessel-details {
    max-width: 1440px;
    margin: 0 auto;

    &__header {
      padding-top: 50px;
      text-align: center;
    }

    &__report-selection {
      display: flex;

      > div {
        margin: 10px;
      }
    }

    &__row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;

      &__item {
        margin-top: 40px;
        min-width: 49%;

        &--placeholder {
          height: 210px;
        }

        &--weather-data-placeholder {
          margin-top: 35px;
          height: 460px;
        }
      }
    }

    &__item {
      margin-top: 40px;
    }

    .google-map {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid $color-light-blue;

      &__placeholder {
        height: 450px;
      }
    }
  }
</style>
