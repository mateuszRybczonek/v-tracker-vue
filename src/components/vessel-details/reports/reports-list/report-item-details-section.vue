<template>
  <div class="report-item-details-section">
    <v-header-badge :color="color" class="report-item-details-section__header-badge">
      <p class="header-badge__slot">{{sectionData.sectionTitle}}</p>
      <span v-if="isEditing" @click.prevent.stop="updateReport(reportChangeset)">
        <v-icon icon="save" size="small" color="white"></v-icon>
      </span>
      <span v-else @click.prevent.stop="editReportSection">
        <v-icon icon="pencil" size="small" color="white"></v-icon>
      </span>
    </v-header-badge>
    <ul class="report-item-details-section__list">
      <li class="report-item-details-section__list__item"
          v-for="sectionDataItem in sectionData.items"
          :key="sectionDataItem.title">
        <span class="report-item-details-section__list__item__title">{{sectionDataItem.title}}</span>
        <input v-if="isEditing" class="report-item-details-section__list__item__title__input"
          type="text"
          placeholder=""
          v-model="reportChangeset[sectionDataItem.key]">
        <span v-else class="report-item-details-section__list__item__value">{{sectionDataItem.value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import VHeaderBadge from '../../../molecules/header-badge.vue'
  import VIcon from '../../../atoms/icon.vue'
  import {
    formatLatForPersistanceLayer,
    formatLngForPersistanceLayer,
    decimalToDMS,
    stripSymbols
  } from '../../../../utils/coordinates-utils'

  export default {
    data () {
      return {
        isEditing: false,

        reportChangeset: {
          ...this.report,
          lat: stripSymbols(decimalToDMS(this.report.lat)),
          lng: stripSymbols(decimalToDMS(this.report.lng, true))
        }
      }
    },

    props: {
      sectionData: {
        type: Object,
        required: true
      },
      color: {
        type: String
      },
      report: {
        type: Object,
        required: true
      }
    },

    components: {
      VHeaderBadge,
      VIcon
    },

    methods: {
      editReportSection () {
        this.isEditing = true
      },

      async updateReport (report) {
        report.lat = formatLatForPersistanceLayer(report.lat)
        report.lng = formatLngForPersistanceLayer(report.lng)
        try {
          await this.$store.dispatch('updateReport', report)
          this.isEditing = false
        } catch (error) {
          this.inProgress = false
          // flash message shall go here
          alert('Something went wrong')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .report-item-details-section {
    width: 45%;
    margin: 10px;

    &__header-badge {
      display: flex;
      justify-content: space-between;
      padding-right: 0;
      border-radius: 0;
    }

    &__list {
      width: 100%;
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
          @include font(16px, 300);

          &__input {
            text-align: right;
            @include font(16px, 300);
            border: none;
          }
        }

        &__value {
          @include font(16px, 400);
        }
      }
    }
  }
</style>
