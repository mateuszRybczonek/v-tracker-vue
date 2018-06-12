<template>
  <div class="mini-stats-item">
    <content-placeholders
      data-test-mini-stats-item-placeholder
      v-if="showPlaceholder"
    >
      <content-placeholders-img></content-placeholders-img>
    </content-placeholders>
    <AccordionWrapper
      data-test-mini-stats-item-accordion
      v-else
      :showOnInit="true"
    >

      <BaseBadge
        slot="header"
        :icon="item.icon"
        :title="item.description"
        :color="item.color"
        viewBox="10 0 76 76"
      />

      <MiniStatsItemBody
        slot="body"
        class="mini-stats-item__body"
        :item="item"
      />

      <MiniStatsItemFooter
        slot="footer"
        class="mini-stats-item__footer"
        :change="item.change"
        :unit="item.unit"
      />
    </AccordionWrapper>
  </div>
</template>

<script>
  import AccordionWrapper from './AccordionWrapper.vue'
  import BaseBadge from './BaseBadge.vue'
  import MiniStatsItemBody from './MiniStatsItemBody.vue'
  import MiniStatsItemFooter from './MiniStatsItemFooter.vue'

  export default {
    components: {
      AccordionWrapper,
      BaseBadge,
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
      min-height: 200px;

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
