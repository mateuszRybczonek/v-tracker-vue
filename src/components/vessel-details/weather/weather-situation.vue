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
        :speed="report.windSpd"
        :direction="report.windDir"
        :withBorder=false>
      </v-wind-flag>
    </div>

    <div class="weather-situation__sea-flag-wrapper" id="weather-situation__sea-flag-wrapper">
      <v-sea-flag
        class="weather-situation__sea-flag"
        :height="report.swellHeight"
        :direction="report.swellDir"
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
    props: {
      report: {
        type: Object,
        required: true
      }
    },

    components: {
      VWindFlag,
      VSeaFlag,
      VIcon
    },

    watch: {
      report (newVal, oldVal) {
        this.setSituation()
      }
    },

    mounted () {
      this.setSituation()
    },

    methods: {
      setSituation (report) {
        const windFlagWrapper = document.getElementById('weather-situation__wind-flag-wrapper')
        windFlagWrapper.style.transform = `rotate(${this.report.windDir}deg)`

        const seaFlagWrapper = document.getElementById('weather-situation__sea-flag-wrapper')
        seaFlagWrapper.style.transform = `rotate(${this.report.swellDir}deg)`

        const vesselWrapper = document.getElementById('weather-situation__vessel-wrapper')
        vesselWrapper.style.transform = `rotate(${this.report.course}deg)`
      }
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
      transition: all 2s ease-in-out;
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
