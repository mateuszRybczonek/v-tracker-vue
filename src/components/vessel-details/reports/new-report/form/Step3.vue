<template>
  <div class="step-3" :class="{ 'step-3--faded': inProgress}">
    <div class="step-3__spinner" v-if="inProgress">
      <md-progress-spinner
        :md-diameter="130"
        :md-stroke="10"
        md-mode="indeterminate">
      </md-progress-spinner>
    </div>
    <div class="form-sections">
      <div class="form-section">
        <h4 class="form-section__heading">Remaining on board</h4>
        <input-with-errors unit="cbm">
          <div slot="input" class="input__wrapper">
            <BaseIcon
              width=50
              height=50
              color="#999"
              viewBox="15 15 76 76">
              <IconFuel></IconFuel>
            </BaseIcon>
            <input class="input input--with-error"
              :class="{ invalid: showErrors && $v.reportData.foRob.$invalid }"
              type="number"
              placeholder="Fuel oil"
              v-model="reportData.foRob"
              @input="$v.reportData.foRob.$touch()">
          </div>
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.foRob.required">This field must not be empty.</span>
            <span class="validation-error" v-if="showErrors && !$v.reportData.foRob.range">Fuel oil cannot be less than 0.</span>
          </div>
        </input-with-errors>

        <input-with-errors unit="cbm">
          <div slot="input" class="input__wrapper">
            <BaseIcon
              width=50
              height=50
              color="#999"
              viewBox="15 15 76 76">
              <IconFuel></IconFuel>
            </BaseIcon>
            <input class="input input--with-error"
              :class="{ invalid: showErrors && $v.reportData.doRob.$invalid }"
              type="number"
              placeholder="Diesel oil"
              v-model="reportData.doRob"
              @input="$v.reportData.doRob.$touch()">
          </div>
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.doRob.required">This field must not be empty.</span>
            <span class="validation-error" v-if="showErrors && !$v.reportData.doRob.range">Diesel oil cannot be less than 0.</span>
          </div>
        </input-with-errors>

        <input-with-errors unit="cbm">
          <div slot="input" class="input__wrapper">
            <BaseIcon
              width=50
              height=50
              color="#999"
              viewBox="25 20 60 60">
              <IconWater></IconWater>
            </BaseIcon>
            <input class="input input--with-error"
              :class="{ invalid: showErrors && $v.reportData.fwRob.$invalid }"
              type="number"
              placeholder="Fresh water"
              v-model="reportData.fwRob"
              @input="$v.reportData.fwRob.$touch()">
          </div>
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.fwRob.required">This field must not be empty.</span>
            <span class="validation-error" v-if="showErrors && !$v.reportData.fwRob.range">Fresh water cannot be less than 0.</span>
          </div>
        </input-with-errors>
      </div>

      <div class="form-section">
        <h4 class="form-section__heading">Other</h4>
        <input-with-errors unit="">
          <div slot="input" class="input__wrapper">
            <BaseIcon
              width=50
              height=50
              color="#999"
              viewBox="15 15 76 76">
              <IconPeople></IconPeople>
            </BaseIcon>
            <input slot="input" class="input input__pitch input__pob input--with-error"
              :class="{ invalid: showErrors && $v.reportData.pob.$invalid }"
              type="number"
              placeholder="People on board"
              v-model="reportData.pob"
              @input="$v.reportData.pob.$touch()">
          </div>
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.pob.required">This field must not be empty.</span>
            <span class="validation-error" v-if="showErrors && !$v.reportData.pob.range">POB cannot be less than 0.</span>
          </div>
        </input-with-errors>

        <input-with-errors>
          <div slot="input" class="input__wrapper">
            <BaseIcon
              width=50
              height=50
              color="#999"
              viewBox="10 15 76 76">
              <IconAngle></IconAngle>
            </BaseIcon>
            <input class="input input--with-error"
              :class="{ invalid: showErrors && $v.reportData.pitch.$invalid }"
              type="number "
              step="0.1"
              placeholder="Pitch"
              v-model="reportData.pitch"
              @input="$v.reportData.pitch.$touch()">
          </div>
          <div class="error">
            <span class="validation-error" v-if="showErrors && !$v.reportData.pitch.required">This field must not be empty.</span>
          </div>
        </input-with-errors>

        <input-with-errors>
          <div slot="input" class="input__wrapper">
            <BaseIcon
              width=50
              height=50
              color="#999"
              viewBox="10 15 76 76">
              <IconAngle></IconAngle>
            </BaseIcon>
            <input class="input input__pitch input__movements input--with-error"
              :class="{ invalid: showErrors && $v.reportData.roll.$invalid }"
              type="number"
              step="0.1"
              placeholder="Roll"
              v-model="reportData.roll"
              @input="$v.reportData.roll.$touch()">
          </div>
          <div slot="errors">
            <span class="validation-error" v-if="showErrors && !$v.reportData.roll.required">This field must not be empty.</span>
          </div>
        </input-with-errors>
      </div>
    </div>

    <div class="actions">
      <positive-button :on-click="previousStep" :inProgress='false'>
        <span>Back</span>
      </positive-button>
      <positive-button :on-click="submit" :inProgress='false'>
        <span>Continue</span>
      </positive-button>
    </div>
  </div>
</template>

<script>
  import PositiveButton from '../../../../atoms/buttons/positive.vue'
  import InputWithErrors from '../../../../molecules/input-with-errors.vue'
  import { required } from 'vuelidate/lib/validators'
  import BaseIcon from '../../../../atoms/BaseIcon.vue'
  import IconFuel from '../../../../icons/icon-fuel.vue'
  import IconWater from '../../../../icons/icon-water.vue'
  import IconPeople from '../../../../icons/icon-people.vue'
  import IconAngle from '../../../../icons/icon-angle.vue'

  export default {
    props: {
      reportData: {
        type: Object,
        required: true
      },

      showErrors: {
        type: Boolean,
        required: true
      },

      isSubmitted: {
        type: Boolean
      },

      inProgress: {
        type: Boolean
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
      InputWithErrors,
      BaseIcon,
      IconFuel,
      IconWater,
      IconPeople,
      IconAngle
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

      submit () {
        this.$emit('submit', this.invalidStep)
      }
    }
  }
</script>

<style scoped lang="scss">
  .step-3 {
    padding: 10px;

    &--faded {
      opacity: 0.3;
      cursor: auto;
      pointer-events: none;
    }

    &__spinner {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .form-sections {
      display: flex;
      justify-content: space-evenly;

      .form-section {
        border-radius: 3px;
        padding: 10px;

        &__heading {
          margin-bottom: 30px;
        }

        .input__wrapper {
          display: flex;
          background-color: $color-whitey-darker;
          border-radius: 4px;
          border: none;
          opacity: 0.8;

          svg {
            transform: translate(15px, 12px);
          }
        }
      }
    }

    .md-progress-spinner {
      display: flex;
      justify-content: center;
      position: absolute;
      top: 25%;
      stroke: $color-black;
    }
  }
</style>
