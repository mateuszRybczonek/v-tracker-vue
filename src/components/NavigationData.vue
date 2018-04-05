<template>
  <div class="navigation-data">
    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="navigation-data__placeholder"></content-placeholders-img>
    </content-placeholders>
    <AccordionWrapper
      v-else
      :showOnInit=true color="blue"
    >
      <div
        slot="header"
        class="badge__slot"
      >
        <BaseIcon
          width=30
          height=30
          color="#FFF"
          viewBox="-5 -7 40 40"
        >
          <IconNavigation></IconNavigation>
        </BaseIcon>
        <p>Navigation</p>
      </div>
      <div
        slot="body"
        class="navigation-info__body"
      >
        <BaseList
          class="navigation-info__list"
          :items="navigationData"
          :size="big"
        ></BaseList>
      </div>
    </AccordionWrapper>
  </div>
</template>

<script>
  import AccordionWrapper from './AccordionWrapper.vue'
  import IconNavigation from './Icons/IconNavigation.vue'
  import BaseIcon from './BaseIcon.vue'
  import BaseList from './BaseList.vue'
  import { TweenMax } from 'gsap'

  const NOT_PROVIDED = 'not provided'

  export default {
    components: {
      IconNavigation,
      BaseIcon,
      AccordionWrapper,
      BaseList
    },

    props: {
      report: {
        type: Object
      },
      fetchingReports: {
        type: Boolean
      }
    },

    data () {
      return {
        tweenedCourse: this.report ? this.report.course : 0,
        tweenedSpd: this.report ? this.report.spd : 0
      }
    },

    computed: {
      course () {
        return this.report ? this.report.course : 0
      },

      spd () {
        return this.report ? this.report.spd : 0
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
          }
        ]
      }
    },

    watch: {
      course (newValue) {
        TweenMax.to(this.$data, 2, { tweenedCourse: newValue })
      },

      spd (newValue) {
        TweenMax.to(this.$data, 2, { tweenedSpd: newValue })
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
