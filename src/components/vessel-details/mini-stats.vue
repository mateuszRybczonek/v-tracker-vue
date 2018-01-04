<template>
  <div class="mini-stats">
    <div class="mini-stats__header">
      <h3>Last reported data: {{lastReport.reportTime}}</h3>
    </div>
    <div class="mini-stats__badges">
      <mini-stats-item v-for="(item, index) in miniStatsItems"
        :iconName="item.iconName"
        :header="item.header"
        :description="item.description"
        :class="item.customClass">
      </mini-stats-item>
    </div>
  </div>
</template>

<script>
  import MiniStatsItem from '../../components/molecules/mini-stats-item.vue'

  export default {
    props: ['vessel', 'lastReport'],

    computed: {
      miniStatsItems () {
        return [
          {
            iconName: 'fuel',
            header: `${this.lastReport.foRob} cbm`,
            description: 'Remaining FO',
            customClass: 'item-fo'
          }, {
            iconName: 'fuel',
            header: `${this.lastReport.doRob} cbm`,
            description: 'Remaining DO',
            customClass: 'item-do'
          }, {
            iconName: 'water',
            header: `${this.lastReport.fwRob} cbm`,
            description: 'Remaining FW',
            customClass: 'item-fw'
          }, {
            iconName: 'water',
            header: `${this.lastReport.pob}`,
            description: 'POB',
            customClass: 'item-pob'
          }
        ]
      }
    },

    components: {
      MiniStatsItem
    }
  }
</script>

<style scoped lang="scss">
  .mini-stats {
    margin: 0 20px;
    border: 1px solid $color-font-light-grey;
    text-align: center;
    @include border-radius(5px);

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background-color: $color-font-grey;

      > h3 {
        color: $color-whitey;
      }
    }

    &__badges {
      display: flex;
      margin: 40px 0 20px;
    }
  }
</style>
