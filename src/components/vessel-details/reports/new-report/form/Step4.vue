<template>
  <div class="step-4">
    <div class="circle">
      <span class="checkmark draw"></span>
    </div>
    <h3>Success!</h3>
    <p>New report has been added!</p>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
  .step-4 {
    padding: 10px;
    min-height: 420px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    $loader-size: 8em;
    $check-height: $loader-size/2;
    $check-width: $check-height/2;
    $check-left: ($loader-size/6 + $loader-size/12);
    $check-thickness: 3px;
    $check-color: $color-light-blue;

    .circle {
      margin: 0 0 30px 10px;
      border: $check-thickness solid rgba(0, 0, 0, 0.2);
      border-left-color: $check-color;
      position: relative;
    }

    .circle,
    .circle:after {
      border-radius: 50%;
      width: $loader-size;
      height: $loader-size;
      border-color: $check-color;
      transition: border 2s ease-out;
    }

    .checkmark {
      &.draw:after {
        animation-duration: 2000ms;
        animation-timing-function: ease;
        animation-name: checkmark;
        transform: scaleX(-1) rotate(135deg);
      }

      &:after {
        opacity: 1;
        height: $check-height;
        width: $check-width;
        transform-origin: left top;
        border-right: $check-thickness solid $check-color;
        border-top: $check-thickness solid $check-color;
        content: '';
        left: $check-left;
        top: $check-height;
        position: absolute;
      }
    }

    @keyframes checkmark {
      0% {
        height: 0;
        width: 0;
        opacity: 1;
      }
      20% {
        height: 0;
        width: $check-width;
        opacity: 1;
      }
      40% {
        height: $check-height;
        width: $check-width;
        opacity: 1;
      }
      100% {
        height: $check-height;
        width: $check-width;
        opacity: 1;
      }
    }
  }
</style>
