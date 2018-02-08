<template>
  <div class="step-3">
    <md-field>
      <label>Tell us something more...</label>
      <md-textarea
        v-model="userData.message"
        md-counter="80">
      </md-textarea>
    </md-field>
    <div class="actions">
      <positive-button :disabled="isSubmitted" :on-click="previousStep" :inProgress="isSubmitted">
        <span>
          Back
        </span>
      </positive-button>
      <positive-button :disabled="isSubmitted" :on-click="submit" :inProgress="isSubmitted">
        <span>
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
      border: 1px solid $color-dark-grey;
      border-radius: 3px;
      color: $color-dark-grey;
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
