<template>
  <div class="step-2">
    <div class="form-sections">
      <div class="form-section">
        <h4 class="form-section__heading">Wind</h4>
        <input class="input input__wind-direction input--with-error" :class="{ invalid: showErrors && $v.reportData.windDir.$invalid }"
               type="text"
               placeholder="Direction"
               v-model="reportData.windDir"
               @input="$v.reportData.windDir.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.course.required">This field must not be empty.</span>
          <span class="validation-error" v-if="showErrors && !$v.reportData.course.format">Wind direction must be in 'xxx' format.</span>
          <span class="validation-error" v-if="showErrors && !$v.reportData.course.range">Wind direction must be between 000 - 360.</span>
        </div>

        <input class="input input__wind-speed input--with-error" :class="{ invalid: showErrors && $v.reportData.windSpd.$invalid }"
               type="text"
               placeholder="Speed"
               v-model="reportData.windSpd"
               @input="$v.reportData.windSpd.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.windSpd.required">This field must not be empty.</span>
        </div>
      </div>

      <div class="form-section">
        <h4 class="form-section__heading">Sea</h4>
        <input class="input input__sea-state input--with-error" :class="{ invalid: showErrors && $v.reportData.seaState.$invalid }"
               type="text"
               placeholder="State"
               v-model="reportData.seaState"
               @input="$v.reportData.seaState.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.seaState.required">This field must not be empty.</span>
          <span class="validation-error" v-if="showErrors && !$v.reportData.seaState.range">Sea state must be between 0 - 9.</span>
        </div>

        <input class="input input__swell-direction input--with-error" :class="{ invalid: showErrors && $v.reportData.swellDir.$invalid }"
               type="text"
               placeholder="Swell direction"
               v-model="reportData.swellDir"
               @input="$v.reportData.swellDir.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.swellDir.required">This field must not be empty.</span>
          <span class="validation-error" v-if="showErrors && !$v.reportData.swellDir.format">Swell direction must be in 'xxx' format.</span>
          <span class="validation-error" v-if="showErrors && !$v.reportData.swellDir.range">Swell direction must be between 000 - 360.</span>
        </div>

        <input class="input input__swell-height input--with-error" :class="{ invalid: showErrors && $v.reportData.swellHeight.$invalid }"
               type="text"
               placeholder="Swell height"
               v-model="reportData.swellHeight"
               @input="$v.reportData.swellHeight.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.swellHeight.required">This field must not be empty.</span>
        </div>
      </div>
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
    props: ['reportData', 'showErrors'],

    validations: {
      reportData: {
        windDir: {
          required,
          format: value => {
            if (value === 'undefined' || value === null || value === '') {
              return true
            }
            return /^\d{3}$/.test(value)
          },
          range: value => {
            if (value === 'undefined' || value === null || value === '') {
              return true
            }
            return /^(?:36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])?$/.test(value)
          }
        },
        windSpd: {
          required
        },
        seaState: {
          required,
          range: value => {
            if (value === 'undefined' || value === null || value === '') {
              return true
            }
            return /^[0-9]$/.test(value)
          }
        },
        swellDir: {
          required,
          format: value => {
            if (value === 'undefined' || value === null || value === '') {
              return true
            }
            return /^\d{3}$/.test(value)
          },
          range: value => {
            if (value === 'undefined' || value === null || value === '') {
              return true
            }
            return /^(?:36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])?$/.test(value)
          }
        },
        swellHeight: {
          required
        }
      }
    },

    components: {
      'positive-button': PositiveButton
    },

    computed: {
      invalidStep () {
        return this.$v.reportData.windDir.$invalid ||
          this.$v.reportData.windSpd.$invalid ||
          this.$v.reportData.seaState.$invalid ||
          this.$v.reportData.swellDir.$invalid ||
          this.$v.reportData.swellHeight.$invalid
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
    padding: 10px;

    .form-sections {
      display: flex;
      justify-content: space-evenly;

      .form-section {
        border-radius: 3px;
        padding: 10px;

        &__heading {
          margin-bottom: 30px;
        }
      }
    }

    .input {
      padding-left: 0;
      opacity: 0.5;
      background: url('../../../assets/icons.svg') no-repeat;

      &--with-error {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 50px;
        background-color: $color-whitey-darker;
        color: $color-black;
        border-radius: 4px;
        border: none;
        font-size: 17px;
        padding: 10px 10px 10px 50px;

        &::placeholder {
          color: $color-black
        }

        &:focus {
          outline-color: $color-dark-grey;
        }
      }
    }
  }
</style>
