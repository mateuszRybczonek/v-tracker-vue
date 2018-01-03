<template>
  <v-card to='/dashboard/vessels/new'>
    <icon-button src="../src/assets/icons/plus-square-o.svg" size="huge"></icon-button>
    <p>Add new vessel</p>
  </v-card>
</template>

<script>
  import VCard from '../../molecules/card.vue'
  import IconButton from '../../atoms/buttons/icon-button'

  export default {
    components: {
      VCard,
      IconButton
    }
  }
</script>

<style scoped lang="scss">
</style>
