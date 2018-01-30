<template>
  <div class="remaining-on-board">
    <mini-stats-item v-for="(item, index) in miniStatsItems"
      :icon="item.icon"
      :header="item.header"
      :description="item.description"
      :class="item.customClass">
    </mini-stats-item>
  </div>
</template>

<script>
  import MiniStatsItem from '../../../components/molecules/mini-stats-item.vue'
  import VIcon from '../../../components/atoms/icon.vue'
  import VAccordion from '../../../components/molecules/accordion.vue'

  export default {
    props: ['lastReport'],

    computed: {
      miniStatsItems () {
        return [
          {
            icon: 'fuel',
            header: `${this.lastReport.foRob} cbm`,
            description: 'Remaining Fuel Oil',
            customClass: 'mini-stats__item--fo'
          }, {
            icon: 'fuel',
            header: `${this.lastReport.doRob} cbm`,
            description: 'Remaining Diesel Oil',
            customClass: 'mini-stats__item--do'
          }, {
            icon: 'water',
            header: `${this.lastReport.fwRob} cbm`,
            description: 'Remaining Fresh Water',
            customClass: 'mini-stats__item--fw'
          }, {
            icon: 'people',
            header: `${this.lastReport.pob}`,
            description: 'People On Board',
            customClass: 'mini-stats__item--pob'
          }
        ]
      }
    },

    components: {
      MiniStatsItem,
      VAccordion,
      VIcon
    }
  }
</script>

<style scoped lang="scss">
  .remaining-on-board {
    &__header {
      display: flex;
      background-color: $color-dark-grey;
      padding: 0 30px 0 20px;
      height: 30px;
      @include border-radius(20px)
    }
    &__content {
      display: flex;
      padding: 35px 50px 20px;
      overflow-wrap: break-word;
    }
  }
</style>
