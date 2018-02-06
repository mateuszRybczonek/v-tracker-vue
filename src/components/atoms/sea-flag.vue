<template>
  <div id="sea-flag" :class="colorClass">
    <v-icon icon="arrow" size="small" color="black" id="arrow" :class="colorClass"></v-icon>
    <v-icon icon="wave" size="small" color="black" :class="colorClass"></v-icon>
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

      colorClass () {
        if (this.height < 3) return ''
        if (this.height < 6) return 'amber'
        return 'red'
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
