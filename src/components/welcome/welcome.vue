<template>
  <div id="welcome">
    <p class="small-text small-text-top">Free Vessel Tracking App</p>
    <h1 class="main-text">V-tracker</h1>
    <p class="small-text small-text-bottom">Track you vessels based on reports or AIS</p>
    <positive-button>
      <router-link to="/signin" class="login-button">Log in</router-link>
    </positive-button>
  </div>
</template>

<script>
  import PositiveButton from '../atoms/buttons/positive.vue'

  export default {
    components: {
      'positive-button': PositiveButton
    }
  }
</script>

<style scoped lang="scss">
  #welcome {
    @include main-page-background();
    text-align: center;

    .small-text {
      text-transform: uppercase;
      font-weight: 500;
      letter-spacing: 1px;
    }

    .small-text-top {
      &:after {
        top: 15px;
        left: 50%;
        bottom: 0;
        position: relative;
        width: 35px;
        height: 2px;
        content: "";
        display: inherit;
        background-color: $color-blue;
        transform: translateX(-50%);
        background-size: cover;
        height: 100%;
        overflow: hidden;
      }
    }

    .main-text {
      margin-top: 40px;
    }
  }
</style>
