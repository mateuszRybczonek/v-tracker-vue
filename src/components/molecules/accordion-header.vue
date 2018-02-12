<template>
  <div class="v-accordion-header" :class="color">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .v-accordion-header {
    display: flex;
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

  .black {
    background-color: $color-black;
  }

  .brown {
    background-color: $color-brown;
  }

  .blue {
    background-color: $color-blue;
  }

  .green {
    background-color: $color-green;
  }

  .light-blue {
    background-color: $color-light-blue;
  }

  .red {
    background-color: $color-tomato;
  }
</style>
