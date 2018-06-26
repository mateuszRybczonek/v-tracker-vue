<template>
  <button
    data-test-button-small-inverted
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
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
    margin-top: 20px;
    text-transform: uppercase;

    @include common-button();
    @include light-blue-button();
    @include box-shadow(0 8px 16px 0 rgba(83, 99, 115, 0.32));
    @include font(0.8rem, 700);
    height: 30px;

    @media all and (max-width: $phone) {
      width: 100%;
      font-size: 1.2rem;
    }
  }
</style>
