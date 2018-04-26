<template>
  <div
    data-test-form-wrapper
    class="form"
    :class="classes"
  >
    <div
      class="form__header"
      data-test-form-wrapper-header
    >
      <h4>{{ title }}</h4>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      },
      color: {
        type: String
      }
    },

    computed: {
      classes () {
        return `${this.color} ${this.size}`
      }
    }
  }
</script>

<style scoped lang="scss">
  .form {
    background-color: $color-white;
    margin: 30px auto;
    border: 1px solid $color-whitey;
    box-shadow: 0 2px 3px $color-whitey;

    &.narrow {
      width: 400px;
    }

    &.wide {
      width: 80%;
    }

    &.blue {
      .form__header {
        background-color: $color-blue;
      }
    }

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
