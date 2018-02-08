<template>
  <div class="vessel-details__reports">
    <reports-list class="vessel-details__reports__list"></reports-list>
  </div>
</template>

<script>
  import reportsList from '../reports/reports-list/reports-list.vue'

  export default {
    components: {
      reportsList
    }
  }
</script>

<style scoped lang="scss">
  .vessel-details__reports{
    &__list {
      width: 100%;
    }
  }
</style>
