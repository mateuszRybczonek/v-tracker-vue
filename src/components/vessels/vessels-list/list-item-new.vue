<template>
  <v-card to='/dashboard/vessels/new'>
    <icon-button src="../src/assets/icons/plus-square-o.svg" size="huge"></icon-button>
    <p class="h2">Add new vessel</p>
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
  h2 {
    margin: 5px 0 0 ;

    @media all and (max-width: $phone) {
      margin-top: 15px;
      padding: 0 10px;
    }
  }
</style>
