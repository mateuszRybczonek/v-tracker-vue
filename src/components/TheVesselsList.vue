<template>
  <div class="vessels-list">
    <TheVesselsListItem
      class="vessels-list__item"
      v-for="vessel in vessels"
      :key="vessel.imoNumber"
      :vessel="vessel"></TheVesselsListItem>
    <TheVesselsListItemNew class="vessels-list__item"></TheVesselsListItemNew>
  </div>
</template>

<script>
  import VCard from './molecules/card.vue'
  import TheVesselsListItem from './TheVesselsListItem.vue'
  import TheVesselsListItemNew from './TheVesselsListItemNew.vue'

  export default {
    props: {
      vessels: {
        type: Array
      }
    },

    components: {
      TheVesselsListItem,
      TheVesselsListItemNew,
      VCard
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
