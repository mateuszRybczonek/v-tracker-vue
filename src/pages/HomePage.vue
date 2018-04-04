<template>
  <HomePageContent class="home-page"></HomePageContent>
</template>

<script>
  import HomePageContent from '../components/HomePageContent.vue'

  export default {
    components: {
      HomePageContent
    }
  }
</script>

<style scoped lang="scss">
  .home-page {
    text-align: center;

    $section-height: 100vh;
    width: 100%;
    height: $section-height;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:after {
      content: "";
      background: url('../assets/login-background.jpg') no-repeat center center fixed;
      filter: grayscale(100%);
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
      background-size: cover;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
