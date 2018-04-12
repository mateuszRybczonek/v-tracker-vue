<template>
  <div class="sidebar__content">
    <ul class="sidebar__content__list">
      <li class="sidebar__content__list__item__status">
        <span
          class="sidebar__content__list__item__title"
          v-if="sidebarVisible"
        >
          Status
        </span>
        <span
          class="sidebar__content__list__item__status__marker"
          :class="vesselStatusClass"
        ></span>
      </li>

      <div
        class="sidebar__content__list__item sidebar__content__list__item__last-report"
        v-if="sidebarVisible"
      >
        <span class="sidebar__content__list__item__title">Last reported data: {{lastReportDate}}</span>
        <span class="sidebar__content__list__item__title">({{lastReportDaysAgo}})</span>
      </div>

      <div
        class="sidebar__content__list__items"
        v-if="sidebarVisible"
      >
        <li
          class="sidebar__content__list__item"
          v-for="item in items"
          :key="item.name"
        >
          <span class="sidebar__content__list__item__title">{{item.title}}</span>
          <span class="sidebar__content__list__item__value">{{item.value}}</span>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      vessel: {
        type: Object,
        required: true
      },

      report: {
        type: Object
      },

      lastReport: {
        type: Object
      }
    },

    computed: {
      ...mapGetters([
        'sidebarVisible'
      ]),

      vesselStatusClass () {
        if (!this.lastReport) return `status--red`
        if (this.$moment.duration(this.$moment().diff(this.lastReport.reportTime)).asHours() <= 24) {
          return `status--green`
        } else if (this.$moment.duration(this.$moment().diff(this.lastReport.reportTime)).asHours() <= 48) {
          return `status--amber`
        } else {
          return `status--red`
        }
      },

      items () {
        return [
          {
            'title': 'Name',
            'value': this.vessel.name
          }, {
            'title': 'IMO Number',
            'value': this.vessel.imoNumber
          }, {
            'title': 'MMSI',
            'value': this.vessel.mmsi
          }, {
            'title': 'Gross tonnage',
            'value': this.vessel.gt
          }, {
            'title': 'Year of build',
            'value': this.vessel.yob
          }, {
            'title': 'Flag',
            'value': this.vessel.flag
          }
        ]
      },

      lastReportDate () {
        if (!this.lastReport) return '---'
        return this.lastReport.reportTime
      },

      lastReportDaysAgo () {
        if (!this.lastReport) return '---'
        return this.$moment(this.lastReport.reportTime).fromNow()
      }
    }
  }
</script>

<style scoped lang="scss">
  .sidebar__content {
    padding-left: 15px;

    &__list {
      display: flex;
      flex-direction: column;
      padding: 0;
      cursor: default;

      &__item__status {
        display: flex;
        align-self: flex-end;
        margin: 0 27px 15px;
        font-weight: $fw-bold;

        &__marker {
          height: 15px;
          width: 15px;
          border-radius: 50%;
          border: 2px solid $color-whitey-lighter;
          position: relative;
          top: 3px;
          left: 10px;

          &.status--green {
            background-color: $color-hover-green;
          }

          &.status--amber {
            background-color: $color-amber;
          }

          &.status--red {
            background-color: $color-tomato;
          }
        }
      }

      &__item__last-report {
        text-align: right;
        padding-right: 20px;
      }

      &__item {
        display: flex;
        flex-direction: column;
        margin: 0 0 15px;
        list-style-type: none;
        font-weight: $fw-bold;

        &__title {
          text-transform: uppercase;
          color: $color-light-blue;
        }
      }
    }
  }
</style>
