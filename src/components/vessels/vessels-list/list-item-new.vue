<template>
  <v-card to='/dashboard/vessels/new' class="vessels-list-new">
    <v-icon class="vessels-list-new__icon" icon="tiles-plus" size="huge" color="light-grey"></v-icon>
    <p>Add new vessel</p>
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
  .vessels-list-new {
    &__icon {
      margin-bottom: 60px;
    }
  }
</style>
