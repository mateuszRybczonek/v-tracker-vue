<template>
  <div class="position-data">
    <v-accordion :showOnInit=true>
      <div slot="header" class="position-info__header">
        <p>Position</p>
      </div>
      <div slot="body" class="position-info__content">
        <ul class="position-info__content__list">
          <li class="position-info__content__list__item"
              v-for="coordinate in positionData">
            <span>{{coordinate.title}}</span>
            <span>{{coordinate.value}}</span>
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
      positionData () {
        return [
          {
            title: 'Latitude',
            value: `${this.lastReport.lat}°` || NOT_PROVIDED
          }, {
            title: 'Longitude',
            value: `${this.lastReport.lng}°` || NOT_PROVIDED
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
  .position-info {
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
