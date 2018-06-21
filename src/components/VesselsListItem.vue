<template>
  <BaseCard
    :to="vesselDetailsLink"
    class="vessels-list-item"
    :class="{ 'vessels-list-item--faded': inProgress}"
  >
    <VesselsListItemBody
      :inProgress="inProgress"
      :vesselName="vessel.name"
      :vesselLastReportTime="vesselLastReportTime"
      :vesselImoNumber="vessel.imoNumber"/>

    <VesselsListItemActions
      :deleteVesselTask="deleteVesselTask"
      :vesselId="vessel.id"/>
  </BaseCard>
</template>

<script>
  import { mapActions } from 'vuex'
  import BaseCard from './BaseCard.vue'
  import VesselsListItemBody from './VesselsListItemBody.vue'
  import VesselsListItemActions from './VesselsListItemActions.vue'

  export default {
    components: {
      BaseCard,
      VesselsListItemBody,
      VesselsListItemActions
    },

    props: {
      vessel: {
        type: Object,
        required: true
      }
    },

    computed: {
      vesselDetailsLink () {
        return `/dashboard/vessels/${this.vessel.id}`
      },

      vesselLastReportTime () {
        const { vessel } = this
        return vessel.lastReport ? vessel.lastReport.reportTime : '-'
      },

      inProgress () {
        return this.deleteVesselTask.isActive
      }
    },

    methods: {
      ...mapActions([
        'deleteVessel'
      ])
    },

    tasks (task) {
      return {
        deleteVesselTask: task(function * () {
          yield this.deleteVessel(this.vessel.id)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .vessels-list-item {
    position: relative;
    display: flex;
    align-items: center;
    background-color: $color-white;
    width: 350px;
    text-align: center;
    @include border-radius(5px);
    @include box-shadow(0 0 100px 1px rgba(0,0,0,0.1));

    @media all and (max-width: $phone) {
      width: 100%;
      padding: 0;
      @include border-radius(0);
      @include box-shadow(0 0 0 0 $color-white);
      border: solid 1px $color-whitey;

      &:hover {
        @include box-shadow(0 0 0 0 $color-white);
        transform: scale(1);
      }
    }

    &--faded {
      opacity: 0.3;
      cursor: auto;
      pointer-events: none;
    }
  }
</style>
