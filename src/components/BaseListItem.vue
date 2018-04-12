<template>
  <div data-test-base-list-item class="base-list-item">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .base-list-item {
    min-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-color: $color-white;
    width: 100%;
    padding: 20px;
    text-align: center;
    @include transitions-all();
    @include border-radius(5px);
    @include box-shadow(0 0 100px 1px rgba(0,0,0,0.1));

    &:hover {
      @include box-shadow(0 0 20px 1px rgba(0,0,0,0.2));
      transform: scale(1.05);
    }

    @media all and (max-width: $phone) {
      width: 100%;
      padding: 0;
      @include border-radius(0);
      @include box-shadow(0 0 0 0 $color-white);
      border: solid 1px $color-whitey;

      &:hover {
        @include box-shadow(0 0 0 0 $color-white);
        transform: scale(1);
      }
    }
  }
</style>
