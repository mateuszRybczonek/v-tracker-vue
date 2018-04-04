<template>
  <div class="weather-data">
    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="weather-data__placeholder"></content-placeholders-img>
    </content-placeholders>
    <AccordionWrapper :showOnInit=true color="blue" else>
      <div slot="header" class="badge__slot">
        <BaseIcon
          width=30
          height=30
          color="#FFF"
          viewBox="-5 -7 40 40">
          <IconWeather></IconWeather>
        </BaseIcon>
        <p>Weather info</p>
      </div>
      <div slot="body" class="weather-info__content">
        <div class="weather-info__content__data">
          <div class="weather-info__content__wind">
            <WindFlag
              class="weather-info__content__wind__flag"
              :speed="windSpd"
              :direction="windDir"
              :withBorder=true>
            </WindFlag>
            <ul class="weather-info__content__list">
              <li class="weather-info__content__list__item"
                v-for="windElement in windData"
                :key="windElement.title"
                >
                <span class="weather-info__content__list__item__title">{{windElement.title}}</span>
                <span class="weather-info__content__list__item__value">{{windElement.value}}</span>
              </li>
            </ul>
          </div>
          <div class="weather-info__content__sea">
            <SeaFlag
              class="weather-info__content__sea__flag"
              :height="swellHeight"
              :direction="swellDir"
              :withBorder=true>
            </SeaFlag>
            <ul class="weather-info__content__list">
              <li class="weather-info__content__list__item"
                v-for="seaElement in seaData"
                :key="seaElement.title"
              >
                <span class="weather-info__content__list__item__title">{{seaElement.title}}</span>
                <span class="weather-info__content__list__item__value">{{seaElement.value}}</span>
              </li>
            </ul>
          </div>
        </div>
        <WeatherSituation v-if="!fetchingReports"
          class="weather-info__content__situation"
          :report="report">
        </WeatherSituation>
      </div>
    </AccordionWrapper>
  </div>
</template>

<script>
  import IconWeather from './icons/icon-weather.vue'
  import BaseIcon from './BaseIcon.vue'
  import WindFlag from './WindFlag.vue'
  import SeaFlag from './SeaFlag.vue'
  import WeatherSituation from './WeatherSituation.vue'
  import AccordionWrapper from './AccordionWrapper.vue'
  import { TweenMax } from 'gsap'

  const NOT_PROVIDED = 'not provided'

  export default {
    data () {
      return {
        tweenedWindDir: this.report ? this.report.windDir : 0,
        tweenedWindSpd: this.report ? this.report.windSpd : 0,
        tweenedSeaState: this.report ? this.report.seaState : 0,
        tweenedSwellDir: this.report ? this.report.swellDir : 0,
        tweenedSwellHeight: this.report ? this.report.swellHeight : 0
      }
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
      windDir () {
        return this.report ? this.report.windDir : 0
      },

      windSpd () {
        return this.report ? this.report.windSpd : 0
      },

      seaState () {
        return this.report ? this.report.seaState : 0
      },

      swellDir () {
        return this.report ? this.report.swellDir : 0
      },

      swellHeight () {
        return this.report ? this.report.swellHeight : 0
      },

      animatedSeaState () {
        return this.tweenedSeaState.toFixed(0)
      },

      animatedWindDir () {
        return this.tweenedWindDir.toFixed(0)
      },

      animatedWindSpd () {
        return this.tweenedWindSpd.toFixed(0)
      },

      animatedSwellDir () {
        return this.tweenedSwellDir.toFixed(0)
      },

      animatedSwellHeight () {
        return this.tweenedSwellHeight.toFixed(0)
      },

      windData () {
        return [
          {
            title: 'Wind direction',
            value: this.animatedWindDir ? `${this.animatedWindDir}°` : NOT_PROVIDED
          }, {
            title: 'Wind speed',
            value: this.animatedWindSpd ? `${this.animatedWindSpd} kn` : NOT_PROVIDED
          }
        ]
      },

      seaData () {
        const seaState = this.animatedSeaState
        const swellDir = this.animatedSwellDir
        const swellHeight = parseInt(this.animatedSwellHeight)

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

    watch: {
      windSpd (newValue) {
        TweenMax.to(this.$data, 2, { tweenedWindSpd: newValue })
      },

      windDir (newValue) {
        TweenMax.to(this.$data, 2, { tweenedWindDir: newValue })
      },

      seaState (newValue) {
        TweenMax.to(this.$data, 2, { tweenedSeaState: newValue })
      },

      swellDir (newValue) {
        TweenMax.to(this.$data, 2, { tweenedSwellDir: newValue })
      },

      swellHeight (newValue) {
        TweenMax.to(this.$data, 2, { tweenedSwellHeight: newValue })
      }
    },

    components: {
      IconWeather,
      BaseIcon,
      AccordionWrapper,
      WindFlag,
      SeaFlag,
      WeatherSituation
    }
  }
</script>

<style scoped lang="scss">
  .weather-data {
    &__placeholder {
      margin-top: 35px;
      height: 460px;
    }
  }
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
