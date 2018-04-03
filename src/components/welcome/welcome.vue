<template>
  <div id="welcome">
    <p class="small-text small-text-top">Free Vessel Tracking App</p>
    <h1 class="main-text">V-tracker</h1>
    <p class="small-text small-text-bottom">Track you vessels based on reports or AIS</p>
    <ButtonPositive>
      <router-link to="/signin" class="login-button">Log in</router-link>
    </ButtonPositive>
  </div>
</template>

<script>
  import ButtonPositive from '../Atoms/Buttons/ButtonPositive.vue'

  export default {
    components: {
      ButtonPositive
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
