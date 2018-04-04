<template>
  <div class="new-report">
    <VesselReportsListNewStepper
      :selectedStep="selectedStep"
      :isSubmitted="isSubmitted"
      @selectStep="selectStep"
    ></VesselReportsListNewStepper>
    <FormWrapper
      :title="stepTitle"
      size="wide"
      color="blue"
    >
      <form
        class="new-report__form-content"
        slot="content"
        @submit.prevent
      >
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <component
            :is="selectedStep"
            :reportData="newReportData"
            :showErrors="showErrors"
            :isSubmitted="isSubmitted"
            :inProgress="inProgress"
            @nextStep="nextStep"
            @previousStep="previousStep"
            @submit="submit"
          ></component>
        </transition>
      </form>
    </FormWrapper>
  </div>
</template>

<script>
  import FormWrapper from './FormWrapper.vue'
  import VesselReportsListNewStepper from './VesselReportsListFormStepper.vue'
  import Step1 from './VesselReportsListFormStep1.vue'
  import Step2 from './VesselReportsListFormStep2.vue'
  import Step3 from './VesselReportsListFormStep3.vue'
  import Step4 from './VesselReportsListFormStep4.vue'
  import { formatLatForPersistanceLayer, formatLngForPersistanceLayer } from '../utils/coordinates-utils'

  export default {
    data () {
      return {
        newReportData: {
          reportTime: '2017-12-12',
          lat: '12 20.3 N',
          lng: '012 20.4 W',
          course: '123',
          spd: '12',
          windDir: '200',
          windSpd: '14',
          seaState: '2',
          swellDir: '300',
          swellHeight: '2',
          doRob: '100',
          foRob: '90',
          fwRob: '80',
          pob: '67',
          pitch: '1',
          roll: '0.3',
          updatedAt: '',
          vessel: this.$route.params.id,
          createdBy: this.$store.state.auth.userId
        },
        step: 1, // initial step
        numberOfSteps: 4,
        isSubmitted: false,
        inProgress: false,
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

        if (this.step > 1) this.step--
      },

      selectStep (step) {
        this.step = step
      },

      async submit (invalidStep) {
        const newReportData = {
          ...this.newReportData,
          createdAt: new Date(Date.now())
        }

        newReportData.lat = formatLatForPersistanceLayer(newReportData.lat)
        newReportData.lng = formatLngForPersistanceLayer(newReportData.lng)

        if (invalidStep) {
          this.showErrors = true
          return false
        } else {
          this.inProgress = true
          try {
            await this.$store.dispatch('createNewReport', newReportData)
            this.inProgress = false
            this.isSubmitted = true
            this.step++
            setTimeout(() => {
              this.$emit('hideReportForm')
            }, 2000)
          } catch (error) {
            this.inProgress = false
            // flash message shall go here
            alert('Something went wrong')
          }
        }
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
          case 4:
            return 'Success'
        }
      }
    },

    components: {
      FormWrapper,
      VesselReportsListNewStepper,
      Step1,
      Step2,
      Step3,
      Step4
    }
  }
</script>

<style scoped lang="scss">
  .new-report {
    width: 100%;

    &__form-content {
      padding: 15px;
      min-height: 460px;
    }

    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(20px);
      opacity: 0;
    }
  }
</style>
