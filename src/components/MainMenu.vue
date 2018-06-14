<template>
  <div class="main-menu">
    <h1 data-test-main-menu-header>Main menu</h1>
    <div class="main-menu__cards">
      <MainMenuCard
        data-test-main-menu-cards
        v-for="card in cards"
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

    data () {
      return {
        cards: [
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
      height: 100vh;
      justify-content: space-around;
      margin: 0 40px;
    }
  }
</style>
