<template>
  <div class="vessel-details__reports">
    <reports-list
      :reports="componentProps.reports"
      class="vessel-details__reports__list">
    </reports-list>
  </div>
</template>

<script>
  import reportsList from '../reports/reports-list/reports-list.vue'

  export default {
    props: {
      componentProps: {
        type: Object,
        required: true
      }
    },

    components: {
      reportsList
    }
  }
</script>

<style scoped lang="scss">
  .vessel-details__reports{
    max-width: 1440px;
    margin: 0 auto;
    
    &__list {
      width: 100%;
    }
  }
</style>
