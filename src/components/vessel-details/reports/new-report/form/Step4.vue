<template>
  <div class="step-4">
    <success-sign
      title="Success!"
      description="New report has been added!"
    ></success-sign>
  </div>
</template>

<script>
  import SuccessSign from '../../../../molecules/success-sign.vue'

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
