<template>
  <div class="step-4">
    <SuccessSign
      title="Success!"
      description="New report has been added!"
    ></SuccessSign>
  </div>
</template>

<script>
  import SuccessSign from './SuccessSign.vue'

  export default {
    components: {
      SuccessSign
    }
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
  }
</style>
