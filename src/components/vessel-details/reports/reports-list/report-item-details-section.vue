<template>
  <div class="report-item-details-section">
    <v-header-badge :color="color" class="report-item-details-section__header-badge">
      <p class="header-badge__slot">{{sectionData.sectionTitle}}</p>
    </v-header-badge>
    <ul class="report-item-details-section__list">
      <li class="report-item-details-section__list__item"
          v-for="sectionDataItem in sectionData.items"
          :key="sectionDataItem.title">
        <span class="report-item-details-section__list__item__title">{{sectionDataItem.title}}</span>
        <span class="report-item-details-section__list__item__value">{{sectionDataItem.value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import VHeaderBadge from '../../../molecules/header-badge.vue'

  export default {
    props: {
      sectionData: {
        type: Object,
        required: true
      },
      color: {
        type: String
      }
    },

    components: {
      VHeaderBadge
    }
  }
</script>

<style scoped lang="scss">
  .report-item-details-section {
    margin: 10px;

    &__header-badge {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &__list {
      width: 100%;
      min-height: 200px;
      margin: 0;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      border: 1px solid $color-whitey-darker;

      &__item {
        display: flex;
        justify-content: space-between;
        list-style-type: none;
        cursor: default;
        margin-top: 15px;

        &:last-child {
          margin-bottom: 15px;
        }

        &__title {
          @include font(14px, 300);
        }

        &__value {
          @include font(14px, 400);
        }
      }
    }
  }
</style>
