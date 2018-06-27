<template>
  <div class="vessels-list-wrapper">
    <VesselsGoogleMap
      class="vessels-list__chart"
      :vessels="vessels"
      :fetchingVessels="fetchingVessels"
    />
    <transition-group name="rotate-card" class="vessels-list">
        <VesselsListItem
          class="vessels-list__item"
          v-if="!fetchingVessels"
          v-for="vessel in vessels"
          :key="vessel.imoNumber"
          :vessel="vessel"
        />
        <VesselsListItemNew key="vesselsListItemNew" class="vessels-list__item"/>
    </transition-group>
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
    padding-bottom: 30px;

    .vessels-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 30px 30px 0;

      &__item {
        margin: 20px;

        @media all and (max-width: $phone) {
          margin: 0;
        }
      }
    }
  }

  .rotate-card-enter, .rotate-card-leave-to {
    opacity: 0;
    perspective-origin: 25% 75%;
    transform: perspective(400px) rotateY(45deg);
  }

  .rotate-card-enter-to, .rotate-card-leave {
    opacity: 1;
    transform: perspective(400px) rotateY(0deg);
  }

  .rotate-card-enter-active, .rotate-card-leave-active {
    transition: opacity, transform 600ms ease-out;
  }
</style>
