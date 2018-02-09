<template>
	<div class="step-1">
    <div class="form-sections">
      <div class="form-section">
        <h4 class="form-section__heading">Position</h4>
        <input class="input input__report-time input--with-error" :class="{ invalid: showErrors && $v.reportData.reportTime.$invalid }"
           type="text"
           placeholder="Report date"
           v-model="reportData.reportTime"
           @input="$v.reportData.reportTime.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.reportTime.required">This field must not be empty.</span>
          <span class="validation-error" v-if="showErrors && !$v.reportData.reportTime.date">Please input date in format yyyy-mm-dd.</span>
        </div>

        <input class="input input__latitude input--with-error" :class="{ invalid: showErrors && $v.reportData.lat.$invalid }"
           type="text"
           placeholder="Latitude"
           v-model="reportData.lat"
           @input="$v.reportData.lat.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.lat.required">This field must not be empty.</span>
        </div>

        <input class="input input__longitude input--with-error" :class="{ invalid: showErrors && $v.reportData.lng.$invalid }"
          type="text"
          placeholder="Longitude"
          v-model="reportData.lng"
          @input="$v.reportData.lng.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.lng.required">This field must not be empty.</span>
        </div>
      </div>

      <div class="form-section">
        <h4 class="form-section__heading">Navigation</h4>
        <input class="input input__course input--with-error" :class="{ invalid: showErrors && $v.reportData.course.$invalid }"
          type="number"
          placeholder="Course"
          v-model="reportData.course"
          @input="$v.reportData.course.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.course.required">This field must not be empty.</span>
          <span class="validation-error" v-if="showErrors && !$v.reportData.course.format">Course must be in 'xxx' format.</span>
          <span class="validation-error" v-if="showErrors && !$v.reportData.course.range">Course must be between 000 - 360.</span>
        </div>

        <input class="input input__speed input--with-error" :class="{ invalid: showErrors && $v.reportData.spd.$invalid }"
               type="number"
               placeholder="Speed"
               v-model="reportData.spd"
               @input="$v.reportData.spd.$touch()">
        <div class="error">
          <span class="validation-error" v-if="showErrors && !$v.reportData.spd.required">This field must not be empty.</span>
        </div>
      </div>
    </div>

    <div class="actions">
      <span></span>
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
        reportTime: {
          required,
          date: value => {
            if (value === 'undefined' || value === null || value === '') {
              return true
            }
            return /^\d{4}[- ]?\d{2}[- ]?\d{2}$/.test(value)
          }
        },
        lat: {
          required
        },
        lng: {
          required
        },
        course: {
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
        spd: {
          required
        }
      }
    },

    components: {
      'positive-button': PositiveButton
    },

    computed: {
      invalidStep () {
        return this.$v.reportData.lat.$invalid ||
        this.$v.reportData.lng.$invalid ||
        this.$v.reportData.reportTime.$invalid ||
        this.$v.reportData.course.$invalid ||
        this.$v.reportData.spd.$invalid
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
      max-width: 300px;
      background: url('../../../assets/icons.svg') no-repeat;

      &__report-time {
        background-position: -7px -1286px;
        background-size: 25%;
      }

      &__latitude {
        background-position: -7px -1338px;
        background-size: 25%;
      }

      &__longitude {
        background-position: -14px -1946px;
        background-size: 35%;
      }

      &__course {
        background-position: -7px -625px;
        background-size: 25%;
      }

      &__speed {
        background-position: -3px -1432px;
        background-size: 25%;
      }

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
