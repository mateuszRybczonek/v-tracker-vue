<template>
  <i :class="classes"></i>
</template>

<script>
  export default {
    props: ['icon', 'size', 'type'],

    computed: {
      classes () {
        return `
          icon--${this.icon}
          icon--${this.icon}--${this.size}
          icon--${this.size}
          icon--${this.type}
        `
      }
    }
  }
</script>

<style scoped lang="scss">
  $small: 25px;
  $medium: 35px;
  $large: 76px;
  $huge: 85px;

  .icon {
    fill: $color-font-light-grey;

    &--positive {
      &:hover {
        fill: $color-green;
      }
    }

    &--negative {
      &:hover {
        fill: $color-tomato;
      }
    }

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

    &--fuel {
      background-color: #FFF;
      mask-image: url('../../assets/icons.svg');

      &--large {
        mask-position: 2px 0;
      }
    }

    &--water {
      background-color: #FFF;
      mask-image: url('../../assets/icons.svg');

      &--large {
        mask-position: 0 -350px;
      }
    }

    &--people {
      background-color: #FFF;
      mask-image: url('../../assets/icons.svg');

      &--large {
        mask-position: 0 -490px;
      }
    }
  }
</style>
