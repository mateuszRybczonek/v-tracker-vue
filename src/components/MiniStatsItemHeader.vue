<template>
  <div class="mini-stats-item-header">
    <BaseIcon
      width="30"
      height="30"
      color="#FFF"
      viewBox="10 0 76 76"
    >
      <component :is="icon"></component>
    </BaseIcon>
    <p class="mini-stats-item-header__description">{{description}}</p>
  </div>
</template>

<script>
  import BaseIcon from './BaseIcon.vue'
  import IconFuel from './Icons/IconFuel.vue'
  import IconWater from './Icons/IconWater.vue'
  import IconPeople from './Icons/IconPeople.vue'

  export default {
    components: {
      BaseIcon,
      IconFuel,
      IconWater,
      IconPeople
    },

    props: {
      icon: {
        type: String,
        required: true
      },

      description: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .mini-stats-item-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    color: $color-whitey;
    font-weight: 700;

    &__description {
      margin: 0;
      color: $color-whitey;
      font-weight: 700;
    }
  }
</style>
