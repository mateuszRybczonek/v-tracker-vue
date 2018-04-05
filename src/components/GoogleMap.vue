<template>
  <div class="google-map">
    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="google-map__placeholder"></content-placeholders-img>
    </content-placeholders>

    <div
      v-else
      class="google-map__map"
    >
      Mini-Google map will go here
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      fetchingReports: {
        type: Boolean
      }
    }
  }
</script>

<style scoped lang="scss">
  .google-map {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid $color-light-blue;

    &__placeholder {
      height: 460px;
    }
  }
</style>
