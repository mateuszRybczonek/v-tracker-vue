<template>
  <div class="mini-stats-item">
    <content-placeholders v-if="showPlaceholder">
      <content-placeholders-img></content-placeholders-img>
    </content-placeholders>
    <AccordionWrapper
      v-else
      :showOnInit=true
      :color="item.color"
    >
      <MiniStatsItemHeader
        slot="header"
        :icon="item.icon"
        :description="item.description"
      ></MiniStatsItemHeader>

      <MiniStatsItemBody
        slot="body"
        class="mini-stats-item__body"
        :item="item"
      ></MiniStatsItemBody>

      <MiniStatsItemFooter
        slot="footer"
        class="mini-stats-item__footer"
        :change="item.change"
        :unit="item.unit"
      ></MiniStatsItemFooter>
    </AccordionWrapper>
  </div>
</template>

<script>
  import AccordionWrapper from './AccordionWrapper.vue'
  import MiniStatsItemHeader from './MiniStatsItemHeader.vue'
  import MiniStatsItemBody from './MiniStatsItemBody.vue'
  import MiniStatsItemFooter from './MiniStatsItemFooter.vue'
  import BaseIcon from './BaseIcon.vue'
  import IconFuel from './Icons/IconFuel.vue'
  import IconWater from './Icons/IconWater.vue'
  import IconPeople from './Icons/IconPeople.vue'

  export default {
    components: {
      AccordionWrapper,
      MiniStatsItemHeader,
      MiniStatsItemBody,
      MiniStatsItemFooter
    },

    props: {
      item: {
        type: Object,
        required: true
      },
      showPlaceholder: {
        type: Boolean
      }
    }
  }
</script>

<style scoped lang="scss">
  .mini-stats-item {
    min-width: 320px;
    margin-top: 20px;
    
    &__body {
      display: flex;
      justify-content: space-evenly;
      text-align: left;
      min-height: 130px;

      .item__icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &__footer {
      width: 100%;
    }
  }
</style>
