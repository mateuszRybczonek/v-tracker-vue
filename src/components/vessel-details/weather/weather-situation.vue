<template>
  <div id="weather-situation">

  </div>
</template>

<script>
  export default {
    props: ['speed', 'direction'],

    computed: {
      classes () {
        return `icon--${this.iconSpeed}kn`
      },

      colorClass () {
        if (this.speed < 25) return ''
        if (this.speed < 40) return 'amber'
        return 'red'
      },

      iconSpeed () {
        return this.speed <= 50 ? Math.floor(this.speed / 5) * 5 : 50
      }
    },

    mounted () {
      const weatherFlag = document.getElementById('weather-flag')
      weatherFlag.style.transform = `rotate(${this.direction}deg)`
    }
  }
</script>

<style scoped lang="scss">
  #weather-situation {
    display: block;
    text-indent: -9999px;
    width: 500px;
    height: 500px;
    background: url(../../../assets/compass-rose.svg);
    background-size: 500px;
  }
</style>
