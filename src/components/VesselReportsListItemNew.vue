<template>
  <ListItem @click.native="showNewReportFormAction()" class="reports-list-new">
    <BaseIcon class="vessels-list-new__icon" iconColor="#999">
      <IconTilesPlus></IconTilesPlus>
    </BaseIcon>
    <p>Add new report</p>
  </ListItem>
</template>

<script>
  import ListItem from './ListItem.vue'
  import BaseIcon from './BaseIcon.vue'
  import IconTilesPlus from './icons/icon-tiles-plus.vue'

  export default {
    props: {
      showNewReportFormAction: {
        type: Function,
        required: true
      }
    },

    components: {
      ListItem,
      BaseIcon,
      IconTilesPlus
    }
  }
</script>

<style scoped lang="scss">
  .reports-list-new {
    pointer-events: auto;
    cursor: pointer;
  }
</style>
