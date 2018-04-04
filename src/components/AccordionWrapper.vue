<template>
  <div class="accordion">
    <div
      class="accordion__header"
      @click="toggle"
    >
      <ColorBadge :color="color">
        <slot name="header"></slot>
      </ColorBadge>

      <BaseIcon
        class="accordion__arrow"
        :class="{ rotate: show }"
        width=30
        height=30
        viewBox="-5 -7 40 40"
      >
        <IconArrowDown></IconArrowDown>
      </BaseIcon>
    </div>

    <transition name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave">

      <div
        class="accordion__body"
        v-show="show"
      >
        <slot name="body"></slot>
      </div>
    </transition>

    <div
      class="accordion__footer"
      v-show="show"
    >
      <slot name="footer"></slot>
    </div>

    <div
      class="accordion__footer"
      v-show="showCollapsedContent"
    >
      <slot name="collapsed-content"></slot>
    </div>
  </div>
</template>

<script>
  import ColorBadge from './ColorBadge.vue'
  import BaseIcon from './BaseIcon.vue'
  import IconArrowDown from './Icons/IconArrowDown.vue'

  export default {
    props: {
      showOnInit: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: 'black'
      },
      collapsedContent: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        show: this.showOnInit
      }
    },

    computed: {
      showCollapsedContent () {
        return !this.show && this.collapsedContent
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
    },

    components: {
      ColorBadge,
      BaseIcon,
      IconArrowDown
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
      padding: 0 20px;
      height: 60px;
      background-color: $color-white;
      cursor: pointer;
      border-bottom: 1px solid $color-whitey;
    }

    &__arrow {
      &.rotate {
        transform: rotate(180deg);
      }
      transition-duration: 0.3s;
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

    &__footer {
      display: flex;
    }
  }
</style>
