<template>
  <div class="home-page" data-test-home-page>
    <p class="home-page__sub-text" data-test-home-page-sub-text-upper>Free Vessel Tracking App</p>
    <h1 class="home-page__main-text" data-test-home-page-main-text>V-tracker</h1>
    <p class="home-page__sub-text" data-test-home-page-sub-text-lower>Track you vessels based on reports or AIS</p>
    <ButtonPositive>
      <router-link
        data-test-home-page-button-link
        to="/signin"
      >
        Log in
      </router-link>
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
