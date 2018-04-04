<template>
  <div class="main-menu">
    <h1>Main menu</h1>
    <div class="main-menu__cards">
      <MainMenuCard v-for="card in cards"
        :key="card.label"
        :destination="card.destination"
        :icon="card.icon"
        :label="card.label"
      >
      </MainMenuCard>
    </div>
  </div>
</template>

<script>
  import MainMenuCard from './MainMenuCard.vue'

  export default {
    components: {
      MainMenuCard
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
  .main-menu {
    h1, p {
      text-align: center;
    }

    h1 {
      padding: 50px 0;
    }

    &__cards {
      display: flex;
      justify-content: space-around;
      margin: 0 40px;
    }
  }
</style>
