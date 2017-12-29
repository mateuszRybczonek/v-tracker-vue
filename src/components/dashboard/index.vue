<template>
  <div id="dashboard-index">
    <h1>Dashboard</h1>
    <div class="cards">
      <vessels-card></vessels-card>
      <reports-card></reports-card>
    </div>
  </div>
</template>

<script>
  import vesselsCard from './vessels-card.vue'
  import reportsCard from './reports-card.vue'

  export default {
    components: {
      vesselsCard,
      reportsCard
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

  .cards {
    display: flex;
    justify-content: space-around;
    margin: 0 40px;
  }
</style>
