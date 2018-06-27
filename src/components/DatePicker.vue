<template>
  <input
    ref="datepicker"
    :value="date"
    :placeholder="placeholder"
  >
</template>

<script>
import Pikaday from 'pikaday'

export default {
  model: {
    prop: 'date',
    event: 'selected'
  },

  props: {
    date: {
      required: true
    },

    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },

    maxDate: {
      type: Date
    },

    minDate: {
      type: Date
    },

    placeholder: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },

  mounted() {
    const picker = new Pikaday({
      field: this.$refs.datepicker,
      format: this.format,
      maxDate: this.maxDate,
      minDate: this.minDate,

      onSelect: () => {
        this.$emit('selected', picker.toString())
      }
    })
  }
}
</script>

<style scoped lang="scss">
  input {
    padding: 5px;
    border-radius: 3px;
    border: none;
    background-color: $color-whitey-lighter;
    @include box-shadow(0 8px 16px 0 rgba(83, 99, 115, 0.32));
    text-align: right;
    font-weight: $fw-bold;
    color: $color-blue-grey;

    &:focus {
      outline: none;
    }
  }
</style>
