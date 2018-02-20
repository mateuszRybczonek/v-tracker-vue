<template>
  <div class="navigation-data">
    <v-accordion :showOnInit=true color="blue">
      <div slot="header" class="header-badge__slot">
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
        const { course, spd } = this.lastReport

        return [
          {
            title: 'Course',
            value: course ? `${course}°` : NOT_PROVIDED
          }, {
            title: 'Speed',
            value: spd ? `${spd} kn` : NOT_PROVIDED
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
