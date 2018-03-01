<template>
  <div class="vessel-details__dashboard">
    <content-placeholders v-if="fetchingReports" class="vessel-details__last-report">
      <content-placeholders-img class="vessel-details__last-report__placeholder"></content-placeholders-img>
    </content-placeholders>
    <div class="vessel-details__last-report" v-else>
      <h4>Last reported data: {{lastReportDate}}</h4>
      <p>({{lastReportDaysAgo}})</p>
    </div>

    <div class="vessel-details__row">
      <content-placeholders class="vessel-details__row__item" v-if="fetchingReports">
        <content-placeholders-img class="google-map__placeholder"></content-placeholders-img>
      </content-placeholders>
      <div class="vessel-details__row__item google-map" v-else>
        Mini-Google map will go here
      </div>

      <div class="vessel-details__row__item">
        <content-placeholders v-if="fetchingReports">
          <content-placeholders-img class="vessel-details__row__item__placeholder"></content-placeholders-img>
        </content-placeholders>
        <position-data class="vessel-details__row__item" v-else
          :lastReport="lastReport">
        </position-data>

        <content-placeholders v-if="fetchingReports" class="vessel-details__row__item">
          <content-placeholders-img class="vessel-details__row__item__placeholder"></content-placeholders-img>
        </content-placeholders>
        <navigation-data class="vessel-details__row__item" v-else
          :lastReport="lastReport">
        </navigation-data>
      </div>
    </div>

    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="vessel-details__row__item__weather-data__placeholder"></content-placeholders-img>
    </content-placeholders>
    <weather-data class="vessel-details__row__item" v-else
      :lastReport="lastReport">
    </weather-data>

    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img></content-placeholders-img>
    </content-placeholders>
    <remaining-on-board class="vessel-details__item" v-else
      :lastReport="lastReport"
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

  export default {
    props: {
      componentProps: {
        type: Object,
        required: true
      }
    },

    computed: {
      ...mapGetters([
        'fetchingReports'
      ]),

      lastReport () {
        return this.componentProps.lastReport
      },

      previousReport () {
        return this.componentProps.previousReport
      },

      lastReportDate () {
        if (!this.lastReport) return '---'
        return this.lastReport.reportTime
      },

      lastReportDaysAgo () {
        if (!this.lastReport) return '---'
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
      padding: 40px 20px;

      &__placeholder {
        height: 65px;
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

        &__placeholder {
          height: 210px;
        }

        &__weather-data {
          &__placeholder {
            margin-top: 35px;
            height: 460px;
          }
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
