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
