<template>
  <div class="mini-stats-item">
    <v-accordion :showOnInit=true :color=item.color>
      <div slot="header" class="v-accordion-header__slot">
        <v-icon :icon=item.icon size="small" color="white"></v-icon>
        <p>{{item.description}}</p>
      </div>
      <div slot="body" class="mini-stats-item__content" :class=item.color>
        <div class="item__badge">
          <v-icon :icon='item.icon' size="medium" :color=item.color></v-icon>
        </div>
        <div class="item__description">
          <div class="description__header">
            {{item.header}}
          </div>
          <div class="description__text">
            {{item.unit}}
          </div>
        </div>
      </div>
      <div slot="footer" class="mini-stats-item__change">
        <v-mini-stats-change
          :change=item.change
          :unit=item.unit></v-mini-stats-change>
      </div>
    </v-accordion>
  </div>
</template>

<script>
  import VIcon from '../../components/atoms/icon.vue'
  import VAccordion from '../../components/molecules/accordion.vue'
  import VMiniStatsChange from '../../components/molecules/mini-stats-change.vue'

  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },

    components: {
      VIcon,
      VAccordion,
      VMiniStatsChange
    }
  }
</script>

<style scoped lang="scss">

  .mini-stats-item {
    min-width: 320px;
    margin-top: 20px;
    &__content {
      display: flex;
      justify-content: space-evenly;
      text-align: left;
      min-height: 130px;

      .item__badge {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &.black {
        color: $color-black;
      }

      &.brown {
        color: $color-brown;
      }

      &.light-blue {
        color: $color-light-blue;
      }

      &.green {
        color: $color-green
      }
    }

    &__change {
      width: 100%;
    }

    .item__description {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      max-height: 60px;

      .description__header {
        @include font(60px, 400, 60px);
      }

      .description__text {
        margin-left: 10px;
        @include font(12px, 300);
        text-transform: uppercase;
        letter-spacing: 2px;
        align-self: flex-end;
      }
    }
  }
</style>
