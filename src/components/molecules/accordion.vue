<template>
  <div class="accordion">
    <div class="accordion__header" :class="color" @click="toggle">
      <slot name="header"></slot>
      <i class="fa fa-2x fa-angle-down ccordion__header-icon"
         :class="{ rotate: show }">
      </i>
    </div>
    <transition name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave">
      <div class="accordion__body" v-show="show">
        <slot name="body"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: ['showOnInit', 'color'],

    data () {
      return {
        show: this.showOnInit
      }
    },

    methods: {
      toggle () {
        this.show = !this.show
      },
      // enter (el, done) {
      //   $(el).slideDown(150, done);
      // },
      // leave (el, done) {
      //   $(el).slideUp(150, done);
      // },
      beforeEnter (el) {
        el.style.height = '0'
      },

      enter (el) {
        el.style.height = el.scrollHeight + 'px'
      },

      beforeLeave (el) {
        el.style.height = el.scrollHeight + 'px'
      },

      leave (el) {
        el.style.height = '0'
      }
    }
  }
</script>

<style scoped lang="scss">
  .accordion {
    text-align: center;
    @include border-radius(5px);
    box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.5);
    background-color: $color-white;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-left: 20px;
      height: 60px;
      background-color: $color-white;
      cursor: pointer;

      &.blue {
        background-color: $color-blue;
      }

      p {
        margin: 0;
        color: $color-whitey;
        font-weight: 700;
        align-self: center;
      }
    }

    &__header-icon {
      position: absolute;
      top: 5px;
      right: 8px;
      transform: rotate(0deg);
      transition-duration: 0.3s;
    }

    &__body {
      overflow: hidden;
      border-top: 0;
      transition: 150ms ease-out;
    }

    &__header-icon.rotate {
      transform: rotate(180deg);
      transition-duration: 0.3s;
    }
  }
</style>
