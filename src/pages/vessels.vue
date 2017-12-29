<template>
  <div id="vessels">
    <h1>Vessels</h1>
    <vessels-list></vessels-list>
  </div>
</template>

<script>
  import vesselsList from '../components/vessels/vessels-list/vessels-list.vue'

  export default {
    components: {
      vesselsList
    }
  }
</script>

<style scoped lang="scss">
  h1, p {
    text-align: center;
  }

  h1 {
    margin: 50px 0;
  }
</style>
