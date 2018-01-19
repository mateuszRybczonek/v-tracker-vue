<template>
  <div class="weather-data">
    <v-accordion :showOnInit=true>
      <div slot="header" class="weather-info__header">
        <p>Weather info</p>
      </div>
      <div slot="body" class="weather-info__content">
        <div class="weather-info__content__section">
          <ul class="weather-info__content__section__list">
            <li class="weather-info__content__section__list__item"
                v-for="weatherElement in weatherData">
              <span>{{weatherElement.title}}</span>
              <span>{{weatherElement.value}}</span>
            </li>
          </ul>
        </div>
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
      weatherData () {
        return [
          {
            title: 'Wind direction',
            value: `${this.lastReport.windDir}°` || NOT_PROVIDED
          }, {
            title: 'Wind speed',
            value: `${this.lastReport.windSpd} kn` || NOT_PROVIDED
          }, {
            title: 'Sea state',
            value: this.lastReport.seaState || NOT_PROVIDED
          }, {
            title: 'Swell direction',
            value: `${this.lastReport.swellDir}°` || NOT_PROVIDED
          }, {
            title: 'Swell height',
            value: `${this.lastReport.swellHeight.toFixed(1)} m` || NOT_PROVIDED
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
  .weather-info {
    &__content {
      display: flex;
      justify-content: space-around;
      text-align: left;

      &__section {
        width: 100%;

        &__list {
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
  }
</style>
