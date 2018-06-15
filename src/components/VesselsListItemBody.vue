<template>
  <div class="vessel-list-item-body">
    <md-progress-spinner
      v-if="inProgress"
      :md-diameter="130"
      :md-stroke="10"
      md-mode="indeterminate"
    ></md-progress-spinner>
    <p class="vessels-list-item-body__header">
      {{vesselName}}
    <p>
    <p>
      IMO number: {{vesselImoNumber}}
    </p>
    <p>
      Last report: {{vesselLastReportTime}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProgressSpinnerSizes',

  props: {
    inProgress: {
      type: Boolean,
      requireD: true
    },
    vesselName: {
      type: String,
      required: true
    },
    vesselImoNumber: {
      type: String,
      required: true
    },
    vesselLastReportTime: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
  .vessels-list-item-body {
    &__header {
      @include font(1.5rem, $fw-normal);
      padding: 0 0 15px;

      @media all and (max-width: $phone) {
        padding: 0 15px 30px;
      }
    }
  }

  .md-progress-spinner {
    position: absolute;
    top: 25%;
    left: 31%;
    stroke: $color-black;
  }
</style>
