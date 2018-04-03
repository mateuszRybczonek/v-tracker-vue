<template>
  <div class="navigation-data">
    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="navigation-data__placeholder"></content-placeholders-img>
    </content-placeholders>
    <v-accordion :showOnInit=true color="blue" v-else>
      <div slot="header" class="header-badge__slot">
        <BaseIcon
          width=30
          height=30
          color="#FFF"
          viewBox="-5 -7 40 40">
          <IconNavigation></IconNavigation>
        </BaseIcon>
        <p>Navigation</p>
      </div>
      <div slot="body" class="navigation-info__content">
        <ul class="navigation-info__content__list">
          <li class="navigation-info__content__list__item"
              v-for="navItem in navigationData"
              :key="navItem.title">
            <span class="navigation-info__content__list__item__title">{{navItem.title}}</span>
            <span class="navigation-info__content__list__item__value">{{navItem.value}}</span>
          </li>
        </ul>
      </div>
    </v-accordion>
  </div>
</template>

<script>
  import VAccordion from '../../../components/molecules/accordion.vue'
  import IconNavigation from '../../../components/icons/icon-navigation.vue'
  import BaseIcon from '../../../components/atoms/BaseIcon.vue'

  import { TweenMax } from 'gsap'

  const NOT_PROVIDED = 'not provided'

  export default {
    data () {
      return {
        tweenedCourse: this.report ? this.report.course : 0,
        tweenedSpd: this.report ? this.report.spd : 0
      }
    },

    props: {
      report: {
        type: Object
      },
      fetchingReports: {
        type: Boolean
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
    },

    components: {
      IconNavigation,
      BaseIcon,
      VAccordion
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
    &__content {
      display: flex;
      justify-content: space-around;
      text-align: left;
      min-height: 150px;

      &__list {
        width: 100%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &__item {
          display: flex;
          justify-content: space-between;
          list-style-type: none;
          cursor: default;
          &:nth-child(2) {
            margin-top: 15px;
          }
          &__title {
            @include font(18px, 300);
          }
          &__value {
            @include font(26px, 400);
          }
        }
      }
    }
  }
</style>
