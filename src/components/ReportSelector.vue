<template>
  <div class="report-selector">
    <v-carousel
      ref="carousel"
      :perPage="7"
      :navigationEnabled="true"
      :paginationEnabled="false"
      class="report-selector__carousel"
    >
      <v-slide
        v-for="report in reports"
        :key="report.id"
        class="report-selector__selection"
      >
        <calendar-card
          :report="report"
          @click.native="selectReport(report)"
        ></calendar-card>
      </v-slide>
    </v-carousel>
  </div>
</template>

<script>
  import CalendarCard from './CalendarCard.vue'
  import { Carousel, Slide } from 'vue-carousel'
  import { mapActions } from 'Vuex'

  export default {
    components: {
      CalendarCard,
      VCarousel: Carousel,
      VSlide: Slide
    },

    props: {
      fetchingReports: {
        type: Boolean
      },
      reports: {
        type: Array,
        required: true
      }
    },

    methods: {
      ...mapActions([
        'selectReport'
      ])
    }
  }
</script>

<style scoped lang="scss">
  .report-selector {
    &__carousel {
      margin: auto;
      width: 90%;
      max-width: 1000px;
      height: 180px;
    }

    &__selection {
      display: flex;
      margin-top: 30px;

      > div {
        margin: 10px;
      }
    }
  }
</style>
