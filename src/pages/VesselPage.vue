<template>
  <div class="vessel">
    <TheSidebar
      :lastReport="lastReport">
    </TheSidebar>
    <div
      data-test-vessel-page-content
      class="vessel__content"
      :class="{ 'vessel__content--expanded': !sidebarVisible }"
    >
      <transition name="slide" mode="out-in">
        <component :is="selectedVesselDetailsComponent"></component>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import TheSidebar from '../components/TheSidebar.vue'
  import VesselDashboard from '../components/VesselDashboard.vue'
  import VesselStatistics from '../components/VesselStatistics.vue'
  import VesselWeather from '../components/VesselWeather.vue'
  import VesselReports from '../components/VesselReports.vue'

  export default {
    components: {
      TheSidebar,
      VesselDashboard,
      VesselStatistics,
      VesselWeather,
      VesselReports
    },

    created () {
      this.fetchReports(this.$route.params.id)
    },

    computed: {
      ...mapGetters([
        'vessels',
        'sidebarVisible',
        'selectedVesselDetailsComponent',
        'selectedReport',
        'sortedReports'
      ]),

      lastReport () {
        return this.sortedReports[0]
      }
    },

    methods: {
      ...mapActions([
        'fetchReports'
      ])
    }
  }
</script>

<style scoped lang="scss">
  .vessel {
    h1, p {
      text-align: center;
    }

    h1 {
      padding: 50px 0;
    }

    &__content {
      transition: margin-left .5s;
      margin-left: 300px;
      margin-right: 50px;
      padding: 0 15px;

      &--expanded {
        margin-left: 50px;
      }
    }

    &__item {
      margin-top: 20px;
    }
  }

  .fade-enter {
    /*1 frame at the beginning*/
    opacity: 0;
  }

  .fade-enter-active {
      transition:  opacity 500ms;
  }

  .fade-leave {
      /*opacity: 1;*/
  }

  .fade-leave-active {
      transition:  opacity 500ms;
      opacity: 0;
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 250ms ease-out forwards;
    transition:  opacity 250ms;
  }

  .slide-leave-active {
    animation: slide-out 250ms ease-out backwards;
    transition:  opacity 250ms;
    opacity: 0;

    /*to animate when the list item is removed*/
    position: absolute;
  }

  @keyframes slide-in {
    from {
      transform: rotateY(90deg);
      transform-origin: left;
    }
    to {
      transform: rotateY(0);
      transform-origin: left;
    }
  }

  @keyframes slide-out {
    from {
      transform: rotateY(0);
      transform-origin: left;
    }
    to {
      transform: rotateY(90deg);
      transform-origin: left;
    }
  }
</style>
