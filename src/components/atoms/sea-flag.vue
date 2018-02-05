<template>
  <div id="sea-flag">
    <v-icon icon="arrow" size="small" color="black" id="arrow"></v-icon>
    <v-icon icon="wave" size="small" color="black"></v-icon>
  </div>
</template>

<script>
  import VIcon from '../../components/atoms/icon.vue'

  export default {
    props: ['height', 'direction'],

    computed: {
      classes () {
        return `icon--${this.height}m`
      },

      swellDirectionFrom () {
        return this.direction - 180
      }
    },

    components: {
      VIcon
    },

    mounted () {
      const arrow = document.getElementById('arrow')
      arrow.style.transform = `rotate(${this.swellDirectionFrom}deg)`
    }
  }
</script>

<style scoped lang="scss">
  $icon-size: 80px;
  $wrapper-size: 100px;

  #sea-flag {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
      position: absolute;
      top: 9px;
      left: 9px;
    }

    .icon {
      //icons
      &--2m {
        mask-image: url('../../assets/wind-flags.svg');
        mask-position: 3px -58px;
        mask-size: 1800%;
        background-color: $color-amber;
      }
    }
  }
</style>
