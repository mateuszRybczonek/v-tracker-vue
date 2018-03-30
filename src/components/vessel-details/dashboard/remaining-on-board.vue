<template>
  <div class="remaining-on-board">
    <mini-stats-item v-for="item in miniStatsItems"
      :key="item.index"
      :item="item"
      :showPlaceholder="fetchingReports">
    </mini-stats-item>
  </div>
</template>

<script>
  import MiniStatsItem from '../../../components/molecules/mini-stats-item.vue'
  import VAccordion from '../../../components/molecules/accordion.vue'
  import { TweenMax } from 'gsap'

  export default {
    data () {
      return {
        tweenedFoRob: this.report ? this.report.foRob : 0,
        tweenedDoRob: this.report ? this.report.doRob : 0,
        tweenedFwRob: this.report ? this.report.fwRob : 0,
        tweenedPob: this.report ? this.report.pob : 0
      }
    },

    props: {
      report: {
        type: Object
      },
      previousReport: {
        type: Object
      },
      fetchingReports: {
        type: Boolean
      }
    },

    computed: {
      foRob () {
        return this.report ? this.report.foRob : 0
      },

      doRob () {
        return this.report ? this.report.doRob : 0
      },

      fwRob () {
        return this.report ? this.report.fwRob : 0
      },

      pob () {
        return this.report ? this.report.pob : 0
      },

      animatedFoRob () {
        return this.tweenedFoRob.toFixed(0)
      },

      animatedDoRob () {
        return this.tweenedDoRob.toFixed(0)
      },

      animatedFwRob () {
        return this.tweenedFwRob.toFixed(0)
      },

      animatedPob () {
        return this.tweenedPob.toFixed(0)
      },

      miniStatsItems () {
        return [
          {
            icon: 'IconFuel',
            header: this.animatedFoRob,
            change: this.animatedFoRob - this.previousReport.foRob,
            unit: 'cbm',
            description: 'Fuel Oil',
            customClass: 'mini-stats__item--fo',
            color: 'black'
          }, {
            icon: 'IconFuel',
            header: this.animatedDoRob,
            change: this.animatedDoRob - this.previousReport.doRob,
            unit: 'cbm',
            description: 'Diesel Oil',
            customClass: 'mini-stats__item--do',
            color: 'brown'
          }, {
            icon: 'IconWater',
            header: this.animatedFwRob,
            change: this.animatedFwRob - this.previousReport.fwRob,
            unit: 'cbm',
            description: 'Fresh Water',
            customClass: 'mini-stats__item--fw',
            color: 'light-blue'
          }, {
            icon: 'IconPeople',
            header: this.animatedPob,
            change: this.animatedPob - this.previousReport.pob,
            unit: 'persons',
            description: 'People On Board',
            customClass: 'mini-stats__item--pob',
            color: 'green'
          }
        ]
      }
    },

    watch: {
      forRob (newValue) {
        TweenMax.to(this.$data, 2, { tweenedFoRob: newValue })
      },

      doRob (newValue) {
        TweenMax.to(this.$data, 2, { tweenedDoRob: newValue })
      },

      fwRob (newValue) {
        TweenMax.to(this.$data, 2, { tweenedFwRob: newValue })
      },

      pob (newValue) {
        TweenMax.to(this.$data, 2, { tweenedPob: newValue })
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
