<template>
  <div class="vessels-list">
    <VesselsListItem
      class="vessels-list__item"
      v-for="vessel in vessels"
      :key="vessel.imoNumber"
      :vessel="vessel"
    />
    <VesselsListItemNew class="vessels-list__item"/>
  </div>
</template>

<script>
  import VesselsListItem from './VesselsListItem.vue'
  import VesselsListItemNew from './VesselsListItemNew.vue'

  export default {
    components: {
      VesselsListItem,
      VesselsListItemNew
    },

    props: {
      vessels: {
        type: Array
      }
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
