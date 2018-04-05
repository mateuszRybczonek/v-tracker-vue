<template>
  <ul class="list">
    <li
      class="list__item"
      v-for="item in items"
      :key="item.title"
    >
      <span class="item__title" :class="size">{{item.title}}</span>
      <span class="item__value" :class="size">{{item.value}}</span>
    </li>
  </ul>
</template>

<script>
  import { TweenMax } from 'gsap'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: {
      items: {
        type: Array,
        required: true
      },
      size: {
        String,
        default: 'big'
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__item {
      display: flex;
      justify-content: space-between;
      list-style-type: none;
      cursor: default;

      &:not(:first-child) {
        margin-top: 15px;
      }

      .item {
        &__title {
          &.big {
            @include font(18px, 300);
          }
        }

        &__value {
          &.big {
            @include font(26px, 400);
          }
        }
      }
    }
  }
</style>
