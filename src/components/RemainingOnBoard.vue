<template>
  <div class="remaining-on-board">
    <MiniStatsItem
      v-for="item in miniStatsItems"
      :key="item.description"
      :item="item"
      :showPlaceholder="fetchingReports"
    ></MiniStatsItem>
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

      miniStatsItems () {
        return [
          {
            header: this.animatedFoRob,
            change: this.previousReport ? this.animatedFoRob - this.previousReport.foRob : 0,
            unit: 'cbm',
            description: 'Fuel Oil',
            customClass: 'mini-stats__item--fo',
            color: 'black',
            freeSpace: this.vesselCapacities.maxFo - this.animatedFoRob - (this.previousReport ? this.animatedFoRob - this.previousReport.foRob : 0)
          }, {
            header: this.animatedDoRob,
            change: this.previousReport ? this.animatedDoRob - this.previousReport.doRob : 0,
            unit: 'cbm',
            description: 'Diesel Oil',
            customClass: 'mini-stats__item--do',
            color: 'brown',
            freeSpace: this.vesselCapacities.maxDo - this.animatedDoRob - (this.previousReport ? this.animatedDoRob - this.previousReport.doRob : 0)
          }, {
            header: this.animatedFwRob,
            change: this.previousReport ? this.animatedFwRob - this.previousReport.fwRob : 0,
            unit: 'cbm',
            description: 'Fresh Water',
            customClass: 'mini-stats__item--fw',
            color: 'light-blue',
            freeSpace: this.vesselCapacities.maxFw - this.animatedFwRob - (this.previousReport ? this.animatedFwRob - this.previousReport.fwRob : 0)
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
