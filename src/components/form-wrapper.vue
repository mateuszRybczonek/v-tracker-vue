<template>
  <div class="form">
    <div class="form__header">
      <h4>{{ title }}</h4>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>

<style scoped lang="scss">
  .form {
    background-color: #FFF;
    width: 400px;
    margin: 30px auto;
    border: 1px solid $color-whitey;
    box-shadow: 0 2px 3px $color-whitey;

    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70px;
      background-color: $color-light-grey;
      text-transform: uppercase;

      > h4 {
        text-align: center;
        color: $color-whitey;
        margin: 0;
        line-height: 70px;
      }
    }
  }
</style>
