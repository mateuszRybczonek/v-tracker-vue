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
      return {
        tweenedFoRob: this.report ? this.report.foRob : 0,
        tweenedDoRob: this.report ? this.report.doRob : 0,
        tweenedFwRob: this.report ? this.report.fwRob : 0,
        tweenedPob: this.report ? this.report.pob : 0
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

      foChange () {
        return this.previousReport ? this.animatedFoRob - this.previousReport.foRob : 0
      },

      foFreeSpace () {
        const foChange = this.foChange
        const maxFo = this.vesselCapacities.maxFo
        const animatedFoRob = this.animatedFoRob

        return foChange > 0 ?
          maxFo - animatedFoRob - foChange :
          maxFo - animatedFoRob + foChange
      },

      doChange () {
        return this.previousReport ? this.animatedDoRob - this.previousReport.doRob : 0
      },

      doFreeSpace () {
        const doChange = this.doChange
        const maxDo = this.vesselCapacities.maxDo
        const animatedDoRob = this.animatedDoRob

        return doChange > 0 ?
          maxDo - animatedDoRob - doChange :
          maxDo - animatedDoRob + doChange
      },

      fwChange () {
        return this.previousReport ? this.animatedFwRob - this.previousReport.fwRob : 0
      },

      fwFreeSpace () {
        const fwChange = this.fwChange
        const maxFw = this.vesselCapacities.maxFw
        const animatedFwRob = this.animatedFwRob

        return fwChange > 0 ?
          maxFw - animatedFwRob - fwChange :
          maxFw - animatedFwRob + fwChange
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
</script>

<style scoped lang="scss">
  .remaining-on-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
