<template>
  <div class="vessel-details__dashboard">
    <div class="vessel-details__last-report">
      <h4>Last reported data: {{componentProps.lastReport.reportTime}}</h4>
      <p>({{lastReportDaysAgo}})</p>
    </div>
    <remaining-on-board
      class="vessel-details__item"
      :lastReport="componentProps.lastReport">
    </remaining-on-board>
  </div>
</template>

<script>
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
      RemainingOnBoard
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

    &__item {
      margin-top: 40px;
    }
  }
</style>
