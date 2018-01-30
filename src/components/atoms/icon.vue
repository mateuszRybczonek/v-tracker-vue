<template>
  <i :class="classes"></i>
</template>

<script>
  export default {
    props: ['icon', 'size', 'type', 'color'],

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
        mask-position: 0 5px;
        mask-size: 800%;
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

      &--large {
        mask-position: 0 -490px;
      }
    }

    &--tiles-plus {
      &--huge {
        mask-image: url('../../assets/icons.svg');
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
      &--huge {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -206px;
        mask-size: 141%;
      }
    }

    &--position {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -1353px;
        mask-size: 200%;
      }
    }

    &--navigation {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -1407px;
        mask-size: 200%;
      }
    }

    &--weather {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -1464px;
        mask-size: 200%;
      }
    }

    &--arrow-down {
      &--small {
        mask-image: url('../../assets/icons.svg');
        mask-position: 50% -1514px;
        mask-size: 200%;
      }
    }
  }
</style>
