<template>
	<div class="step-1">
    <h4>Personal details</h4>
    <md-field class="input-with-error" :class="{ invalid: showErrors && $v.userData.firstName.$invalid }">
      <label>First Name</label>
      <md-input
        @blur="$v.userData.firstName.$touch()"
        v-model="userData.firstName">
      </md-input>
    </md-field>
    <div class="error">
      <span class="validation-error" v-if="showErrors && !$v.userData.firstName.required">This field must not be empty.</span>
    </div>

    <md-field class="input-with-error" :class="{ invalid: showErrors && $v.userData.lastName.$invalid }">
      <label>Last Name</label>
      <md-input
        @blur="$v.userData.lastName.$touch()"
        v-model="userData.lastName">
      </md-input>
    </md-field>
    <div class="error">
      <span class="validation-error" v-if="showErrors && !$v.userData.lastName.required">This field must not be empty.</span>
    </div>

    <md-field class="input-with-error" :class="{ invalid: showErrors && $v.userData.age.$invalid }">
      <label>Age</label>
      <md-input
        @blur="$v.userData.age.$touch()"
        v-model="userData.age">
      </md-input>
    </md-field>
    <div class="error">
      <span class="validation-error" v-if="showErrors && !$v.userData.age.required">This field must not be empty.</span>
    </div>
    <div class="actions">
      <span></span>
      <positive-button>
        <span @click="nextStep">
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
        firstName: {
          required
        },
        lastName: {
          required
        },
        age: {
          required
        }
      }
    },

    components: {
      'positive-button': PositiveButton
    },

    computed: {
      invalidStep () {
        return this.$v.userData.firstName.$invalid ||
        this.$v.userData.lastName.$invalid ||
        this.$v.userData.age.$invalid
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
  .step-1 {
    .md-field > input {
      border-bottom: 1px solid $color-font-grey;
      color: $color-font-grey;
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
