<template>
  <div
    class="step-3"
    :class="{ 'step-3--faded': inProgress}"
  >
    <div
      class="step-3__spinner"
      v-if="inProgress"
    >
      <md-progress-spinner
        :md-diameter="130"
        :md-stroke="10"
        md-mode="indeterminate"
      ></md-progress-spinner>
    </div>
    <div class="form-sections">
      <div class="form-section">
        <h4
          data-test-vessel-reports-list-form-step-three-section-one-header
          class="form-section__heading"
        >
          Remaining on board
        </h4>
        <InputWithErrors data-test-vessel-reports-list-form-step-three-fo-rob-input unit="cbm">
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon
              width="50"
              height="50"
              color="#999"
              viewBox="15 15 76 76"
            >
              <IconFuel></IconFuel>
            </BaseIcon>
            <input
              class="input input--with-error"
              :class="{ invalid: showErrors && $v.reportData.foRob.$invalid }"
              type="number"
              placeholder="Fuel oil"
              v-model="reportData.foRob"
              @input="$v.reportData.foRob.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.foRob.required"
            >
              This field must not be empty.
            </span>
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.foRob.range"
            >
              Fuel oil cannot be less than 0.
            </span>
          </div>
        </InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-three-do-rob-input unit="cbm">
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon
              width="50"
              height="50"
              color="#999"
              viewBox="15 15 76 76"
            >
              <IconFuel></IconFuel>
            </BaseIcon>
            <input
              class="input input--with-error"
              :class="{ invalid: showErrors && $v.reportData.doRob.$invalid }"
              type="number"
              placeholder="Diesel oil"
              v-model="reportData.doRob"
              @input="$v.reportData.doRob.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.doRob.required"
            >
              This field must not be empty.
            </span>
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.doRob.range"
            >
              Diesel oil cannot be less than 0.
            </span>
          </div>
        </InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-three-fw-rob-input unit="cbm">
          <div
           slot="input"
           class="input__wrapper"
          >
            <BaseIcon
              width="50"
              height="50"
              color="#999"
              viewBox="25 20 60 60"
            >
              <IconWater></IconWater>
            </BaseIcon>
            <input
              class="input input--with-error"
              :class="{ invalid: showErrors && $v.reportData.fwRob.$invalid }"
              type="number"
              placeholder="Fresh water"
              v-model="reportData.fwRob"
              @input="$v.reportData.fwRob.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.fwRob.required"
          >
            This field must not be empty.
          </span>
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.fwRob.range"
            >
              Fresh water cannot be less than 0.
            </span>
          </div>
        </InputWithErrors>
      </div>

      <div class="form-section">
        <h4
          data-test-vessel-reports-list-form-step-three-section-two-header
          class="form-section__heading"
        >
          Other
        </h4>
        <InputWithErrors data-test-vessel-reports-list-form-step-three-pob-input unit="">
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon
              width="50"
              height="50"
              color="#999"
              viewBox="15 15 76 76"
            >
              <IconPeople></IconPeople>
            </BaseIcon>
            <input
              slot="input"
              class="input input__pitch input__pob input--with-error"
              :class="{ invalid: showErrors && $v.reportData.pob.$invalid }"
              type="number"
              placeholder="People on board"
              v-model="reportData.pob"
              @input="$v.reportData.pob.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.pob.required"
            >
              This field must not be empty.
            </span>
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.pob.range"
            >
              POB cannot be less than 0.
            </span>
          </div>
        </InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-three-pitch-input>
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon
              width="50"
              height="50"
              color="#999"
              viewBox="10 15 76 76"
            >
              <IconAngle></IconAngle>
            </BaseIcon>
            <input
              class="input input--with-error"
              :class="{ invalid: showErrors && $v.reportData.pitch.$invalid }"
              type="number "
              step="0.1"
              placeholder="Pitch"
              v-model="reportData.pitch"
              @input="$v.reportData.pitch.$touch()"
            >
          </div>
          <div class="error">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.pitch.required"
            >
              This field must not be empty.
            </span>
          </div>
        </InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-three-roll-input>
          <div
            slot="input"
            class="input__wrapper"
          >
            <BaseIcon
              width="50"
              height="50"
              color="#999"
              viewBox="10 15 76 76"
            >
              <IconAngle></IconAngle>
            </BaseIcon>
            <input
              class="input input__pitch input__movements input--with-error"
              :class="{ invalid: showErrors && $v.reportData.roll.$invalid }"
              type="number"
              step="0.1"
              placeholder="Roll"
              v-model="reportData.roll"
              @input="$v.reportData.roll.$touch()"
            >
          </div>
          <div slot="errors">
            <span
              class="validation-error"
              v-if="showErrors && !$v.reportData.roll.required"
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
        :on-click="submit"
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
  import { required, numeric } from 'vuelidate/lib/validators'
  import BaseIcon from './BaseIcon.vue'
  import IconFuel from './Icons/IconFuel.vue'
  import IconWater from './Icons/IconWater.vue'
  import IconPeople from './Icons/IconPeople.vue'
  import IconAngle from './Icons/IconAngle.vue'

  export default {
    components: {
      ButtonPositive,
      InputWithErrors,
      BaseIcon,
      IconFuel,
      IconWater,
      IconPeople,
      IconAngle
    },

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

    .md-progress-spinner {
      display: flex;
      justify-content: center;
      position: absolute;
      top: 25%;
      stroke: $color-black;
    }
  }
</style>
