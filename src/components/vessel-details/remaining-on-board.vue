<template>
  <div class="remaining-on-board">
    <v-accordion :showOnInit=true>
      <div slot="header" class="remaining-on-board__header">
        <h3>Remaining on board</h3>
      </div>
      <div slot="body" class="remaining-on-board__content">
        <mini-stats-item v-for="(item, index) in miniStatsItems"
          :icon="item.icon"
          :header="item.header"
          :description="item.description"
          :class="item.customClass">
        </mini-stats-item>
      </div>
    </v-accordion>
  </div>
</template>

<script>
  import MiniStatsItem from '../../components/molecules/mini-stats-item.vue'
  import VAccordion from '../../components/molecules/accordion.vue'

  export default {
    props: ['lastReport'],

    computed: {
      miniStatsItems () {
        return [
          {
            icon: 'fuel',
            header: `${this.lastReport.foRob} cbm`,
            description: 'Remaining FO',
            customClass: 'mini-stats__item--fo'
          }, {
            icon: 'fuel',
            header: `${this.lastReport.doRob} cbm`,
            description: 'Remaining DO',
            customClass: 'mini-stats__item--do'
          }, {
            icon: 'water',
            header: `${this.lastReport.fwRob} cbm`,
            description: 'Remaining FW',
            customClass: 'mini-stats__item--fw'
          }, {
            icon: 'people',
            header: `${this.lastReport.pob}`,
            description: 'POB',
            customClass: 'mini-stats__item--pob'
          }
        ]
      }
    },

    components: {
      MiniStatsItem,
      VAccordion
    }
  }
</script>

<style scoped lang="scss">
  .remaining-on-board {
    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;

      > h3 {
        margin: 0;
        color: $color-whitey;
      }
    }

    &__content {
      display: flex;
    }
  }
</style>
