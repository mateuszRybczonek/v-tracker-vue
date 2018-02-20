<template>
  <div class="position-data">
    <v-accordion :showOnInit=true color="red">
      <div slot="header" class="v-accordion-header__slot">
        <v-icon icon="position" size="small" color="white"></v-icon>
        <p>Position</p>
      </div>
      <div slot="body" class="position-info__content">
        <ul class="position-info__content__list">
          <li class="position-info__content__list__item"
              v-for="coordinate in positionData">
            <span class="position-info__content__list__item__title">{{coordinate.title}}</span>
            <span class="position-info__content__list__item__value">{{coordinate.value}}</span>
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
        const { lat, lng } = this.lastReport

        return [
          {
            title: 'Latitude',
            value: lat ? decimalToDMS(lat) : NOT_PROVIDED
          }, {
            title: 'Longitude',
            value: lng ? decimalToDMS(lng, false) : NOT_PROVIDED
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
  .position-data {
    margin-top: 0;

    .position-info {
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
            align-items: baseline;
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
  }
</style>
