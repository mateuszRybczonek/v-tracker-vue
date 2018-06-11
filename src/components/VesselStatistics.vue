<template>
  <div
    data-test-vessel-statistics
    class="vessel-statistics"
  >
    <LineChartRemainingOnBoard
      :reports="sortedReportsDesc"
    />
  </div>
</template>

<script>
  import { get } from 'vuex-pathify'
  import { mapGetters } from 'vuex'
  import LineChartRemainingOnBoard from './LineChartRemainingOnBoard'

  export default {
    components: {
      LineChartRemainingOnBoard
    },

    computed: {
      ...mapGetters([
        'sortedReportsDesc'
      ])
    }
  }
</script>

<style scoped lang="scss">
  .vessel-statistics {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
</style>
