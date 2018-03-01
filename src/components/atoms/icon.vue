<template>
  <i :class="classes"></i>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'type'
      },
      color: {
        type: String
      }
    },

    computed: {
      classes () {
        return `
          icon--${this.icon}
          icon--${this.icon}--${this.size}
          icon--${this.size}
          icon--${this.color}
          icon--${this.type}
        `
      }
    }
  }
</script>

<style scoped lang="scss">
  $small: 30px;
  $medium: 50px;
  $large: 76px;
  $huge: 151px;
  $color-transition: background-color 0.5s ease;

  i {
    display: block;
  }

  .icon {
    fill: $color-light-grey;

    // themes
    &--positive {
      background-color: $color-light-grey;

      &:hover {
        transition: $color-transition;
        background-color: $color-blue;
      }
    }

    &--negative {
      background-color: $color-light-grey;

      &:hover {
        transition: $color-transition;
        background-color: $color-tomato;
      }
    }

    //colors
    &--white {
      background-color: #FFF;
    }

    &--light-grey {
      background-color: $color-light-grey;
    }

    &--black {
      background-color: $color-black;
    }

    &--brown {
      background-color: $color-brown;
    }

    &--light-blue {
      background-color: $color-light-blue;
    }

    &--green {
      background-color: $color-green;
    }

    &--red {
      background-color: $color-tomato;
    }

    //sizes
    &--small {
      width: $small;
      height: $small;
    }

    &--medium {
      width: $medium;
      height: $medium;
    }

    &--large {
      width: $large;
      height: $large;
    }

    &--huge {
      width: $huge;
      height: $huge;
    }

    //icons
    &--fuel {
      mask-image: url('../../assets/icons.svg');

      &--small {
        mask-position: 50% 0;
        mask-size: 100%;
      }

      &--medium {
        mask-position: 0 0;
        mask-size: 100%;
      }

      &--large {
        mask-position: 2px 0;
      }
    }

    &--water {
      mask-image: url('../../assets/icons.svg');

      &--small {
        mask-position: 50% -169px;
        mask-size: 120%;
      }

      &--medium {
        mask-position: -14px -365px;
      }

      &--large {
        mask-position: 0 -350px;
      }
    }

    &--people {
      mask-image: url('../../assets/icons.svg');

      &--small {
        mask-position: 50% -234px;
        mask-size: 120%;
      }

      &--medium {
        mask-position: -14px -503px;
      }

      &--large {
        mask-position: 0 -490px;
      }
    }

    &--tiles-plus {
      mask-image: url('../../assets/icons.svg');

      &--medium {
        mask-position: -13px -222px;
      }

      &--huge {
        mask-position: 50% -600px;
        mask-size: 141%;
      }
    }

    &--pencil {
      mask-image: url('../../assets/icons.svg');

      &--small {
        mask-position: 50% -77px;
        mask-size: 130%;
      }
    }

    &--trash {
      mask-image: url('../../assets/icons.svg');
      &--small {
        mask-position: 50% -221px;
        mask-size: 130%;
      }
    }

    &--ship {
      &--huge {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -790px;
        mask-size: 141%;
      }
    }

    &--files {
      mask-image: url('../../assets/icons.svg');
      &--small {
        mask-position: 50% -45px;
        mask-size: 141%;
      }
      &--huge {
        mask-position: 50% -206px;
        mask-size: 141%;
      }
    }

    &--position {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -564px;
        mask-size: 200%;
      }
    }

    &--navigation {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -618px;
        mask-size: 200%;
      }
    }

    &--weather {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -675px;
        mask-size: 200%;
      }
    }

    &--arrow-down {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -725px;
        mask-size: 200%;
      }
    }

    &--change {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -787px;
        mask-size: 200%;
      }
    }

    &--wave {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 0px -890px;
        mask-size: 80%;
      }
    }

    &--arrow {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: -28px -1577px;
        mask-size: 130%;
      }
    }

    &--vessel {
      &--huge {
        width: 60px;
        height: 200px;
        mask-image: url('../../assets/icons.svg');
        mask-position: -2px -968px;
        mask-size: 100%;
      }
    }

    &--statistics {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -754px;
        mask-size: 130%;
      }
    }

    &--overview {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -780px;
        mask-size: 130%;
      }
    }

    &--calendar {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -810px;
        mask-size: 130%;
      }
    }

    &--save {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -965px;
        mask-size: 130%;
      }
    }
  }
</style>
