<template>
  <div class="stepper">
    <div class="step"
      @click="selectStep(1)"
      :class="{
        active: selectedStep === 'step1',
        completed: selectedStep !== 'step1',
        submitted: isSubmitted}">
      <span class="badge">
        <span class="badge-content">Position</span>
      </span>
      <span class="progress-bar" :class="{ visible: selectedStep !== 'step1' }"></span>
    </div>
    <div class="step"
      @click="selectStep(2)"
      :class="{
        active: selectedStep === 'step2',
        disabled: selectedStep === 'step1',
        completed: selectedStep === 'step3',
        submitted: isSubmitted}">
      <span class="badge">
        <span class="badge-content">Weather</span>
      </span>
      <span class="progress-bar" :class="{ visible: selectedStep === 'step3' }"></span>
    </div>
    <div class="step"
      @click="selectStep(3)"
      :class="{
        active: selectedStep === 'step3',
        disabled: selectedStep !== 'step3',
        completed: isSubmitted,
        submitted: isSubmitted}">
      <span class="badge">
        <span class="badge-content">ROB</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['selectedStep', 'isSubmitted'],

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
        }
      }

      &.completed {
        color: $color-whitey;

        .badge {
          background-color: $color-blue;
        }
      }

      &.disabled {
        pointer-events: none;

        .badge {
          border-color: $color-light-grey;
          color: $color-light-grey;
        }
      }

      &.completed {
        .badge {
          &:after {
            content: "\2713";
          }

          .badge-content {
            display: none;
          }
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
          &.visible {
            background-color: $color-light-grey;
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
        width: 100%;
        height: 2px;

        &.visible {
          background-color: $color-blue;
        }
      }
    }
  }
</style>
