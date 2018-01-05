<template>
  <div id="dashboard-index">
    <h1>Dashboard</h1>
    <div class="cards">
      <dashboard-card v-for="(card, index) in cards"
        :destination="card.destination"
        :iconName="card.iconName"
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
            iconName: 'ship__large',
            label: 'Vessels'
          }, {
            destination: 'dashboard/reports',
            iconName: 'files__large',
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
    margin: 50px 0;
  }

  .cards {
    display: flex;
    justify-content: space-around;
    margin: 0 40px;
  }
</style>
