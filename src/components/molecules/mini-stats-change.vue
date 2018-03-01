<template>
  <div class="mini-stats-change" :class=color>
    <v-icon
      icon="change"
      size="small"
      class="mini-stats-change__arrow"
      :color=color
      :class=rotationClass></v-icon>
    <span class="mini-stats-change__value">
      {{change}}
    </span>
    <span class="mini-stats-change__unit">
      {{unit}}
    </span>
  </div>
</template>

<script>
  import VIcon from '../../components/atoms/icon.vue'

  export default {
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
    },

    components: {
      VIcon
    }
  }
</script>

<style scoped lang="scss">
  .mini-stats-change {
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
      mask-position: 35% -787px;
    }

    .more {
      transform: rotate(270deg);
      mask-position: 35% -787px;
    }

    &.red {
      color: $color-tomato;
    }

    &.green {
      color: $color-green;
    }
  }
</style>
