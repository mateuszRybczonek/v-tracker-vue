<template>
  <div class="weather-situation">
    <div class="weather-situation__vessel-wrapper" id="weather-situation__vessel-wrapper">
      <v-icon
        class="weather-situation__vessel"
        icon="vessel"
        size="huge"
        color="light-blue"></v-icon>
    </div>

    <div class="weather-situation__wind-flag-wrapper" id="weather-situation__wind-flag-wrapper">
      <v-wind-flag
        class="weather-situation__wind-flag"
        :speed="lastReport.windSpd"
        :direction="lastReport.windDir"
        :withBorder=false>
      </v-wind-flag>
    </div>

    <div class="weather-situation__sea-flag-wrapper" id="weather-situation__sea-flag-wrapper">
      <v-sea-flag
        class="weather-situation__sea-flag"
        :height="lastReport.swellHeight"
        :direction="lastReport.swellDir"
        :withBorder=false>
      </v-sea-flag>
    </div>
  </div>
</template>

<script>
  import VWindFlag from '../../atoms/wind-flag.vue'
  import VSeaFlag from '../../atoms/sea-flag.vue'
  import VIcon from '../../atoms/icon.vue'

  export default {
    props: ['lastReport'],

    data () {
      return {
        flagInterval1: '',
        flagInterval2: ''
      }
    },

    components: {
      VWindFlag,
      VSeaFlag,
      VIcon
    },

    mounted () {
      const windFlagWrapper = document.getElementById('weather-situation__wind-flag-wrapper')
      windFlagWrapper.style.transform = `rotate(${this.lastReport.windDir}deg)`
      setTimeout(() => {
        const windDirVariation = 10
        this.flagInterval1 = setInterval(() => {
          windFlagWrapper.style.transform = `rotate(${this.lastReport.windDir - windDirVariation}deg)`
        }, 10000 / this.lastReport.windSpd)
        this.flagInterval2 = setInterval(() => {
          windFlagWrapper.style.transform = `rotate(${this.lastReport.windDir + windDirVariation}deg)`
        }, 20000 / this.lastReport.windSpd)
      }, 5000)

      const seaFlagWrapper = document.getElementById('weather-situation__sea-flag-wrapper')
      seaFlagWrapper.style.transform = `rotate(${this.lastReport.swellDir}deg)`

      const vesselWrapper = document.getElementById('weather-situation__vessel-wrapper')
      vesselWrapper.style.transform = `rotate(${this.lastReport.course}deg)`
    },

    beforeDestroy () {
      clearInterval(this.flagInterval1)
      clearInterval(this.flagInterval2)
    }
  }
</script>

<style scoped lang="scss">
  .weather-situation {
    display: flex;
    position: relative;
    height: 500px;
    width: 500px;
    background: url(../../../assets/compass-rose.svg);
    background-size: 500px;

    &__wind-flag, &__sea-flag {
      position: relative;
    }

    &__wind-flag-wrapper, &__sea-flag-wrapper, &__vessel-wrapper {
      position: absolute;
      width: 500px;
      height: 500px;
      transition: all 5s ease-in-out;
    }

    &__wind-flag, &__sea-flag {
      position: relative;
      top: 45px;
      transform: rotate(180deg);
    }

    &__vessel {
      position: relative;
      top: 140px;
      left: 221px;
      opacity: 0.7;
    }
  }
</style>
