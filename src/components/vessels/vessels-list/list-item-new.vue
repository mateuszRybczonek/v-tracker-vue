<template>
  <v-card to='/dashboard/vessels/new' class="vessels-list-new">
    <IconBase
      class="vessels-list-new__icon"
      iconColor='#999'
      width='200'
      height='200'
    >
      <IconTilesPlus></IconTilesPlus>
    </IconBase>
    <p>Add new vessel</p>
  </v-card>
</template>

<script>
  import VCard from '../../molecules/card.vue'
  import IconBase from '../../atoms/icon-base.vue'
  import IconTilesPlus from '../../icons/icon-tiles-plus.vue'

  export default {
    components: {
      VCard,
      IconBase,
      IconTilesPlus,
    }
  }
</script>

<style scoped lang="scss">
  .vessels-list-new {
    &__icon {
      margin-bottom: 20px;
    }
  }
</style>
