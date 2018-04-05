<template>
  <div
    class="mini-stats-item-body"
    :class="item.color"
  >
    <div class="mini-stats-item-body__icon">
      <BaseIcon
        width=80
        height=80
      >
        <component :is="item.icon"></component>
      </BaseIcon>
    </div>
    <div class="mini-stats-item-body__description">
      <div class="description__header">
        {{item.header}}
      </div>
      <div class="description__text">
        {{item.unit}}
      </div>
    </div>
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
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .mini-stats-item-body {
    &.black {
      color: $color-black;
    }

    &.brown {
      color: $color-brown;
    }

    &.light-blue {
      color: $color-light-blue;
    }

    &.green {
      color: $color-green
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__description {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      max-height: 60px;

      .description__header {
        @include font(60px, 400, 60px);
      }

      .description__text {
        margin-left: 10px;
        @include font(12px, 300);
        text-transform: uppercase;
        letter-spacing: 2px;
        align-self: flex-end;
      }
    }
  }
</style>
