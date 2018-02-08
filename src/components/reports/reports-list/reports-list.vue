<template>
  <div class="reports-list">
    <v-list-new class="reports-list__item"></v-list-new>
  </div>
</template>

<script>
  import VCard from '../../molecules/card.vue'
  import VListNew from './list-item-new.vue'

  export default {
//    props: ['reports'],

    components: {
      VListNew,
      VCard
    }
  }
</script>

<style scoped lang="scss">
  .reports-list {
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
