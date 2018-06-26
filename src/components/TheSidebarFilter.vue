<template>
  <div class="sidebar-filter">
    <div class="sidebar-filter__datepickers">
      <label class="datepicker__label">
        Start date:
        <DatePicker
          placeholder="Start date"
          v-model="filteredFirstReportDate"
          :minDate="filterMinDate"
          :maxDate="filterMaxDate"
        />
      </label>

      <label class="datepicker__label">
        End date:
        <DatePicker
          placeholder="End date"
          :minDate="filterMinDate"
          :maxDate="filterMaxDate"
          v-model="filteredLastReportDate"
        />
      </label>
    </div>

    <ButtonSmallInverted
      data-test-google-map-info-window-body-button
      :onClick="filterReports"
      :disabled="disableFilterButton"
    >
      Filter
    </ButtonSmallInverted>
  </div>
</template>

<script>
  import { get } from 'vuex-pathify'
  import { mapActions } from 'vuex'
  import DatePicker from '@/components/DatePicker'
  import ButtonSmallInverted from '@/components/ButtonSmallInverted'

  export default {
    components: {
      DatePicker,
      ButtonSmallInverted
    },

    props: {
      lastReport: {
        type: Object
      }
    },

    data () {
      return {
        filteredFirstReportDate: this.$moment(this.lastReportDate).subtract(14, 'days').format('YYYY-MM-DD'),
        filteredLastReportDate: this.$moment(this.lastReportDate).format('YYYY-MM-DD')
      }
    },

    computed: {
      reports: get('reports'),

      firstReportDate () {
        return this.filteredFirstReportDate || this.$moment(this.lastReportDate).subtract(14, 'days').format('YYYY-MM-DD')
      },

      filterMinDate () {
        return new Date(this.reports[this.reports.length - 1].reportTime)
      },

      filterMaxDate () {
        return new Date(this.reports[0].reportTime)
      },

      disableFilterButton () {
        return new Date(this.filteredFirstReportDate) > new Date(this.filteredLastReportDate)
      },
    },

    mounted () {
      this.filterReports()
    },

    methods: {
      ...mapActions([
        'setFilteredReports'
      ]),

      filterReports () {
        const firstReportDate = this.filteredFirstReportDate
        const lastReportDate = this.filteredLastReportDate
        const filteredReports = this.reports.filter(report => {
          return new Date(report.reportTime) >= new Date(firstReportDate) &&
            new Date(report.reportTime) <= new Date(lastReportDate)
        })

        this.setFilteredReports(filteredReports)
      }
    }
  }
</script>

<style scoped lang="scss">
  .sidebar-filter {
    display: flex;
    flex-direction: column;
    padding: 10px 0 20px;
    margin: 0 20px 20px 0;
    border-top: solid 1px $color-white;
    border-bottom: solid 1px $color-white;

    &__datepickers {
      display: flex;
      justify-content: space-between;

      .datepicker {
        &__label {
          display: flex;
          flex-direction: column;
          margin: 5px 0;
          font-weight: $fw-bold;
          text-transform: uppercase;
          text-align: center;
          color: $color-light-blue;

          input {
            width: 100px;
            margin-top: 5px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
