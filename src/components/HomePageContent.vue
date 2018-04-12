<template>
  <div class="home-page">
    <p class="home-page__sub-text">Free Vessel Tracking App</p>
    <h1 class="home-page__main-text">V-tracker</h1>
    <p class="home-page__sub-text">Track you vessels based on reports or AIS</p>
    <ButtonPositive>
      <router-link to="/signin">Log in</router-link>
    </ButtonPositive>
  </div>
</template>

<script>
  import ButtonPositive from './ButtonPositive.vue'

  export default {
    components: {
      ButtonPositive
    }
  }
</script>

<style scoped lang="scss">
  .home-page {
    &__sub-text {
      text-transform: uppercase;
      font-weight: $fw-normal;
      letter-spacing: 1px;
    }

    &__main-text {
      margin-top: 40px;
    }
  }
</style>
