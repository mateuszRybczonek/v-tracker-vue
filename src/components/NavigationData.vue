<template>
  <div class="navigation-data">
    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="navigation-data__placeholder"></content-placeholders-img>
    </content-placeholders>
    <AccordionWrapper
      v-else
      :showOnInit="true"
    >
      <BaseBadge
        slot="header"
        title="Navigation"
        icon="IconNavigation"
        color="blue"
      />

      <div
        slot="body"
        class="navigation-info__body"
      >
        <BaseList
          class="navigation-info__list"
          :items="navigationData"
          size="big"
        />
      </div>
    </AccordionWrapper>
  </div>
</template>

<script>
  import AccordionWrapper from './AccordionWrapper.vue'
  import BaseBadge from './BaseBadge.vue'
  import BaseList from './BaseList.vue'
  import { TweenMax } from 'gsap'

  const NOT_PROVIDED = 'not provided'

  export default {
    components: {
      AccordionWrapper,
      BaseBadge,
      BaseList
    },

    props: {
      report: {
        type: Object
      },
      fetchingReports: {
        type: Boolean
      },
      distanceMadeSinceLastReport: {
        type: Number
      }
    },

    data () {
      const report = this.report
      return {
        tweenedCourse: report ? report.course : 0,
        tweenedSpd: report ? report.spd : 0,
        tweenedDistanceMade: report ? this.distanceMadeSinceLastReport : 0,
      }
    },

    computed: {
      course () {
        return this.report ? this.report.course : 0
      },

      distanceMade () {
        return this.report ? this.distanceMadeSinceLastReport : 0
      },

      spd () {
        return this.report ? this.report.spd : 0
      },

      animatedDistanceMade () {
        return this.tweenedDistanceMade.toFixed(0)
      },

      animatedCourse () {
        return this.tweenedCourse.toFixed(0)
      },

      animatedSpd () {
        return this.tweenedSpd.toFixed(0)
      },

      navigationData () {
        return [
          {
            title: 'Course',
            value: this.animatedCourse ? `${this.animatedCourse}°` : NOT_PROVIDED
          }, {
            title: 'Speed',
            value: this.animatedSpd ? `${this.animatedSpd} kn` : NOT_PROVIDED
          }, {
            title: 'Distance made since last report',
            value: this.animatedDistanceMade ?
              `${this.animatedDistanceMade} Nm` :
              NOT_PROVIDED
          }
        ]
      }
    },

    watch: {
      course (newValue) {
        TweenMax.to(this.$data, 2, { tweenedCourse: newValue })
      },

      distanceMade (newValue) {
        TweenMax.to(this.$data, 2, { tweenedDistanceMade: newValue })
      },

      spd (newValue) {
        TweenMax.to(this.$data, 2, { tweenedDistanceMade: newValue })
      }
    }
  }
</script>

<style scoped lang="scss">
  .navigation-data {
    &__placeholder {
      height: 210px;
    }
  }
  .navigation-info {
    &__body {
      display: flex;
      justify-content: space-around;
      text-align: left;
      min-height: 150px;
    }

    &__list {
      padding: 0 20px;
    }
  }
</style>
