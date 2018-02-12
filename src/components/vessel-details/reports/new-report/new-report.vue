<template>
  <div class="new-report">
    <v-stepper
      :selectedStep="selectedStep"
      :isSubmitted="isSubmitted"
      @selectStep="selectStep"></v-stepper>
    <v-form-wrapper :title="stepTitle" size="wide" color="blue">
      <form class="new-report__form-content" slot="content" @submit.prevent>
        <transition name="slide" type="animation">
          <component
            :is="selectedStep"
            :reportData="newReportData"
            :showErrors="showErrors"
            :isSubmitted="isSubmitted"
            @nextStep="nextStep"
            @previousStep="previousStep"
            @submit="submit"
          >
          </component>
        </transition>
      </form>
    </v-form-wrapper>
    <h4>Form submitted: {{isSubmitted}}</h4>
    <p>{{userData}}</p>
  </div>
</template>

<script>
  import vFormWrapper from '../../../form-wrapper.vue'
  import vStepper from './form/Stepper.vue'
  import Step1 from './form/Step1.vue'
  import Step2 from './form/Step2.vue'
  import Step3 from './form/Step3.vue'

  export default {
    data () {
      return {
        newReportData: {
          reportTime: '',
          lat: '',
          lng: '',
          course: '',
          spd: '',
          windDir: '',
          windSpd: '',
          seaState: '',
          swellDir: '',
          swellHeight: '',
          doRob: '',
          foRob: '',
          fwRob: '',
          pob: '',
          pitch: '',
          roll: '',
          updatedAt: '',
          vessel: this.$route.params.id
        },
        step: 1, // initial step
        numberOfSteps: 3,
        isSubmitted: false,
        showErrors: false
      }
    },

    methods: {
      nextStep (invalidStep) {
        if (invalidStep) {
          this.showErrors = true
          return
        }

        if (!this.lastStep) {
          this.showErrors = false
          this.step++
        }
      },

      previousStep () {
        this.showErrors = false

        if (this.step > 1) {
          this.step--
        }
      },

      selectStep (step) {
        this.step = step
      },

      submit () {
        this.isSubmitted = true
      }
    },

    computed: {
      selectedStep () {
        return `step${this.step}`
      },

      lastStep () {
        return this.step === this.numberOfSteps
      },

      stepTitle () {
        switch (this.step) {
          case 1:
            return 'Navigation data'
          case 2:
            return 'Weather data'
          case 3:
            return 'Other data'
        }
      }
    },

    components: {
      vFormWrapper,
      vStepper,
      step1: Step1,
      step2: Step2,
      step3: Step3
    }
  }
</script>

<style scoped lang="scss">
  .new-report {
    width: 100%;

    &__form-content {
      padding: 15px;
    }
  }
</style>
