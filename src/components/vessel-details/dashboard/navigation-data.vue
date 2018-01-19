<template>
  <div class="navigation-data">
    <v-accordion :showOnInit=true>
      <div slot="header" class="navigation-info__header">
        <p>Navigation</p>
      </div>
      <div slot="body" class="navigation-info__content">
        <ul class="navigation-info__content__list">
          <li class="navigation-info__content__list__item"
              v-for="navItem in navigationData">
            <span>{{navItem.title}}</span>
            <span>{{navItem.value}}</span>
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
        return [
          {
            title: 'Course',
            value: `${this.lastReport.course}°` || NOT_PROVIDED
          }, {
            title: 'Speed',
            value: `${this.lastReport.spd} kn` || NOT_PROVIDED
          }, {
            title: 'Roll',
            value: `${this.lastReport.roll}°` || NOT_PROVIDED
          }, {
            title: 'Pitch',
            value: `${this.lastReport.pitch}°` || NOT_PROVIDED
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
      &__list {
        width: 100%;
        padding: 0 20px;
        &__item {
          display: flex;
          justify-content: space-between;
          list-style-type: none;
          font-weight: 300;
          cursor: default;
        }
      }
    }
  }
</style>
