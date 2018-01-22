<template>
  <v-card class="dashboard-card" :to="destination">
    <v-icon class="dashboard-card__icon" :icon=icon size="huge" color="light-grey"></v-icon>
    <p class="dashboard-card__label">{{label}}</p>
  </v-card>
</template>

<script>
  import VCard from '../../components/molecules/card.vue'
  import VIcon from '../../components/atoms/icon.vue'

  export default {
    props: ['destination', 'icon', 'label'],
    components: {
      VCard,
      VIcon
    }
  }
</script>

<style scoped lang="scss">
  .dashboard-card {
    &__icon {
      width: 151px;
      height: 151px;
      margin-bottom: 70px;
    }
  }
</style>
