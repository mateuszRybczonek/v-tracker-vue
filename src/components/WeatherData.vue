<template>
  <div class="weather-data">
    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="weather-data__placeholder"></content-placeholders-img>
    </content-placeholders>
    <AccordionWrapper
      v-else
      :showOnInit="true"
    >
      <BaseBadge
        slot="header"
        title="Weather info"
        icon="IconWeather"
        color="blue"
      ></BaseBadge>

      <div
        slot="body"
        class="weather-data__body"
      >
        <div class="weather-data__body-left">
          <WindData
            :windData="windData"
            :windDirProp="windDir"
            :windSpdProp="windSpd"
          ></WindData>

          <SeaData
            :seaData="seaData"
            :swellHeightProp="swellHeight"
            :swellDirProp="swellDir"
          ></SeaData>
        </div>

        <WeatherSituation
          v-if="!fetchingReports"
          class="weather-data__body-right"
          :report="report"
        ></WeatherSituation>
      </div>
    </AccordionWrapper>
  </div>
</template>

<script>
  import AccordionWrapper from './AccordionWrapper.vue'
  import BaseBadge from './BaseBadge.vue'
  import SeaData from './SeaData.vue'
  import WeatherSituation from './WeatherSituation.vue'
  import WindData from './WindData.vue'
  import { TweenMax } from 'gsap'

  const NOT_PROVIDED = 'not provided'

  export default {
    components: {
      AccordionWrapper,
      BaseBadge,
      SeaData,
      WeatherSituation,
      WindData
    },

    props: {
      report: {
        type: Object
      },
      fetchingReports: {
        type: Boolean
      }
    },

    data () {
      return {
        tweenedWindDir: this.report ? this.report.windDir : 0,
        tweenedWindSpd: this.report ? this.report.windSpd : 0,
        tweenedSeaState: this.report ? this.report.seaState : 0,
        tweenedSwellDir: this.report ? this.report.swellDir : 0,
        tweenedSwellHeight: this.report ? this.report.swellHeight : 0
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
    }
  }
</script>

<style scoped lang="scss">
  .weather-data {
    &__placeholder {
      margin-top: 35px;
      height: 460px;
    }

    &__body {
      display: flex;
      justify-content: space-between;
      text-align: left;
      min-height: 200px;
      padding: 30px;
    }

    &__body-left {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: baseline;
      align-self: center;
    }

    &__body-right {
      width: 50%;
    }
  }
</style>
