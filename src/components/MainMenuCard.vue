<template>
  <BaseCard class="dashboard-card" :to="destination">
    <component :is="icon"></component>
    <p class="dashboard-card__label">{{label}}</p>
  </BaseCard>
</template>

<script>
  import BaseCard from './BaseCard.vue'
  import IconFiles from './icons/animated/icon-files.vue'
  import IconShip from './icons/animated/icon-ship.vue'

  export default {
    props: {
      destination: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    },

    components: {
      BaseCard,
      IconFiles,
      IconShip
    }
  }
</script>

<style scoped lang="scss">
  .dashboard-card {
    &__icon {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  }
</style>
