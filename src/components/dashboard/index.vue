<template>
  <div id="dashboard-index">
    <h1>Dashboard</h1>
    <div class="cards">
      <dashboard-card v-for="card in cards"
        :key="card.label"
        :destination="card.destination"
        :icon="card.icon"
        :label="card.label">
      </dashboard-card>
    </div>
  </div>
</template>

<script>
  import dashboardCard from './dashboard-card.vue'

  export default {
    components: {
      dashboardCard
    },
    computed: {
      cards () {
        return [
          {
            destination: 'dashboard/vessels',
            icon: 'IconShip',
            label: 'Vessels'
          }, {
            destination: 'dashboard/reports',
            icon: 'IconFiles',
            label: 'Reports'
          }
        ]
      }
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

  .cards {
    display: flex;
    justify-content: space-around;
    margin: 0 40px;
  }
</style>
