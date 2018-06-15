<template>
  <div class="vessels-list-wrapper">
    <VesselsGoogleMap
      class="vessels-list__chart"
      :vessels="vessels"
      :fetchingVessels="fetchingVessels"
    />
    <div class="vessels-list">
      <VesselsListItem
        class="vessels-list__item"
        v-if="!fetchingVessels"
        v-for="vessel in vessels"
        :key="vessel.imoNumber"
        :vessel="vessel"
      />
      <VesselsListItemNew class="vessels-list__item"/>
    </div>
  </div>
</template>

<script>
  import VesselsListItem from '@/components/VesselsListItem.vue'
  import VesselsListItemNew from '@/components/VesselsListItemNew.vue'
  import VesselsGoogleMap from '@/components/VesselsGoogleMap'

  export default {
    components: {
      VesselsListItem,
      VesselsListItemNew,
      VesselsGoogleMap
    },

    props: {
      vessels: {
        type: Array
      },
      fetchingVessels: {
        type: Boolean
      }
    }
  }
</script>

<style scoped lang="scss">
  .vessels-list-wrapper {
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
    },
    .vessels-list__chart {
      margin-bottom: 30px;
    }
  }
</style>
