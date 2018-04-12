<template>
  <div
    class="calendar-card"
    :class="{'calendar-card--selected': presentReportSelected}"
  >
    <div class="calendar-card__month">{{reportMonth}}</div>
    <span class="calendar-card__day">{{reportDay}}</span>
    <span class="calendar-card__day-of-week">{{reportDayOfWeek}}</span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      report: {
        type: Object,
        required: true
      }
    },

    computed: {
      ...mapGetters([
        'selectedReport'
      ]),

      presentReportSelected () {
        return this.report.id === this.selectedReport.id
      },

      reportTime () {
        return this.report.reportTime
      },

      reportDay () {
        return this.$moment(this.reportTime).format('DD')
      },

      reportMonth () {
        return this.$moment(this.reportTime).format('MMMM')
      },

      reportDayOfWeek () {
        return this.$moment(this.reportTime).format('dddd')
      }
    }
  }
</script>

<style scoped lang="scss">
  .calendar-card {
    display: flex;
    flex-direction: column;
    min-width: 90px;
    height: 100px;
    font-size: 0.9rem;
    background-color: $color-white;
    @include border-radius(8);
    box-shadow: 0 1px 0 $color-whitey-darker, 0 2px 0 $color-white, 0 3px 0 $color-whitey-darker, 0 4px 0 $color-white, 0 5px 0 $color-whitey-darker, 0 0 0 1px $color-whitey-darker;
    overflow: hidden;
    cursor: pointer;
    transition: all 400ms;
    filter: grayscale(100%);

    &:hover {
      transform: scale(1.1);
      filter: grayscale(50%);
    }

    * {
      width: 100%;
      font-weight: $fw-bold;
      font-style: normal;
      text-align: center;
    }

    &__month {
      padding: 5px 0;
      color: $color-white;
      background-color: $color-blue;
      border-bottom: 1px dashed $color-whitey-darker;
      box-shadow: 0 2px 0 $color-blue;
    }

    &__day {
      padding-top: 20px;
      font-size: 2.5rem;
      letter-spacing: -0.05em;
      color: $color-black;
    }

    &__day-of-week {
      padding-top: 10px;
      font-size: 0.75rem;
      color: $color-blue;
    }

    &--selected {
      transform: scale(1.2);
      filter: grayscale(0%);

      &:hover {
        transform: scale(1.2);
      }
    }
  }
</style>
