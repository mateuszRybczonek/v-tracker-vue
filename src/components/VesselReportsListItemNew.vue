<template>
  <BaseListItem
    @click.native="showNewReportFormAction()"
    class="reports-list-new"
  >
    <BaseIcon
      class="vessels-list-new__icon"
      iconColor="#999"
    >
      <IconTilesPlus></IconTilesPlus>
    </BaseIcon>
    <p>Add new report</p>
  </BaseListItem>
</template>

<script>
  import BaseListItem from './BaseListItem.vue'
  import BaseIcon from './BaseIcon.vue'
  import IconTilesPlus from './Icons/IconTilesPlus.vue'

  export default {
    components: {
      BaseListItem,
      BaseIcon,
      IconTilesPlus
    },

    props: {
      showNewReportFormAction: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .reports-list-new {
    pointer-events: auto;
    cursor: pointer;
  }
</style>
