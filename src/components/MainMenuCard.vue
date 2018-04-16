<template>
  <BaseCard
    data-test-main-menu-card
    class="dashboard-card"
    :to="destination"
  >
    <component
      data-test-main-menu-card-icon
      :is="icon"
    ></component>
    <p
      data-test-main-menu-card-label
      class="dashboard-card__label"
    >
      {{label}}
    </p>
  </BaseCard>
</template>

<script>
  import BaseCard from './BaseCard.vue'
  import IconFiles from './Icons/Animated/IconAnimatedFiles.vue'
  import IconShip from './Icons/Animated/IconAnimatedShip.vue'

  export default {
    components: {
      BaseCard,
      IconFiles,
      IconShip
    },

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
