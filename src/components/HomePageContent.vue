<template>
  <div class="thome-page">
    <p class="thome-page__sub-text">Free Vessel Tracking App</p>
    <h1 class="home-page__main-text">V-tracker</h1>
    <p class="home-page__sub-text">Track you vessels based on reports or AIS</p>
    <ButtonPositive>
      <router-link to="/signin">Log in</router-link>
    </ButtonPositive>
  </div>
</template>

<script>
  import ButtonPositive from './Atoms/Buttons/ButtonPositive.vue'

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
      font-weight: 500;
      letter-spacing: 1px;
    }

    &__main-text {
      margin-top: 40px;
    }
  }
</style>
