<template>
  <div class="stepper">
    <div class="step"
      @click="selectStep(1)"
      :class="{
        active: selectedStep === 'step1',
        completed: selectedStep !== 'step1',
        successful: selectedStep === 'step4',
        submitted: isSubmitted}">
      <span class="badge">
        <span class="badge-content">Navigation</span>
      </span>
      <span class="progress-bar" :class="{ 'progress-bar--visible': selectedStep !== 'step1' }"></span>
    </div>
    <div class="step"
      @click="selectStep(2)"
      :class="{
        active: selectedStep === 'step2',
        disabled: selectedStep === 'step1',
        completed: selectedStep === 'step3' || selectedStep === 'step4',
        successful: selectedStep === 'step4',
        submitted: isSubmitted}">
      <span class="badge">
        <span class="badge-content">Weather</span>
      </span>
      <span class="progress-bar" :class="{ 'progress-bar--visible': selectedStep === 'step3' || selectedStep === 'step4'}"></span>
    </div>
    <div class="step"
      @click="selectStep(3)"
      :class="{
        active: selectedStep === 'step3',
        disabled: selectedStep !== 'step3',
        completed: selectedStep === 'step4',
        successful: selectedStep === 'step4',
        submitted: isSubmitted}">
      <span class="badge">
        <span class="badge-content">Other</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectedStep: {
        type: String,
        required: true
      },

      isSubmitted: {
        type: Boolean
      }
    },

    methods: {
      selectStep (step) {
        this.$emit('selectStep', step)
      }
    }
  }
</script>

<style scoped lang="scss">
  .stepper {
    display: flex;
    margin-left: 15%;

    .step {
      min-height: 50px;
      width: 34%;
      display: flex;

      &.active {
        color: $color-blue;
        font-weight: 700;

        .badge {
          border: solid 2px;
          height: 50px;
          transition: height 1s;
        }
      }

      &.completed {
        color: $color-whitey;

        .badge {
          border-color: $color-light-blue;
          background-color: $color-light-blue;
          transition: all 600ms;

          &:before {
            content: "\2713";
          }

          .badge-content {
            margin-left: 5px;
          }
        }
      }

      &.disabled {
        pointer-events: none;

        .badge {
          border-color: $color-light-grey;
          color: $color-light-grey;
        }
      }

      &.submitted {
        pointer-events: none;

        .badge {
          border: 1px solid $color-light-grey;
          color: $color-light-grey;
          background-color: transparent;
        }

        .progress-bar {
          &--visible {
            width: 100%;
            background-color: $color-light-grey;
          }
        }
      }

      &.successful {
        .badge {
          border: 1px solid $color-light-blue;
          color: $color-light-blue;
          background-color: transparent;
        }

        .progress-bar {
          &--visible {
            width: 100%;
            background-color: $color-light-blue;
          }
        }
      }

      .badge {
        min-width: 120px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
        border: 1px solid $color-blue;
        border-radius: 3px;
      }

      .progress-bar {
        position: relative;
        top: 23px;
        width: 0;
        height: 2px;
        transition: width 1s;
        background-color: $color-light-blue;

        &--visible {
          width: 100%;
        }
      }
    }
  }
</style>
