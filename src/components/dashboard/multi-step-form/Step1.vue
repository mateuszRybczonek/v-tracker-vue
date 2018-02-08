<template>
	<div class="step-1">
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
        this.$v.reportData.reportTime.$invalid
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
    padding: 15px;

    .input {
      padding-left: 0;
      opacity: 0.5;
      background: url('../../../assets/icons.svg') no-repeat;

      &__report-time {
        background-position: -7px -1409px;
        background-size: 20%;
      }

      &__latitude {
        background-position: -7px -1466px;
        background-size: 20%;
      }

      &__longitude {
        background-position: -18px -2287px;
        background-size: 30%;
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
