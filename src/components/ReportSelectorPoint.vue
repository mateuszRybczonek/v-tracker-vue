<template>
  <li
    data-test-report-selector-point
    class="report-selector-point"
    :class="{'report-selector-point--selected': presentReportSelected}"
  >
    <span class="report-selector-point__marker-line"></span>
    <span class="report-selector-point__marker-connector"></span>
    <span>{{reportDay}}</span>
  </li>
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .report-selector-point {
    color: $color-blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px 0;
    width: 30px;
    height: 30px;
    background-color: $color-white;
    @include border-radius(50%);
    cursor: pointer;
    transition: all 400ms;
    filter: grayscale(100%);
    &__marker-line {
      transform: rotate(-90deg);
      &:before {
        content: '';
        position: absolute;
        top: -1px;
        left: -30px;
        width: 20px;
        height: .2em;
        background-color: $color-light-blue;
        z-index: -1;
      }
    }
    &__marker-connector {
      transition: all 400ms;
      transform: rotate(-90deg);
      &:before {
        content: '';
        position: absolute;
        top: 10px;
        left: -7px;
        width: 6px;
        height: .2em;
        z-index: -1;
      }
    }
    &:hover {
      transform: scale(1.1);
      filter: grayscale(50%);
      background-color: $color-light-blue;
      color: $color-whitey;
      border: 1px solid $color-whitey;
    }
    * {
      width: 100%;
      font-weight: $fw-bold;
      font-style: normal;
      text-align: center;
    }
    &--selected {
      transform: scale(1.2);
      filter: grayscale(0%);
      background-color: $color-light-blue;
      color: $color-whitey;
      border: 1px solid $color-whitey;
      .report-selector-point__marker-connector {
        transform: rotate(0deg);
        &:before {
          background-color: $color-light-blue;
        }
      }
      &:hover {
        transform: scale(1.2);
        filter: grayscale(0%);
      }
    }
  }
</style>
