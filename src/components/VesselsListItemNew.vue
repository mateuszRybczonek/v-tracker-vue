<template>
  <BaseCard to='/dashboard/vessels/new' class="vessels-list-new">
    <BaseIcon
      class="vessels-list-new__icon"
      iconColor='#999'
      width='200'
      height='200'
    >
      <IconTilesPlus></IconTilesPlus>
    </BaseIcon>
    <p>Add new vessel</p>
  </BaseCard>
</template>

<script>
  import BaseCard from './BaseCard.vue'
  import BaseIcon from './BaseIcon.vue'
  import IconTilesPlus from './Icons/IconTilesPlus.vue'

  export default {
    components: {
      BaseCard,
      BaseIcon,
      IconTilesPlus
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
