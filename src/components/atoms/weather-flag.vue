<template>
  <div id="weather-flag">
    <i :class="classes"></i>
  </div>
</template>

<script>
  export default {
    props: ['speed', 'direction'],

    data () {
      return {
        flagInterval1: '',
        flagInterval2: ''
      }
    },

    computed: {
      classes () {
        return `icon--${this.iconSpeed}kn`
      },

      iconSpeed () {
        return this.speed <= 50 ? Math.floor(this.speed / 5) * 5 : 50
      }
    },

    mounted () {
      const weatherFlag = document.getElementById('weather-flag')
      weatherFlag.style.transform = `rotate(${this.direction}deg)`
//      setTimeout(() => {
//        const windDirVariation = this.iconSpeed <= 20 ? 20 : 100
//        this.flagInterval1 = setInterval(() => {
//          weatherFlag.style.transform = `rotate(${this.direction - windDirVariation}deg)`
//        }, 10000 / this.iconSpeed)
//        this.flagInterval2 = setInterval(() => {
//          weatherFlag.style.transform = `rotate(${this.direction + windDirVariation}deg)`
//        }, 20000 / this.iconSpeed)
//      }, 1500)
    },

    beforeDestroy () {
//      clearInterval(this.flagInterval1)
//      clearInterval(this.flagInterval2)
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
    border: 2px solid $color-blue;
    @include border-radius(50%);
    height: $wrapper-size;
    min-width: $wrapper-size;
    align-self: center;
    margin-left: 15px;
    transition: all 2s ease-in-out;

    > i {
      display: block;
      width: $icon-size;
      height: $icon-size;
      background-color: $color-blue;
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
