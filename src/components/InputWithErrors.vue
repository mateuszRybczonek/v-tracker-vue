<template>
  <div
    data-test-input-with-errors
    class="input--with-errors"
  >
    <div
      data-test-input-with-errors-input
      :class="{'input--with-unit': unit}"
    >
      <slot name="input"></slot>
      <span
        v-if="unit"
        class="input__unit"
      >
        {{ unit }}
      </span>
    </div>
    <div class="error">
      <slot name="errors"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      unit: {
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
  .input {
    width: 200px;
    padding-left: 0;
    opacity: 0.5;

    &--with-unit {
      display: flex;

      input {
        padding-right: 40px;
      }

      .input__unit {
        position: relative;
        top: 15px;
        right: 35px;
        color: $color-grey;
      }
    }

    &--with-error {
      display: flex;
      flex-direction: column;
      height: 50px;
      background-color: $color-whitey-darker;
      color: $color-black;
      @include border-radius(4px)
      border: none;
      font-size: 1rem;
      padding: 10px;

      &::placeholder {
        color: $color-black
      }

      &:focus {
        outline: none;
      }
    }
  }
</style>
