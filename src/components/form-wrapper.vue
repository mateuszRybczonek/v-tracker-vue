<template>
  <div class="form">
    <h4>{{ title }}</h4>
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
    padding: 20px;
    box-shadow: 0 2px 3px $color-whitey;

    > h4 {
      margin-bottom: 20px;
      text-align: center;
    }
  }
</style>
