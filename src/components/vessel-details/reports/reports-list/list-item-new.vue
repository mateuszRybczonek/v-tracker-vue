<template>
  <v-list-item @click.native="showNewReportFormAction()" class="reports-list-new">
    <v-icon class="reports-list-new__icon" icon="tiles-plus" size="medium" color="light-grey"></v-icon>
    <p>Add new report</p>
  </v-list-item>
</template>

<script>
  import VListItem from '../../../molecules/list-item.vue'
  import VIcon from '../../../atoms/icon.vue'

  export default {
    props: ['showNewReportFormAction'],

    components: {
      VListItem,
      VIcon
    }
  }
</script>

<style scoped lang="scss">
  .reports-list-new {
    pointer-events: auto;
    cursor: pointer;
  }
</style>
