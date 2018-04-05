<template>
  <VesselReportsList
    :reports="componentProps.last14Reports"
    class="vessel-details-reports-list">
  </VesselReportsList>
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
  .vessel-details-reports-list {
    max-width: 1440px;
    margin: 0 auto;
  }
</style>
