<template>
  <div class="remaining-on-board">
    <MiniStatsItem
      v-for="item in miniStatsItems"
      :key="item.description"
      :item="item"
      :showPlaceholder="fetchingReports"
    />
  </div>
</template>

<script>
  import MiniStatsItem from './MiniStatsItem.vue'
  import { TweenMax } from 'gsap'

  export default {
    components: {
      MiniStatsItem
    },

    props: {
      report: {
        type: Object,
        required: true
      },
      previousReport: {
        type: Object
      },
      fetchingReports: {
        type: Boolean,
        required: true
      },
      vesselCapacities: {
        type: Object
      }

    },

    data () {
      const report = this.report
      return {
        tweenedFoRob: report ? report.foRob : 0,
        tweenedDoRob: report ? report.doRob : 0,
        tweenedFwRob: report ? report.fwRob : 0,
        tweenedPob: report ? report.pob : 0
      }
    },

    computed: {
      foRob () {
        const report = this.report
        return report ? report.foRob : 0
      },

      doRob () {
        const report = this.report
        return report ? report.doRob : 0
      },

      fwRob () {
        const report = this.report
        return report ? report.fwRob : 0
      },

      pob () {
        const report = this.report
        return report ? report.pob : 0
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

      foChange () {
        return _getChange(this.previousReport, this.animatedFoRob, this.previousReport.foRob)
      },

      foFreeSpace () {
        return _getFreeSpace(this.foChange, this.vesselCapacities.maxFo, this.animatedFoRob)
      },

      doChange () {
        return _getChange(this.previousReport, this.animatedDoRob, this.previousReport.doRob)
      },

      doFreeSpace () {
        return _getFreeSpace(this.doChange, this.vesselCapacities.maxDo, this.animatedDoRob)
      },

      fwChange () {
        return _getChange(this.previousReport, this.animatedFwRob, this.previousReport.fwRob)
      },

      fwFreeSpace () {
        return _getFreeSpace(this.fwChange, this.vesselCapacities.maxFw, this.animatedFwRob)
      },

      pobChange () {
        return _getChange(this.previousReport, this.animatedPob, this.previousReport.pob)
      },

      miniStatsItems () {
        return [
          {
            icon: 'IconFuel',
            header: this.animatedFoRob,
            change: this.foChange,
            unit: 'cbm',
            description: 'Fuel Oil',
            customClass: 'mini-stats__item--fo',
            color: 'black',
            freeSpace: this.foFreeSpace
          }, {
            icon: 'IconFuel',
            header: this.animatedDoRob,
            change: this.doChange,
            unit: 'cbm',
            description: 'Diesel Oil',
            customClass: 'mini-stats__item--do',
            color: 'brown',
            freeSpace: this.doFreeSpace
          }, {
            icon: 'IconWater',
            header: this.animatedFwRob,
            change: this.fwChange,
            unit: 'cbm',
            description: 'Fresh Water',
            customClass: 'mini-stats__item--fw',
            color: 'light-blue',
            freeSpace: this.fwFreeSpace
          }, {
            icon: 'IconPeople',
            header: this.animatedPob,
            change: this.previousReport ? this.animatedPob - this.previousReport.pob : 0,
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
    }
  }

  function _getFreeSpace(change, maxCapacity, currentValue) {
    return change > 0 ?
      maxCapacity - currentValue - change :
      maxCapacity - currentValue + change
  }

  function _getChange(previousReport, animatedValue, previousReportValue) {
    return previousReport ? animatedValue - previousReportValue : 0
  }
</script>

<style scoped lang="scss">
  .remaining-on-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
