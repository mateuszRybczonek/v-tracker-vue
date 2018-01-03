<template>
  <div id="dashboard-index">
    <h1>Dashboard</h1>
    <div class="cards">
      <dashboard-card
        destination="dashboard/vessels"
        iconSrc="../src/assets/icons/ship.svg"
        label="Vessels">
      </dashboard-card>
      <dashboard-card
        destination="dashboard/reports"
        iconSrc="../src/assets/icons/map-marker.svg"
        label="Reports">
      </dashboard-card>
    </div>
  </div>
</template>

<script>
  import dashboardCard from './dashboard-card.vue'

  export default {
    components: {
      dashboardCard
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
