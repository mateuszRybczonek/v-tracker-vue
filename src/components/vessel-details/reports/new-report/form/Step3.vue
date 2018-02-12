<template>
  <div class="step-2">
    <div class="form-sections">
      <div class="form-section">
        <h4 class="form-section__heading">Remaining on board</h4>
        <input-with-errors unit="cbm">
          <input slot="input"
            class="input input__fuel-oil input__fuel input--with-error"
            :class="{ invalid: showErrors && $v.reportData.foRob.$invalid }"
            type="number"
            placeholder="Fuel oil"
            v-model="reportData.foRob"
            @input="$v.reportData.foRob.$touch()">
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.foRob.required">This field must not be empty.</span>
            <span class="validation-error" v-if="showErrors && !$v.reportData.foRob.range">Fuel oil cannot be less than 0.</span>
          </div>
        </input-with-errors>

        <input-with-errors unit="cbm">
          <input slot="input"
            class="input input__diesel-oil input__fuel input--with-error"
            :class="{ invalid: showErrors && $v.reportData.doRob.$invalid }"
            type="number"
            placeholder="Diesel oil"
            v-model="reportData.doRob"
            @input="$v.reportData.doRob.$touch()">
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.doRob.required">This field must not be empty.</span>
            <span class="validation-error" v-if="showErrors && !$v.reportData.doRob.range">Diesel oil cannot be less than 0.</span>
          </div>
        </input-with-errors>

        <input-with-errors unit="cbm">
          <input slot="input"
            class="input input__fresh-water input__fuel input--with-error"
            :class="{ invalid: showErrors && $v.reportData.fwRob.$invalid }"
            type="number"
            placeholder="Fresh water"
            v-model="reportData.fwRob"
            @input="$v.reportData.fwRob.$touch()">
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.fwRob.required">This field must not be empty.</span>
            <span class="validation-error" v-if="showErrors && !$v.reportData.fwRob.range">Fresh water cannot be less than 0.</span>
          </div>
        </input-with-errors>
      </div>

      <div class="form-section">
        <h4 class="form-section__heading">Other</h4>
        <input-with-errors>
          <input slot="input"
            class="input input__pitch input__pob input--with-error"
            :class="{ invalid: showErrors && $v.reportData.pob.$invalid }"
            type="number"
            placeholder="People on board"
            v-model="reportData.pob"
            @input="$v.reportData.pob.$touch()">
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.pob.required">This field must not be empty.</span>
            <span class="validation-error" v-if="showErrors && !$v.reportData.pob.range">POB cannot be less than 0.</span>
          </div>
        </input-with-errors>

        <input-with-errors>
          <input slot="input"
            class="input input__pitch input__movements input--with-error"
            :class="{ invalid: showErrors && $v.reportData.pitch.$invalid }"
            type="number"
            placeholder="Pitch"
            v-model="reportData.pitch"
            @input="$v.reportData.pitch.$touch()">
          <div class="error">
            <span class="validation-error" v-if="showErrors && !$v.reportData.pitch.required">This field must not be empty.</span>
          </div>
        </input-with-errors>

        <input-with-errors>
          <input slot="input"
            class="input input__pitch input__movements input--with-error"
            :class="{ invalid: showErrors && $v.reportData.roll.$invalid }"
            type="number"
            placeholder="Roll"
            v-model="reportData.roll"
            @input="$v.reportData.roll.$touch()">
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.roll.required">This field must not be empty.</span>
          </div>
        </input-with-errors>
      </div>
    </div>

    <div class="actions">
      <positive-button :on-click="previousStep" :inProgress=false>
        <span>Back</span>
      </positive-button>
      <positive-button :on-click="nextStep" :inProgress=false>
        <span>Continue</span>
      </positive-button>
    </div>
  </div>
</template>

<script>
  import PositiveButton from '../../../../atoms/buttons/positive.vue'
  import InputWithErrors from '../../../../molecules/input-with-errors.vue'
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
      PositiveButton,
      InputWithErrors
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
      &__fuel {
        background-position: 0 1px;
        background-size: 20%;
      }

      &__fresh-water {
        background-position: 0 -276px;
        background-size: 20%;
      }

      &__pob {
        background-position: 2px -320px;
        background-size: 20%;
      }

      &__movements {
        background-position: 5px -1196px;
        background-size: 20%;
      }
    }
  }
</style>
