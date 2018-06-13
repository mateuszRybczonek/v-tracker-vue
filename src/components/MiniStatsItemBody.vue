<template>
  <div
    data-test-mini-stats-item-body
    class="mini-stats-item-body"
    :class="item.color"
  >
    <div class="mini-stats-item-body__icon">
      <DoughnutChartRemainingOnBoard
        v-if="isFreeSpacePresent"
        :filled="filledValue"
        :change="item.change"
        :empty="item.freeSpace"
        :color="item.color"
      />
      <BaseIcon
        v-else
        width="80"
        height="80"
      >
        <component
          data-test-mini-stats-item-body-icon
          :is="item.icon"
        ></component>
      </BaseIcon>
    </div>
    <div
      data-test-mini-stats-item-body-description
      class="mini-stats-item-body__description"
    >
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
  import DoughnutChartRemainingOnBoard from './DoughnutChartRemainingOnBoard'

  export default {
    components: {
      BaseIcon,
      IconFuel,
      IconWater,
      IconPeople,
      DoughnutChartRemainingOnBoard
    },

    props: {
      item: {
        type: Object,
        required: true
      }
    },

    computed: {
      filledValue () {
        const filled = parseInt(this.item.header)
        const change = this.item.change

        return change < 0 ? filled : filled - change
      },

      isFreeSpacePresent () {
        const freeSpace = this.item.freeSpace
        return freeSpace || freeSpace === 0
      }
    }
  }
</script>

<style scoped lang="scss">
  .mini-stats-item-body {
    position: relative;

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
