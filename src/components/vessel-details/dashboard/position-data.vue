<template>
  <div class="position-data">
    <v-accordion :showOnInit=true>
      <div slot="header" class="position-info__header">
        <p>Position</p>
        <v-icon icon="position" size="medium" color="white"></v-icon>
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
  import { decimalToDMS } from '../../../utils/coordinates-utils'
  import VIcon from '../../../components/atoms/icon.vue'
  import VAccordion from '../../../components/molecules/accordion.vue'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: ['lastReport'],

    computed: {
      positionData () {
        const lat = this.lastReport.lat
        const lng = this.lastReport.lng
        return [
          {
            title: 'Latitude',
            value: lat ? decimalToDMS(lat) : NOT_PROVIDED
          }, {
            title: 'Longitude',
            value: lng ? decimalToDMS(lng) : NOT_PROVIDED
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
    &__header {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
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
