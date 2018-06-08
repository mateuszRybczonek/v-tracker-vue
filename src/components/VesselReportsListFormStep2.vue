<template>
  <div class="step-2">
    <div class="form-sections">
      <div class="form-section">
        <h4
          data-test-vessel-reports-list-form-step-two-header
          class="form-section__heading"
        >
          Wind
        </h4>
        <InputWithErrors data-test-vessel-reports-list-form-step-two-wind-direction-input unit="°">
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon
							width="30"
							height="30"
							color="#999"
							viewBox="2 -5 40 40"
            >
							<IconNavigation></IconNavigation>
            </BaseIcon>
            <input
              class="input input__wind-direction input__direction input--with-error"
              :class="{ invalid: showErrors && $v.reportData.windDir.$invalid }"
              type="number"
              placeholder="Direction"
              v-model="reportData.windDir"
              @input="$v.reportData.windDir.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.windDir.required"
            >
              This field must not be empty.
            </span>
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.windDir.format"
            >
              Wind direction direction must be in 'xxx' format.
            </span>
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.windDir.range"
            >
              Wind direction must be between 000 - 360.
            </span>
          </div>
        </InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-two-wind-speed-input unit="kn">
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon
              width="30"
              height="30"
              color="#999"
              viewBox="2 -5 40 40"
            >
              <IconSpeed></IconSpeed>
            </BaseIcon>
            <input
              class="input input__wind-speed input__speed input--with-error"
              :class="{ invalid: showErrors && $v.reportData.windSpd.$invalid }"
              type="number"
              placeholder="Speed"
              v-model="reportData.windSpd"
              @input="$v.reportData.windSpd.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.windSpd.required"
            >
              This field must not be empty.
            </span>
          </div>
        </InputWithErrors>
      </div>

      <div class="form-section">
        <h4 class="form-section__heading">Sea</h4>
        <InputWithErrors data-test-vessel-reports-list-form-step-two-sea-state-input unit="°">
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon class="sea-flag__icon-wave"
              width="30"
              height="30"
              strokeColor='#999'
              viewBox="2 25 60 60"
            >
              <IconWave></IconWave>
            </BaseIcon>
            <input
              class="input input__sea-state input__wave input--with-error"
              :class="{ invalid: showErrors && $v.reportData.seaState.$invalid }"
              type="number"
              placeholder="State"
              v-model="reportData.seaState"
              @input="$v.reportData.seaState.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.seaState.required"
            >
              This field must not be empty.
            </span>
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.seaState.range"
            >
              Sea state must be between 0 - 9.
            </span>
          </div>
        </InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-two-swell-direction-input unit="°">
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon
              width="30"
              height="30"
              color="#999"
              viewBox="2 -5 40 40"
            >
              <IconNavigation></IconNavigation>
            </BaseIcon>
            <input
              class="input input__swell-direction input__direction input--with-error"
              :class="{ invalid: showErrors && $v.reportData.swellDir.$invalid }"
              type="number"
              placeholder="Swell direction"
              v-model="reportData.swellDir"
              @input="$v.reportData.swellDir.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.swellDir.required"
            >
              This field must not be empty.
            </span>
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.swellDir.format"
            >
              Swell direction must be in 'xxx' format.
            </span>
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.swellDir.range"
            >
              Swell direction must be between 000 - 360.
            </span>
          </div>
        </InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-two-swell-height-input unit="m">
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon class="sea-flag__icon-wave"
              width="30"
              height="30"
              strokeColor='#999'
              viewBox="2 25 60 60"
            >
              <IconWave></IconWave>
            </BaseIcon>
            <input
              class="input input__swell-height input__wave input--with-error"
              :class="{ invalid: showErrors && $v.reportData.swellHeight.$invalid }"
              type="number"
              placeholder="Swell height"
              v-model="reportData.swellHeight"
              @input="$v.reportData.swellHeight.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.swellHeight.required"
            >
              This field must not be empty.
            </span>
          </div>
        </InputWithErrors>
      </div>
    </div>

    <div class="actions">
      <ButtonPositive
        data-test-vessel-reports-list-form-next-step-button
        :on-click="previousStep"
        :inProgress='false'
      >
        <span>Back</span>
      </ButtonPositive>

      <ButtonPositive
        data-test-vessel-reports-list-form-previous-step-button
        :on-click="nextStep"
        :inProgress='false'
      >
        <span>Continue</span>
      </ButtonPositive>
    </div>
  </div>
</template>

<script>
  import ButtonPositive from './ButtonPositive.vue'
  import InputWithErrors from './InputWithErrors.vue'
  import { required } from 'vuelidate/lib/validators'
  import BaseIcon from './BaseIcon.vue'
  import IconNavigation from './Icons/IconNavigation.vue'
  import IconSpeed from './Icons/IconSpeed.vue'
  import IconWave from './Icons/IconWave.vue'

  export default {
    components: {
      ButtonPositive,
      InputWithErrors,
      BaseIcon,
      IconNavigation,
      IconSpeed,
      IconWave
    },

    props: {
      reportData: {
        type: Object,
        required: true
      },

      showErrors: {
        type: Boolean,
        required: true
      }
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
    },

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
            return /^(?:36[0]|3[0-5][0-9]|[012][0-9][0-9]|[1-9]?[0-9])?$/.test(value)
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
            return /^(?:36[0]|3[0-5][0-9]|[012][0-9][0-9]|[1-9]?[0-9])?$/.test(value)
          }
        },
        swellHeight: {
          required
        }
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
        @include border-radius(3px);
        padding: 10px;

        &__heading {
          margin-bottom: 30px;
        }

        .input__wrapper {
          display: flex;
          background-color: $color-whitey-darker;
          @include border-radius(4px);
          border: none;
          opacity: 0.8;

          svg {
            transform: translate(15px, 12px);
          }
        }
      }
    }
  }
</style>
