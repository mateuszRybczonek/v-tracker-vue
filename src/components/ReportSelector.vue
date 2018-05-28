<template>
  <ul class="report-selector">
    <ReportSelectorPoint
      v-for="report in reports"
      :key="report.id"
      @click.native="selectReport(report.id)"
      :report="report"
    />
  </ul>
</template>

<script>
  import ReportSelectorPoint from './ReportSelectorPoint.vue'
  import { mapActions } from 'vuex'
  export default {
    components: {
      ReportSelectorPoint
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    margin-top: 56px;
    padding: 0;
    background-color: $color-blue;
    color: $color-whitey;
    transition: margin-left .5s;
    z-index: 999;
    &__selection {
      display: flex;
      margin-top: 30px;
      > div {
        margin: 10px;
      }
    }
  }
</style>
