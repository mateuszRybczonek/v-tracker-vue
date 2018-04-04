<template>
  <div
    class="mini-stats-item-change"
    :class="color"
  >
    <BaseIcon
      class="mini-stats-change__arrow"
      :class="rotationClass"
      width=30
      height=30
      :color="color"
      viewBox="-15 -15 50 50"
    >
      <IconChange></IconChange>
    </BaseIcon>
    <span class="mini-stats-item-change__value">
      {{change}}
    </span>
    <span class="mini-stats-item-change__unit">
      {{unit}}
    </span>
  </div>
</template>

<script>
  import BaseIcon from './BaseIcon.vue'
  import IconChange from './Icons/IconChange.vue'

  export default {
    components: {
      BaseIcon,
      IconChange
    },

    props: {
      change: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        default: ''
      }
    },

    computed: {
      color () {
        if (this.change === 0) return 'black'
        return this.change < 0 ? 'red' : 'green'
      },

      rotationClass () {
        if (this.change === 0) return ''
        return this.change < 0 ? 'less' : 'more'
      }
    }
  }
</script>

<style scoped lang="scss">
  .mini-stats-item-change {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    font-weight: 500;

    &__arrow {
      margin-right: 10px;
    }

    &__value {
      align-self: center;
    }

    &__unit {
      margin-left: 5px;
      align-self: center;
    }

    .less {
      transform: rotate(90deg);
    }

    .more {
      transform: rotate(270deg);
    }

    &.red {
      color: $color-tomato;
    }

    &.green {
      color: $color-green;
    }
  }
</style>
