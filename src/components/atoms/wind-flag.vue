<template>
  <div id="weather-flag" :class="classes">
    <i :class="iconClasses"></i>
  </div>
</template>

<script>
  export default {
    props: {
      speed: {
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
      iconClasses () {
        return `icon--${this.iconSpeed}kn`
      },

      classes () {
        return `${this.colorClass} ${this.border}`
      },

      border () {
        return this.withBorder ? 'with-border' : ''
      },

      colorClass () {
        if (this.speed < 25) return ''
        if (this.speed < 40) return 'amber'
        return 'red'
      },

      iconSpeed () {
        if (this.speed <= 5) return 5
        return this.speed <= 50 ? Math.floor(this.speed / 5) * 5 : 50
      },

      windDirectionFrom () {
        return this.direction - 180
      }
    },

    watch: {
      direction (newVal, oldVal) {
        this.setFlag()
      },

      speed (newVal, oldVal) {
        this.setFlag()
      }
    },

    methods: {
      setFlag () {
        const weatherFlag = document.getElementById('weather-flag')
        weatherFlag.style.transform = `rotate(${this.windDirectionFrom}deg)`
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

  #weather-flag {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $wrapper-size;
    min-width: $wrapper-size;
    align-self: center;
    transition: all 2s ease-in-out;

    &.with-border {
      border: 2px solid $color-blue;
      @include border-radius(50%);
    }

    > i {
      display: block;
      width: $icon-size;
      height: $icon-size;
      background-color: $color-blue;
    }

    &.red {
      border-color: $color-tomato;
    }

    &.amber {
      border-color: $color-amber;
    }

    .icon {
      //icons
      &--5kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 3px -58px;
        mask-size: 1800%;
      }

      &--10kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 0 -144px;
        mask-size: 1800%;
      }

      &--15kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 0 -232px;
        mask-size: 1800%;
      }

      &--20kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 0 -314px;
        mask-size: 1800%;
      }

      &--25kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 0 -402px;
        mask-size: 1800%;
        background-color: $color-amber;
      }

      &--30kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 0 -485px;
        mask-size: 1800%;
        background-color: $color-amber;
      }

      &--35kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 0 -565px;
        mask-size: 1800%;
        background-color: $color-amber;
      }

      &--40kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 0 -647px;
        mask-size: 1800%;
        background-color: $color-tomato;
      }

      &--45kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 0 -730px;
        mask-size: 1800%;
        background-color: $color-tomato;
      }

      &--50kn {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 6px -808px;
        mask-size: 1800%;
        background-color: $color-tomato;
      }
    }
  }
</style>
