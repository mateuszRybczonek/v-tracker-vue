<template>
  <div class="vessel-details__reports">
    <VesselReportsList
      :reports="componentProps.last14Reports"
      class="vessel-details__reports__list">
    </VesselReportsList>
  </div>
</template>

<script>
  import VesselReportsList from './VesselReportsList.vue'

  export default {
    components: {
      VesselReportsList
    },

    props: {
      componentProps: {
        type: Object,
        required: true
      }
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
