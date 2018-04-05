<template>
  <div class="report-item-details-section">
    <div
      class="report-item-details-section__header"
      :class="color"
    >
      <span class="report-item-details-section__title">{{sectionData.sectionTitle}}</span>
      <span
        v-if="isEditing"
        @click.prevent.stop="updateReport(reportChangeset)"
      >
        <BaseIcon
          width="30"
          height="30"
          color="#FFF"
          viewBox='-10 -10 50 50'
        >
          <IconSave></IconSave>
        </BaseIcon>
      </span>
      <span
        v-else
        @click.prevent.stop="editReportSection"
      >
        <BaseIcon
          width="30"
          height="30"
          color='#FFF'
        >
          <IconPencil></IconPencil>
        </BaseIcon>
      </span>
    </div>
    <ul class="report-item-details-section__list">
      <li
        class="list-item"
        v-for="sectionDataItem in sectionData.items"
        :key="sectionDataItem.title"
      >
        <span class="list-item__title">{{sectionDataItem.title}}</span>
        <input
          v-if="isEditing"
          class="list-item__title-input"
          type="text"
          placeholder=""
          v-model="reportChangeset[sectionDataItem.key]"
        >
        <span
          v-else
          class="list-item__value"
        >
          {{sectionDataItem.value}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import BaseIcon from './BaseIcon.vue'
  import IconSave from './Icons/IconSave.vue'
  import IconPencil from './Icons/IconPencil.vue'
  import {
    formatLatForPersistanceLayer,
    formatLngForPersistanceLayer,
    decimalToDMS,
    stripSymbols
  } from '../utils/coordinates-utils'

  export default {
    components: {
      BaseIcon,
      IconSave,
      IconPencil
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

    methods: {
      editReportSection () {
        this.isEditing = true
        this.reportChangeset = {
          ...this.report,
          lat: stripSymbols(decimalToDMS(this.report.lat)),
          lng: stripSymbols(decimalToDMS(this.report.lng, true))
        }
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
    min-width: 300px;
    width: 45%;
    margin: 10px;

    &__header {
      display: flex;
      justify-content: space-between;
      padding-right: 0;
      border-radius: 0;

      &.black {
        background-color: $color-black;
      }

      &.red {
        background-color: $color-tomato;
      }

      &.blue {
        background-color: $color-blue;
      }

      &.green {
        background-color: $color-green
      }
    }

    &__title {
      color: $color-white;
      font-weight: 700;
      align-self: center;
      margin-left: 20px;
    }

    &__list {
      width: 100%;
      margin: 0;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      border: 1px solid $color-whitey-darker;

      .list-item {
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
        }

        &__title-input {
          text-align: right;
          @include font(16px, 300);
          border: none;
        }

        &__value {
          @include font(16px, 400);
        }
      }
    }
  }
</style>
