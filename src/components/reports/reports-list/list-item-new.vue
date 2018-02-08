<template>
  <v-card to='/dashboard/reports/new' class="reports-list-new">
    <v-icon class="reports-list-new__icon" icon="tiles-plus" size="huge" color="light-grey"></v-icon>
    <p>Add new report</p>
  </v-card>
</template>

<script>
  import VCard from '../../molecules/card.vue'
  import VIcon from '../../atoms/icon.vue'

  export default {
    components: {
      VCard,
      VIcon
    }
  }
</script>

<style scoped lang="scss">
  .reports-list-new {
    &__icon {
      margin-bottom: 60px;
    }
  }
</style>
