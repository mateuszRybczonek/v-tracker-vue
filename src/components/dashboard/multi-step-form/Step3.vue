<template>
  <div class="step-3">
    <h4>Message</h4>
    <md-field>
      <label>Tell us something more...</label>
      <md-textarea
        v-model="userData.message"
        md-counter="80">
      </md-textarea>
    </md-field>
    <div class="actions">
      <positive-button :disabled="isSubmitted">
        <span @click="previousStep">
          Back
        </span>
      </positive-button>
      <positive-button :disabled="isSubmitted">
        <span @click="submit">
          Submit
        </span>
      </positive-button>
    </div>
  </div>
</template>

<script>
  import PositiveButton from '../../../components/atoms/buttons/positive.vue'

  export default {
    props: ['userData', 'isSubmitted'],

    components: {
      'positive-button': PositiveButton
    },

    methods: {
      previousStep () {
        this.$emit('previousStep')
      },

      submit () {
        this.$emit('submit')
      }
    }
  }
</script>

<style scoped lang="scss">
  .step-3 {
    .md-field {
      border: 1px solid $color-font-grey;
      border-radius: 3px;
      color: $color-font-grey;
      display: flex;
      flex-direction: column;
      margin: 15px 0 0;
    }

    .actions {
      button[disabled] {
        pointer-events: none;
      }
    }
  }
</style>
