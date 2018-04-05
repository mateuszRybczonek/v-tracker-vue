<template>
  <div class="position-data">
    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="position-data__placeholder"></content-placeholders-img>
    </content-placeholders>
    <AccordionWrapper
      v-else
      :showOnInit=true color="red"
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
          <IconPosition></IconPosition>
        </BaseIcon>
        <p>Position</p>
      </div>
      <div
        slot="body"
        class="position-info__body"
      >
        <BaseList
          class="position-info__list"
          :items="positionData"
          :size="big"
        ></BaseList>
      </div>
    </AccordionWrapper>
  </div>
</template>

<script>
  import { decimalToDMS } from '../utils/coordinates-utils'
  import BaseIcon from './BaseIcon.vue'
  import IconPosition from './Icons/IconPosition.vue'
  import AccordionWrapper from './AccordionWrapper.vue'
  import BaseList from './BaseList.vue'

  const NOT_PROVIDED = 'not provided'

  export default {
    components: {
      BaseIcon,
      IconPosition,
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
  }
</style>
