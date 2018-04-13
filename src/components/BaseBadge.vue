<template>
  <div
    data-test-base-badge
    class="badge"
    :class="color"
  >
  <div class="badge__icon">
    <BaseIcon
      width="100%"
      height="100%"
      color="#FFF"
      :viewBox="viewBox"
    >
      <component :is="icon"></component>
    </BaseIcon>
  </div>
    <p
      data-test-base-badge-title
      class="badge__title"
    >
      {{ title }}
    </p>
  </div>
</template>

<script>
  import BaseIcon from './BaseIcon.vue'
  import IconWeather from './Icons/IconWeather.vue'
  import IconNavigation from './Icons/IconNavigation.vue'
  import IconPosition from './Icons/IconPosition.vue'
  import IconFuel from './Icons/IconFuel.vue'
  import IconWater from './Icons/IconWater.vue'
  import IconPeople from './Icons/IconPeople.vue'
  import IconCalendar from './Icons/IconCalendar.vue'

  export default {
    components: {
      BaseIcon,
      IconWeather,
      IconNavigation,
      IconPosition,
      IconFuel,
      IconWater,
      IconPeople,
      IconCalendar
    },

    props: {
      color: {
        type: String,
        required: true
      },

      icon: {
        type: String,
        required: true
      },

      title: {
        type: String,
        required: true
      },

      viewBox: {
        type: String,
        default: '0 -7 40 40'
      }
    }
  }
</script>

<style scoped lang="scss">
  .badge {
    display: flex;
    padding: 0 20px;
    height: 30px;
    @include border-radius(20px);
    justify-content: center;
    align-items: center;
    margin: 0;
    color: $color-whitey;
    font-weight: $fw-bold;

    &__icon {
      @include sizing(30px);
    }

    &__title {
      margin: 0;
      color: $color-whitey;
      font-weight: $fw-bold;
    }
  }

  .black {
    background-color: $color-black;
  }

  .brown {
    background-color: $color-brown;
  }

  .blue {
    background-color: $color-blue;
  }

  .green {
    background-color: $color-green;
  }

  .light-blue {
    background-color: $color-light-blue;
  }

  .red {
    background-color: $color-tomato;
  }
</style>
