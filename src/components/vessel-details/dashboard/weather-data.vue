<template>
  <div class="weather-data">
    <v-accordion :showOnInit=true>
      <div slot="header" class="v-accordion-header__slot">
        <v-icon icon="weather" size="small" color="white"></v-icon>
        <p>Weather info</p>
      </div>
      <div slot="body" class="weather-info__content">
        <v-weather-flag :speed="lastReport.windSpd" :direction="lastReport.windDir"></v-weather-flag>
        <ul class="weather-info__content__list">
          <li class="weather-info__content__list__item" v-for="weatherElement in weatherData">
            <span>{{weatherElement.title}}</span>
            <span>{{weatherElement.value}}</span>
          </li>
        </ul>
      </div>
    </v-accordion>
  </div>
</template>

<script>
  import VIcon from '../../../components/atoms/icon.vue'
  import VWeatherFlag from '../../../components/atoms/weather-flag.vue'
  import VAccordion from '../../../components/molecules/accordion.vue'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: ['lastReport'],

    computed: {
      weatherData () {
        const windDir = this.lastReport.windDir
        const windSpd = this.lastReport.windSpd
        const seaState = this.lastReport.seaState
        const swellDir = this.lastReport.swellDir
        const swellHeight = this.lastReport.swellHeight

        return [
          {
            title: 'Wind direction',
            value: windDir ? `${windDir}°` : NOT_PROVIDED
          }, {
            title: 'Wind speed',
            value: windSpd ? `${windSpd} kn` : NOT_PROVIDED
          }, {
            title: 'Sea state',
            value: seaState || NOT_PROVIDED
          }, {
            title: 'Swell direction',
            value: swellDir ? `${swellDir}°` : NOT_PROVIDED
          }, {
            title: 'Swell height',
            value: swellHeight ? `${swellHeight.toFixed(1)} m` : NOT_PROVIDED
          }
        ]
      }
    },

    components: {
      VIcon,
      VAccordion,
      VWeatherFlag
    }
  }
</script>

<style scoped lang="scss">
  .weather-info {
    &__content {
      display: flex;
      justify-content: space-around;
      text-align: left;
      min-height: 130px;

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
