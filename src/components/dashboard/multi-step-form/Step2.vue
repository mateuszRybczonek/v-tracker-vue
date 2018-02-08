<template>
  <div class="step-2">
    <md-field class="input-with-error" :class="{ invalid: showErrors && $v.userData.address.street.$invalid }">
      <label>Address</label>
      <md-input
        @blur="$v.userData.address.street.$touch()"
        v-model="userData.address.street">
      </md-input>
    </md-field>
    <div class="error">
      <span class="validation-error" v-if="showErrors && !$v.userData.address.street.required">This field must not be empty.</span>
    </div>

    <md-field class="input-with-error" :class="{ invalid: showErrors && $v.userData.address.postalCode.$invalid }">
      <label>Postal Code</label>
      <md-input
        @blur="$v.userData.address.postalCode.$touch()"
        v-model="userData.address.postalCode">
      </md-input>
    </md-field>
    <div class="error">
      <span class="validation-error" v-if="showErrors && !$v.userData.address.postalCode.required">This field must not be empty.</span>
    </div>

    <md-field class="input-with-error" :class="{ invalid: showErrors && $v.userData.address.city.$invalid }">
      <label>City</label>
      <md-input
        @blur="$v.userData.address.city.$touch()"
        v-model="userData.address.city">
      </md-input>
    </md-field>
    <div class="error">
      <span class="validation-error" v-if="showErrors && !$v.userData.address.city.required">This field must not be empty.</span>
    </div>

    <md-field class="input-with-error" :class="{ invalid: showErrors && $v.userData.address.country.$invalid }">
      <label>Country</label>
      <md-input
        @blur="$v.userData.address.country.$touch()"
        v-model="userData.address.country">
      </md-input>
    </md-field>
    <div class="error">
      <span class="validation-error" v-if="showErrors && !$v.userData.address.country.required">This field must not be empty.</span>
    </div>
    <div class="actions">
      <positive-button :on-click="previousStep" :inProgress=false>
        <span>
          Back
        </span>
      </positive-button>
      <positive-button :on-click="nextStep" :inProgress=false>
        <span>
          Continue
        </span>
      </positive-button>
    </div>
  </div>
</template>

<script>
  import PositiveButton from '../../../components/atoms/buttons/positive.vue'
  import { required } from 'vuelidate/lib/validators'

  export default {
    props: ['userData', 'showErrors'],

    validations: {
      userData: {
        address: {
          street: { required },
          postalCode: { required },
          city: { required },
          country: { required }
        }
      }
    },

    components: {
      'positive-button': PositiveButton
    },

    computed: {
      invalidStep () {
        return this.$v.userData.address.street.$invalid ||
          this.$v.userData.address.postalCode.$invalid ||
          this.$v.userData.address.city.$invalid ||
          this.$v.userData.address.country.$invalid
      }
    },

    methods: {
      previousStep () {
        this.$emit('previousStep')
      },

      nextStep () {
        this.$emit('nextStep', this.invalidStep)
      }
    }
  }
</script>

<style scoped lang="scss">
  .step-2 {
    .md-field > input {
      border-bottom: 1px solid $color-dark-grey;
      color: $color-dark-grey;
    }

    .error {
      min-height: 30px;
    }

    .input-with-error {
      display: flex;
      flex-direction: column;
      margin: 15px 0 0;
    }

    .validation-error {
      color: $color-tomato;
      font-size: 12px;
    }
  }
</style>
