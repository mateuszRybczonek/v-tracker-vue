<template>
  <md-icon :md-src="src" :class="classes"></md-icon>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      }
    },

    computed: {
      classes () {
        return `${this.type} ${this.size}`
      }
    }
  }
</script>

<style scoped lang="scss">
  $small: 25px;
  $medium: 35px;
  $large: 50px;
  $huge: 85px;

  i {
    fill: $color-light-grey;

    &.positive {
      &:hover {
        fill: $color-blue;
      }
    }

    &.negative {
      &:hover {
        fill: $color-tomato;
      }
    }

    &.small {
      width: $small;
      height: $small;
    }

    &.medium {
      width: $medium;
      height: $medium;
    }

    &.large {
      width: $large;
      height: $large;
    }

    &.huge {
      width: $huge;
      height: $huge;
    }
  }
</style>
