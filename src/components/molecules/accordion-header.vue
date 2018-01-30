<template>
  <div class="v-accordion-header">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .v-accordion-header {
    display: flex;
    background-color: $color-blue;
    padding: 0 30px 0 20px;
    height: 30px;
    @include border-radius(20px);

    .v-accordion-header__slot {
      display: flex;

      p {
        margin: 0;
        color: $color-whitey;
        font-weight: 700;
        align-self: center;
      }
    }
  }
</style>
