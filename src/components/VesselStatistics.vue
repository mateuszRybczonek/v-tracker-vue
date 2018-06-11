<template>
  <div
    data-test-vessel-statistics
    class="vessel-statistics"
    :class="{ 'vessel-statistics--full-width': !sidebarVisible }"
  >
    <LineChartRemainingOnBoard/>
  </div>
</template>

<script>
  import { get } from 'vuex-pathify'
  import LineChartRemainingOnBoard from './LineChartRemainingOnBoard'

  export default {
    components: {
      LineChartRemainingOnBoard
    },

    computed: {
      sidebarVisible: get('sidebarVisible')
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
