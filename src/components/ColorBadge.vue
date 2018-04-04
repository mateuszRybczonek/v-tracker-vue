<template>
  <div
    class="badge"
    :class="color"
  >
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
  .badge {
    display: flex;
    padding: 0 30px;
    height: 30px;
    @include border-radius(20px);

    .badge__slot {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      color: $color-whitey;
      font-weight: 700;

      p {
        margin: 0;
        color: $color-whitey;
        font-weight: 700;
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
