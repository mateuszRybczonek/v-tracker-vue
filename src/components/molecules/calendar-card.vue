<template>
  <div class="calendar-card">
    <div class="calendar-card__month">{{reportMonth}}</div>
    <span class="calendar-card__day">{{reportDay}}</span>
    <span class="calendar-card__day-of-week">{{reportDayOfWeek}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      report: {
        type: Object,
        required: true
      }
    },

    computed: {
      reportTime () {
        return this.report.reportTime
      },

      reportDay () {
        return this.$moment(this.reportTime).format("DD")
      },

      reportMonth () {
        return this.$moment(this.reportTime).format("MMMM")
      },

      reportDayOfWeek () {
        return this.$moment(this.reportTime).format("dddd")
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
    font-size: 14px;
    background-color: $color-white;
    border-radius: 8px;
    box-shadow: 0 1px 0 $color-whitey-darker, 0 2px 0 $color-white, 0 3px 0 $color-whitey-darker, 0 4px 0 $color-white, 0 5px 0 $color-whitey-darker, 0 0 0 1px $color-whitey-darker;
    overflow: hidden;
    cursor: pointer;

    * {
      width: 100%;
      font-weight: 700;
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
      font-size: 40px;
      letter-spacing: -0.05em;
      color: $color-black;
    }

    &__day-of-week {
      padding-top: 10px;
      font-size: 12px;
      color: $color-blue;
    }
  }
</style>
