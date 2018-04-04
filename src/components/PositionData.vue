<template>
  <div class="position-data">
    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="position-data__placeholder"></content-placeholders-img>
    </content-placeholders>
    <AccordionWrapper :showOnInit=true color="red" v-else>
      <div slot="header" class="badge__slot">
        <BaseIcon
          width=30
          height=30
          color="#FFF"
          viewBox="-5 -7 40 40">
          <IconPosition></IconPosition>
        </BaseIcon>
        <p>Position</p>
      </div>
      <div slot="body" class="position-info__content">
        <ul class="position-info__content__list">
          <li class="position-info__content__list__item"
              v-for="coordinate in positionData"
              :key="coordinate.title">
            <span class="position-info__content__list__item__title">{{coordinate.title}}</span>
            <span class="position-info__content__list__item__value">{{coordinate.value}}</span>
          </li>
        </ul>
      </div>
    </AccordionWrapper>
  </div>
</template>

<script>
  import { decimalToDMS } from '../utils/coordinates-utils'
  import BaseIcon from './BaseIcon.vue'
  import IconPosition from './Icons/IconPosition.vue'
  import AccordionWrapper from './AccordionWrapper.vue'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: {
      report: {
        type: Object
      },
      fetchingReports: {
        type: Boolean
      }
    },

    computed: {
      positionData () {
        const { lat, lng } = this.report

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
      BaseIcon,
      IconPosition,
      AccordionWrapper
    }
  }
</script>

<style scoped lang="scss">
  .position-data {
    margin-top: 0;

    &__placeholder {
      height: 210px;
    }

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
