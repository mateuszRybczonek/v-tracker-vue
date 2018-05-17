<template>
  <div class="wind-data">
    <WindFlag
      class="wind-data__flag"
      :speed="windSpd"
      :direction="windDir"
      :withBorder="true"/>
    <BaseList
      class="wind-data__list"
      :items="windData"
      size="big"/>
  </div>
</template>

<script>
import WindFlag from './WindFlag.vue'
import BaseList from './BaseList.vue'

export default {
  components: {
    WindFlag,
    BaseList
  },

  props: {
    windData: {
      type: Array,
      required: true
    },

    windDirProp: Number,
    windSpdProp: Number
  },

  computed: {
    windDir () {
      return this.windDirProp || this.windData.windDir
    },

    windSpd () {
      return this.windSpdProp || this.windData.windSpd
    }
  }
}
</script>

<style scoped lang="scss">
  .wind-data {
    display: flex;
    justify-content: baseline;
    margin-left: 15px;

    &__list {
      padding: 0 0 0 40px;
      min-width: 250px;
    }
  }
</style>
