<template>
  <v-list-item to='/dashboard/reports/new' class="reports-list-new">
    <v-icon class="reports-list-new__icon" icon="tiles-plus" size="medium" color="light-grey"></v-icon>
    <p>Add new report</p>
  </v-list-item>
</template>

<script>
  import VListItem from '../../molecules/list-item.vue'
  import VIcon from '../../atoms/icon.vue'

  export default {
    components: {
      VListItem,
      VIcon
    }
  }
</script>

<style scoped lang="scss">
</style>
