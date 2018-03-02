<template>
  <div class="weather-data">
    <v-accordion :showOnInit=true color="blue">
      <div slot="header" class="header-badge__slot">
        <v-icon icon="weather" size="small" color="white"></v-icon>
        <p>Weather info</p>
      </div>
      <div slot="body" class="weather-info__content">
        <div class="weather-info__content__data">
          <div class="weather-info__content__wind">
            <v-wind-flag
              class="weather-info__content__wind__flag"
              :speed="report.windSpd"
              :direction="report.windDir"
              :withBorder=true></v-wind-flag>
            <ul class="weather-info__content__list">
              <li class="weather-info__content__list__item" v-for="windElement in windData">
                <span class="weather-info__content__list__item__title">{{windElement.title}}</span>
                <span class="weather-info__content__list__item__value">{{windElement.value}}</span>
              </li>
            </ul>
          </div>
          <div class="weather-info__content__sea">
            <v-sea-flag
              class="weather-info__content__sea__flag"
              :height="report.swellHeight"
              :direction="report.swellDir"
              :withBorder=true></v-sea-flag>
            <ul class="weather-info__content__list">
              <li class="weather-info__content__list__item" v-for="seaElement in seaData">
                <span class="weather-info__content__list__item__title">{{seaElement.title}}</span>
                <span class="weather-info__content__list__item__value">{{seaElement.value}}</span>
              </li>
            </ul>
          </div>
        </div>
        <v-weather-situation
          class="weather-info__content__situation"
          :report="report">
        </v-weather-situation>
      </div>
    </v-accordion>
  </div>
</template>

<script>
  import VIcon from '../../../components/atoms/icon.vue'
  import VWindFlag from '../../../components/atoms/wind-flag.vue'
  import VSeaFlag from '../../../components/atoms/sea-flag.vue'
  import VWeatherSituation from '../weather/weather-situation.vue'
  import VAccordion from '../../../components/molecules/accordion.vue'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: {
      report: {
        type: Object
      }
    },

    computed: {
      windData () {
        const windDir = this.report.windDir
        const windSpd = this.report.windSpd

        return [
          {
            title: 'Wind direction',
            value: windDir ? `${windDir}°` : NOT_PROVIDED
          }, {
            title: 'Wind speed',
            value: windSpd ? `${windSpd} kn` : NOT_PROVIDED
          }
        ]
      },

      seaData () {
        const seaState = this.report.seaState
        const swellDir = this.report.swellDir
        const swellHeight = parseInt(this.report.swellHeight)

        return [
          {
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
      VWindFlag,
      VSeaFlag,
      VWeatherSituation
    }
  }
</script>

<style scoped lang="scss">
  .weather-info__content {
    display: flex;
    justify-content: space-between;
    text-align: left;
    min-height: 200px;
    padding: 30px;

    &__wind, &__sea {
      display: flex;
      justify-content: baseline;
      margin-left: 15px;
    }

    &__sea {
      margin-top: 100px;
    }

    &__data {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: baseline;
      align-self: center;
    }

    &__situation {
      width: 50%;
    }

    &__list {
      padding: 0 0 0 40px;
      align-self: center;
      &__item {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        list-style-type: none;
        font-weight: 300;
        cursor: default;
        margin-top: 15px;
        &__title {
          @include font(18px, 300);
          margin-right: 25px;
        }
        &__value {
          @include font(26px, 400);
        }
      }
    }
  }
</style>
