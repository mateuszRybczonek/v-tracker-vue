<template>
  <div class="remaining-on-board">
    <mini-stats-item v-for="(item, index) in miniStatsItems"
      :item="item">
    </mini-stats-item>
  </div>
</template>

<script>
  import MiniStatsItem from '../../../components/molecules/mini-stats-item.vue'
  import VIcon from '../../../components/atoms/icon.vue'
  import VAccordion from '../../../components/molecules/accordion.vue'

  export default {
    props: ['lastReport', 'previousReport'],

    computed: {
      miniStatsItems () {
        return [
          {
            icon: 'fuel',
            header: this.lastReport.foRob,
            change: this.lastReport.foRob - this.previousReport.foRob,
            unit: 'cbm',
            description: 'Fuel Oil',
            customClass: 'mini-stats__item--fo',
            color: 'black'
          }, {
            icon: 'fuel',
            header: this.lastReport.doRob,
            change: this.lastReport.doRob - this.previousReport.doRob,
            unit: 'cbm',
            description: 'Diesel Oil',
            customClass: 'mini-stats__item--do',
            color: 'brown'
          }, {
            icon: 'water',
            header: this.lastReport.fwRob,
            change: this.lastReport.fwRob - this.previousReport.fwRob,
            unit: 'cbm',
            description: 'Fresh Water',
            customClass: 'mini-stats__item--fw',
            color: 'light-blue'
          }, {
            icon: 'people',
            header: this.lastReport.pob,
            change: this.lastReport.pob - this.previousReport.pob,
            unit: 'persons',
            description: 'People On Board',
            customClass: 'mini-stats__item--pob',
            color: 'green'
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
