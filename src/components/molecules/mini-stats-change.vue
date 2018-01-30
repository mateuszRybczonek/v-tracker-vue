<template>
  <div class="mini-stats-change">
    <p class="mini-stats-change__value">
      {{change}}
    </p>
    <p class="mini-stats-change__unit">
      {{unit}}
    </p>
  </div>
</template>

<script>
  export default {
    props: ['change', 'unit']
  }
</script>

<style scoped lang="scss">
  .mini-stats-change {
    display: flex;
    justify-content: center;

    &__unit {
      margin-left: 5px;
    }
  }
</style>
