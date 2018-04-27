<template>
  <div class="sea-data">
    <SeaFlag
      class="sea-data__flag"
      :height="swellHeight"
      :direction="swellDir"
      :withBorder="true"
    />
    <BaseList
      class="sea-data__list"
      :items="seaData"
      size="big"
    />
  </div>
</template>

<script>
import SeaFlag from './SeaFlag.vue'
import BaseList from './BaseList.vue'

export default {
  components: {
    SeaFlag,
    BaseList
  },

  props: {
    seaData: {
      type: Array,
      required: true
    },

    swellHeightProp: Number,
    swellDirProp: Number
  },

  computed: {
    swellHeight () {
      return this.swellHeightProp
    },

    swellDir () {
      return this.swellDirProp
    }
  }
}
</script>

<style scoped lang="scss">
  .sea-data {
    display: flex;
    justify-content: baseline;
    margin-left: 15px;
    margin-top: 100px;

    &__list {
      padding: 0 0 0 40px;
      min-width: 250px;
    }
  }
</style>
