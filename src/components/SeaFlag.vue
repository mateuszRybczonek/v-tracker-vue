<template>
  <div
    id="sea-flag"
    class="sea-flag"
    :class="classes"
  >
    <div class="sea-flag__icons-wrapper">
      <BaseIcon
        id="arrow"
        width=100
        height=100
        :color='strokeColor'
        :strokeColor='strokeColor'
        viewBox="-6 22 60 60"
      >
        <IconArrow></IconArrow>
      </BaseIcon>
      <BaseIcon
        class="sea-flag__icon-wave"
        width=30
        height=30
        :strokeColor='strokeColor'
        viewBox="0 35 40 40"
      >
        <IconWave></IconWave>
      </BaseIcon>
    </div>
  </div>
</template>

<script>
  import IconWave from './Icons/IconWave.vue'
  import IconArrow from './Icons/iconArrow.vue'
  import BaseIcon from './BaseIcon.vue'

  export default {
    props: {
      height: {
        type: Number,
        required: true
      },
      direction: {
        type: Number,
        required: true
      },
      withBorder: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      border () {
        return this.withBorder ? 'with-border' : ''
      },

      classes () {
        return `${this.colorClass} ${this.border}`
      },

      strokeColor () {
        if (this.height < 3) return '#4d6d9b'
        if (this.height < 6) return '#ffc346'
        return '#F37272'
      },

      colorClass () {
        if (this.height < 3) return ''
        if (this.height < 6) return 'amber'
        return 'red'
      },

      swellDirectionFrom () {
        return this.direction - 180
      }
    },

    watch: {
      direction (newVal, oldVal) {
        this.setFlag()
      },

      height (newVal, oldVal) {
        this.setFlag()
      }
    },

    components: {
      IconWave,
      BaseIcon,
      IconArrow
    },

    methods: {
      setFlag () {
        const arrow = document.getElementById('arrow')
        arrow.style.transform = `rotate(${this.swellDirectionFrom}deg)`
      }
    },

    mounted () {
      this.setFlag()
    }
  }
</script>

<style scoped lang="scss">
  $icon-size: 80px;
  $wrapper-size: 100px;

  .sea-flag {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: $wrapper-size;
    min-width: $wrapper-size;
    align-self: center;

    &.with-border {
      border: 2px solid $color-blue;
      @include border-radius(50%);
    }

    &__icons-wrapper {
      position: relative;
      height: $wrapper-size;
      width: $wrapper-size;

      #arrow {
        transition: all 2s ease-in-out;
      }

      > i {
        display: block;
        width: $icon-size;
        height: $icon-size;
        background-color: $color-blue;
        position: absolute;
        top: 9px;
        left: 9px;
      }
    }

    &__icon-wave {
      position: relative;
      top: -70px;
      left: 33px;
    }

    .amber {
      background-color: $color-amber;
    }

    .red {
      background-color: $color-tomato;
    }

    &.red {
      border-color: $color-tomato;
    }

    &.amber {
      border-color: $color-amber;
    }
  }
</style>
