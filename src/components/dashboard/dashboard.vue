<template>
  <div id="dashboard">
    <v-header />
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p v-if="email">Your email address: {{ email }}</p>

    <div class="container">
      <div class="row">
        <v-stepper
          :selectedStep="selectedStep"
          :isSubmitted="isSubmitted"
          @selectStep="selectStep"></v-stepper>
        <v-form-wrapper title="Onboarding">
            <form slot="content" @submit.prevent>
              <transition name="slide" type="animation">
                <component
                  :is="selectedStep"
                  :userData="userData"
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
    </div>
  </div>
</template>

<script>
  import vHeader from '../header/header.vue'
  import vFormWrapper from '../form-wrapper.vue'
  import vStepper from './multi-step-form/Stepper.vue'
  import Step1 from './multi-step-form/Step1.vue'
  import Step2 from './multi-step-form/Step2.vue'
  import Step3 from './multi-step-form/Step3.vue'

  export default {
    data () {
      return {
        userData: {
          firstName: '',
          lastName: '',
          age: '',
          address: {
            street: '',
            postalCode: '',
            city: '',
            country: ''
          },
          message: ''
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
      email () {
        return !this.$store.getters.user ? false : this.$store.getters.user.email
      },

      selectedStep () {
        return `step${this.step}`
      },

      lastStep () {
        return this.step === this.numberOfSteps
      }
    },

    created () {
      this.$store.dispatch('fetchUser')
    },

    components: {
      vHeader,
      vFormWrapper,
      vStepper,
      step1: Step1,
      step2: Step2,
      step3: Step3
    }
  }
</script>

<style scoped lang="scss">
  h1, p {
    text-align: center;
  }
</style>
