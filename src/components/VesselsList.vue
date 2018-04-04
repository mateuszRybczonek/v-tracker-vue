<template>
  <div class="vessels-list">
    <VesselsListItem
      class="vessels-list__item"
      v-for="vessel in vessels"
      :key="vessel.imoNumber"
      :vessel="vessel"></VesselsListItem>
    <VesselsListItemNew class="vessels-list__item"></VesselsListItemNew>
  </div>
</template>

<script>
  import VesselsListItem from './VesselsListItem.vue'
  import VesselsListItemNew from './VesselsListItemNew.vue'

  export default {
    props: {
      vessels: {
        type: Array
      }
    },

    components: {
      VesselsListItem,
      VesselsListItemNew
    }
  }
</script>

<style scoped lang="scss">
  .vessels-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 30px;

    &__item {
      margin: 20px;

      @media all and (max-width: $phone) {
        margin: 0;
      }
    }
  }
</style>
