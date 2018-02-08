<template>
  <div id="reports">
    <h1>Reports</h1>
    <reports-list></reports-list>
  </div>
</template>

<script>
  import reportsList from '../components/reports/reports-list/reports-list.vue'

  export default {
    components: {
      reportsList
    }
  }
</script>

<style scoped lang="scss">
  h1, p {
    text-align: center;
  }

  h1 {
    padding: 50px 0;
  }
</style>
