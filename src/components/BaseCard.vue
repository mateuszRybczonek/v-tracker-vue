<template>
  <router-link :to="to">
    <div
      data-test-base-card
      class="base-card"
    >
      <slot></slot>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .base-card {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $color-white;
    width: 350px;
    padding: 20px;
    text-align: center;
    @include transitions-all();
    @include border-radius(5);
    @include box-shadow(0 0 100px 1px rgba(0,0,0,0.1));

    &:hover {
      @include box-shadow(0 0 20px 1px rgba(0,0,0,0.2));
      transform: scale(1.05);
    }

    @media all and (max-width: $phone) {
      width: 100%;
      padding: 0;
      @include border-radius(0);
      @include box-shadow(0 0 0 0 #fff);
      border: solid 1px $color-whitey;

      &:hover {
        @include box-shadow(0 0 0 0 #FFF);
        transform: scale(1);
      }
    }
  }
</style>
