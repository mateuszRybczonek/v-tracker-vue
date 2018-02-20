<template>
  <v-accordion :showOnInit=true color="blue" class="report-item">
    <div slot="header" class="v-accordion-header__slot">
      <p>{{report.reportTime}}</p>
    </div>
    <div slot="body" class="report-item__content">
      <ul class="report-item__content__list">
        <li class="report-item__content__list__item"
            v-for="reportItem in reportData">
          <span class="report-item__content__list__item__title">{{reportItem.title}}</span>
          <span class="report-item__content__list__item__value">{{reportItem.value}}</span>
        </li>
      </ul>
    </div>
  </v-accordion>
</template>

<script>
  import VAccordion from '../../../molecules/accordion.vue'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: ['report'],

    computed: {
      reportData () {
        const {
          course,
          createdAt,
          doRob,
          foRob,
          fwRob,
          lat,
          lng,
          pitch,
          pob,
          roll,
          seaState,
          spd,
          swellDir,
          swellHeight,
          windDir,
          windSpd
        } = this.report

        return [
          {
            title: 'Course',
            value: course || NOT_PROVIDED
          }, {
            title: 'Speed',
            value: spd || NOT_PROVIDED
          }, {
            title: 'Created At',
            value: createdAt || NOT_PROVIDED
          }, {
            title: 'Diesel Oil',
            value: doRob || NOT_PROVIDED
          }, {
            title: 'Fuel Oil',
            value: foRob || NOT_PROVIDED
          }, {
            title: 'Fresh Water',
            value: fwRob || NOT_PROVIDED
          }, {
            title: 'Latitude',
            value: lat || NOT_PROVIDED
          }, {
            title: 'Longitude',
            value: lng || NOT_PROVIDED
          }, {
            title: 'Pitch',
            value: pitch || NOT_PROVIDED
          }, {
            title: 'Roll',
            value: roll || NOT_PROVIDED
          }, {
            title: 'POB',
            value: pob || NOT_PROVIDED
          }, {
            title: 'Sea state',
            value: seaState || NOT_PROVIDED
          }, {
            title: 'Swell direction',
            value: swellDir || NOT_PROVIDED
          }, {
            title: 'Swell height',
            value: swellHeight || NOT_PROVIDED
          }, {
            title: 'Wind direction',
            value: windDir || NOT_PROVIDED
          }, {
            title: 'Wind speed',
            value: windSpd || NOT_PROVIDED
          }
        ]
      }
    },

    components: {
      VAccordion
    }
  }
</script>

<style scoped lang="scss">
  .report-item {
    width: 100%;
    margin-bottom: 10px;

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
