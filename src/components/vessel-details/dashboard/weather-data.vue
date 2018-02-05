<template>
  <div class="weather-data">
    <v-accordion :showOnInit=true color="blue">
      <div slot="header" class="v-accordion-header__slot">
        <v-icon icon="weather" size="small" color="white"></v-icon>
        <p>Weather info</p>
      </div>
      <div slot="body" class="weather-info__content">
        <div class="weather-info__content__wind">
          <v-weather-flag class="weather-info__content__wind__flag" :speed="lastReport.windSpd" :direction="lastReport.windDir"></v-weather-flag>
          <ul class="weather-info__content__list">
            <li class="weather-info__content__list__item" v-for="windElement in windData">
              <span class="weather-info__content__list__item__title">{{windElement.title}}</span>
              <span class="weather-info__content__list__item__value">{{windElement.value}}</span>
            </li>
          </ul>
        </div>
        <div class="weather-info__content__sea">
          <v-sea-flag class="weather-info__content__sea__flag" :height="lastReport.swellHeight" :direction="lastReport.swellDir"></v-sea-flag>
          <ul class="weather-info__content__list">
            <li class="weather-info__content__list__item" v-for="seaElement in seaData">
              <span class="weather-info__content__list__item__title">{{seaElement.title}}</span>
              <span class="weather-info__content__list__item__value">{{seaElement.value}}</span>
            </li>
          </ul>
        </div>
      </div>
    </v-accordion>
  </div>
</template>

<script>
  import VIcon from '../../../components/atoms/icon.vue'
  import VWeatherFlag from '../../../components/atoms/weather-flag.vue'
  import VSeaFlag from '../../../components/atoms/sea-flag.vue'
  import VAccordion from '../../../components/molecules/accordion.vue'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: ['lastReport'],

    computed: {
      windData () {
        const windDir = this.lastReport.windDir
        const windSpd = this.lastReport.windSpd

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
        const seaState = this.lastReport.seaState
        const swellDir = this.lastReport.swellDir
        const swellHeight = this.lastReport.swellHeight

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
      VWeatherFlag,
      VSeaFlag
    }
  }
</script>

<style scoped lang="scss">
  .weather-info__content {
    display: flex;
    justify-content: space-between;
    text-align: left;
    min-height: 200px;

    &__wind, &__sea {
      display: flex;
      justify-content: baseline;
      width: 45%;
    }

    &__wind__flag {
      margin-right: 20px;
    }

    &__list {
      padding: 0 20px;
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
