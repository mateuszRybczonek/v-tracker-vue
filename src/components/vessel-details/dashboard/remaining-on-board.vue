<template>
  <div class="remaining-on-board">
    <mini-stats-item v-for="item in miniStatsItems"
      :key="item.index"
      :item="item">
    </mini-stats-item>
  </div>
</template>

<script>
  import MiniStatsItem from '../../../components/molecules/mini-stats-item.vue'
  import VIcon from '../../../components/atoms/icon.vue'
  import VAccordion from '../../../components/molecules/accordion.vue'

  export default {
    props: {
      report: {
        type: Object
      },
      previousReport: {
        type: Object
      }
    },

    computed: {
      miniStatsItems () {
        return [
          {
            icon: 'fuel',
            header: this.report.foRob,
            change: this.report.foRob - this.previousReport.foRob,
            unit: 'cbm',
            description: 'Fuel Oil',
            customClass: 'mini-stats__item--fo',
            color: 'black'
          }, {
            icon: 'fuel',
            header: this.report.doRob,
            change: this.report.doRob - this.previousReport.doRob,
            unit: 'cbm',
            description: 'Diesel Oil',
            customClass: 'mini-stats__item--do',
            color: 'brown'
          }, {
            icon: 'water',
            header: this.report.fwRob,
            change: this.report.fwRob - this.previousReport.fwRob,
            unit: 'cbm',
            description: 'Fresh Water',
            customClass: 'mini-stats__item--fw',
            color: 'light-blue'
          }, {
            icon: 'people',
            header: this.report.pob,
            change: this.report.pob - this.previousReport.pob,
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
