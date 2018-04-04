<template>
  <button
    :class="{'in-progress': inProgress}"
    @click="onClick"
    >

    <md-progress-spinner
      v-if="inProgress"
      :md-diameter="20"
      :md-stroke="3"
      md-mode="indeterminate">
    </md-progress-spinner>

    <slot v-else></slot>
  </button>
</template>

<script>
  export default {
    name: 'ProgressSpinnerSizes',

    props: {
      inProgress: {
        type: Boolean,
        required: true
      },
      onClick: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    margin-top: 60px;
    text-transform: uppercase;

    @include common-button();
    @include green-button();
    @include box-shadow(0 8px 16px 0 rgba(83, 99, 115, 0.32));
    @include font(16px, 700);
    min-height: $button-height;

    @media all and (max-width: $phone) {
      width: 100%;
      font-size: 20px;
    }

    &.in-progress {
      opacity: 0.3;
      cursor: auto;
      pointer-events: none;
    }

    > a {
      padding: 0 32px;
      line-height: $button-height;
      color: $color-whitey;
    }

    > .icon {
      margin-left: 8px;
      line-height: 21px;
      vertical-align: middle;
      font-size: 22px;
    }

    .md-progress-spinner {
      position: absolute;
      top: 33%;
      stroke: $color-whitey;
    }
  }
</style>
