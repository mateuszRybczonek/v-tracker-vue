<template>
  <div class="remaining-on-board">
    <mini-stats-item v-for="(item, index) in miniStatsItems"
      :icon="item.icon"
      :header="item.header"
      :description="item.description"
      :class="item.customClass"
      :color="item.color">
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
            customClass: 'mini-stats__item--fo',
            color: 'black'
          }, {
            icon: 'fuel',
            header: `${this.lastReport.doRob} cbm`,
            description: 'Remaining Diesel Oil',
            customClass: 'mini-stats__item--do',
            color: 'brown'
          }, {
            icon: 'water',
            header: `${this.lastReport.fwRob} cbm`,
            description: 'Remaining Fresh Water',
            customClass: 'mini-stats__item--fw',
            color: 'light-blue'
          }, {
            icon: 'people',
            header: `${this.lastReport.pob}`,
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
