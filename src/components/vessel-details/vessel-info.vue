<template>
  <div class="vessel-info">
    <v-accordion :showOnInit=false>
      <div slot="header" class="vessel-info__header">
        <h3>{{vessel.name}}</h3>
        <router-link tag="i"
          :to="editLink"
          class="vessel-info__header__edit-link">
          <v-icon icon="pencil" size="small" color="white"></v-icon>
        </router-link>
      </div>
      <div slot="body" class="vessel-info__content">
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
    </v-accordion>
  </div>
</template>

<script>
  import MiniStatsItem from '../../components/molecules/mini-stats-item.vue'
  import VIcon from '../../components/atoms/icon.vue'
  import VAccordion from '../../components/molecules/accordion.vue'

  export default {
    props: ['vessel'],

    computed: {
      editLink () {
        return `/dashboard/vessels/${this.vessel.id}/edit`
      }
    },

    components: {
      MiniStatsItem,
      VIcon,
      VAccordion
    }
  }
</script>

<style scoped lang="scss">
  .vessel-info {
    &__header {
      display: flex;
      align-items: center;

      > h3 {
        margin: 0;
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

      &__section {
        width: 100%;
      }
    }
  }
</style>
