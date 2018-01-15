<template>
  <div class="accordion">
    <div class="accordion__header" @click="toggle">
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
        <div class="accordion__body-inner">
          <slot name="body"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: ['showOnInit'],

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
    border: 1px solid $color-light-grey;
    text-align: center;
    @include border-radius(5px);

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background-color: $color-dark-grey;

      > h3 {
        margin: 0;
        color: $color-whitey;
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

    &__body-inner {
      padding: 35px 50px 20px;
      overflow-wrap: break-word;
    }

    &__header-icon.rotate {
      transform: rotate(180deg);
      transition-duration: 0.3s;
    }
  }
</style>
