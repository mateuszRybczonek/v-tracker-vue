<template>
  <v-list-item @click.native="showNewReportFormAction()" class="reports-list-new">
    <IconBase class="vessels-list-new__icon" iconColor="#999">
      <IconTilesPlus></IconTilesPlus>
    </IconBase>
    <p>Add new report</p>
  </v-list-item>
</template>

<script>
  import VListItem from '../../../molecules/list-item.vue'
  import IconBase from '../../../atoms/icon-base.vue'
  import IconTilesPlus from '../../../icons/icon-tiles-plus.vue'

  export default {
    props: {
      showNewReportFormAction: {
        type: Function,
        required: true
      }
    },

    components: {
      VListItem,
      IconBase,
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
