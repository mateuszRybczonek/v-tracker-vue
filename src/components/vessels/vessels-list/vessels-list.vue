<template>
  <div class="vessels-list">
    <v-list-item
      class="vessels-list__item"
      v-for="(vessel, index) in vessels"
      :vessel="vessel"></v-list-item>
    <v-list-new class="vessels-list__item"></v-list-new>
  </div>
</template>

<script>
  import VCard from '../../molecules/card.vue'
  import VListItem from './list-item.vue'
  import VListNew from './list-item-new.vue'

  export default {
    props: ['vessels'],

    components: {
      VListItem,
      VListNew,
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
