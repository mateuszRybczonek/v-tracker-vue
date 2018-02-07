<template>
  <div class="navigation-data">
    <v-accordion :showOnInit=true color="blue">
      <div slot="header" class="v-accordion-header__slot">
        <v-icon icon="navigation" size="small" color="white"></v-icon>
        <p>Navigation</p>
      </div>
      <div slot="body" class="navigation-info__content">
        <ul class="navigation-info__content__list">
          <li class="navigation-info__content__list__item"
              v-for="navItem in navigationData">
            <span class="navigation-info__content__list__item__title">{{navItem.title}}</span>
            <span class="navigation-info__content__list__item__value">{{navItem.value}}</span>
          </li>
        </ul>
      </div>
    </v-accordion>
  </div>
</template>

<script>
  import VIcon from '../../../components/atoms/icon.vue'
  import VAccordion from '../../../components/molecules/accordion.vue'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: ['lastReport'],

    computed: {
      navigationData () {
        const course = this.lastReport.course
        const spd = this.lastReport.spd
        const roll = this.lastReport.roll
        const pitch = this.lastReport.pitch

        return [
          {
            title: 'Course',
            value: course ? `${course}°` : NOT_PROVIDED
          }, {
            title: 'Speed',
            value: spd ? `${spd} kn` : NOT_PROVIDED
          }, {
            title: 'Roll',
            value: roll ? `${roll}°` : NOT_PROVIDED
          }, {
            title: 'Pitch',
            value: pitch ? `${pitch}°` : NOT_PROVIDED
          }
        ]
      }
    },

    components: {
      VIcon,
      VAccordion
    }
  }
</script>

<style scoped lang="scss">
  .navigation-info {
    &__content {
      display: flex;
      justify-content: space-around;
      align-items: baseline;
      text-align: left;
      min-height: 150px;

      &__list {
        width: 100%;
        padding: 0 20px;
        &__item {
          display: flex;
          justify-content: space-between;
          list-style-type: none;
          font-weight: 300;
          cursor: default;
          margin-top: 10px;
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
