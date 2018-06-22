<template>
  <input :value="date" ref="datepicker" :placeholder="placeholder">
</template>

<script>
import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'

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

    placeholder: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },

  mounted() {
    const picker = new Pikaday({
      field: this.$refs.datepicker,
      format: this.format,

      onSelect: () => {
        this.$emit('selected', picker.toString())
      }
    })
  }
}
</script>
