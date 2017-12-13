<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    margin-top: 60px;

    @include common-button();
    @include green-button();
    @include box-shadow(0 8px 16px 0 rgba(83, 99, 115, 0.32));
    @include font(16px, 700);
    min-height: $button-height;

    @media all and (max-width: $phone) {
      width: 100%;
      font-size: 20px;
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
  }
</style>
