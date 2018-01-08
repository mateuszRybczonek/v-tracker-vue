<template>
  <div class="vessel-info">
    <div class="vessel-info__header">
      <h3>{{vessel.name}}</h3>
      <router-link tag="i"
         :to="editLink"
         class="vessel-info__header__edit-link">
        <v-icon icon="pencil" size="small" color="white"></v-icon>
      </router-link>
    </div>
    <div class="vessel-info__content">
      <div class="vessel-info__content__section">
        <h4>IMO Number: {{vessel.imoNumber}}</h4>
        <h4>MMSI: {{vessel.mmsi}}</h4>
        <h4>Gross Tonnage: {{vessel.gt}}</h4>
      </div>
      <div class="vessel-info__content__section">
        <h4>Year of build: {{vessel.yob}}</h4>
        <h4>Flag: {{vessel.flag}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
  import MiniStatsItem from '../../components/molecules/mini-stats-item.vue'
  import VIcon from '../../components/atoms/icon.vue'

  export default {
    props: ['vessel'],

    computed: {
      editLink () {
        return `/dashboard/vessels/${this.vessel.id}/edit`
      },

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
      VIcon
    }
  }
</script>

<style scoped lang="scss">
  .vessel-info {
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

      &__edit-link {
        position: absolute;
        right: 35px;
        cursor: pointer;
      }
    }

    &__content {
      display: flex;
      justify-content: space-around;
      text-align: left;
      margin: 40px 50px 20px;

      &__section {
        width: 100%;
      }
    }
  }
</style>
