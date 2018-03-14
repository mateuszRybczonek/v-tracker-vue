<template>
  <div class="vessel-details">
    <h1 class="vessel-details__header">Report details</h1>
    <v-carousel ref="carousel"
      :perPage="7"
      :navigationEnabled="true"
      :paginationEnabled="false"
      class="vessel-details__reports-carousel"
    >
      <v-slide v-for="report in reversedReports" :key="report.id" class="vessel-details__report-selection">
        <calendar-card :report="report" @click.native="selectReport(report)"></calendar-card>
      </v-slide>
    </v-carousel>
    <div class="vessel-details__row">
      <google-map class="vessel-details__row__item"
        :report="report"
        :fetchingReports="fetchingReports">
      </google-map>

      <div class="vessel-details__row__item">
        <position-data class="vessel-details__row__item"
          :report="report"
          :fetchingReports="fetchingReports">
        </position-data>

        <navigation-data class="vessel-details__row__item"
          :report="report"
          :fetchingReports="fetchingReports">
        </navigation-data>
      </div>
    </div>

    <weather-data class="vessel-details__row__item"
      :report="report"
      :fetchingReports="fetchingReports">
    </weather-data>

    <remaining-on-board class="vessel-details__item" v-if="!fetchingReports"
      :report="report"
      :previousReport="previousReport"
      :fetchingReports="fetchingReports">
    </remaining-on-board>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import GoogleMap from './google-map.vue'
  import WeatherData from './weather-data.vue'
  import PositionData from './position-data.vue'
  import NavigationData from './navigation-data.vue'
  import RemainingOnBoard from './remaining-on-board.vue'
  import CalendarCard from '../../molecules/calendar-card.vue'
  import { Carousel, Slide } from 'vue-carousel'

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

      reversedReports () {
        return [...this.componentProps.reports.reverse()]
      },

      report () {
        return this.selectedReport
      },

      previousReport () {
        const indexOfSelectedReport = this.reports.indexOf(this.report)
        return this.reports[indexOfSelectedReport + 1]
      }
    },

    methods: {
      selectReport (report) {
        this.$store.dispatch('selectReport', report)
      }
    },

    components: {
      GoogleMap,
      RemainingOnBoard,
      WeatherData,
      PositionData,
      NavigationData,
      CalendarCard,
      VCarousel: Carousel,
      VSlide: Slide
    }
  }
</script>

<style scoped lang="scss">
  .vessel-details {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    &__header {
      padding-top: 50px;
      text-align: center;
    }

    &__reports-carousel {
      margin: auto;
      width: 90%;
      max-width: 1000px;
      height: 180px;
    }

    &__report-selection {
      display: flex;
      margin-top: 30px;

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
      }
    }

    &__item {
      margin-top: 40px;
    }
  }
</style>
