<template>
  <li>
    <v-accordion :showOnInit=false :collapsedContent=true color="blue" class="report-item">
      <div slot="header" class="header-badge__slot">
        <p>{{report.reportTime}}</p>
      </div>
      <div slot="body" class="report-item__content">
        <report-item-details-section v-for="sectionData in reportSections" class="report-item__content__item"
          :key="sectionData.sectionTitle"
          :color="sectionData.color"
          :sectionData="sectionData">
        </report-item-details-section>
      </div>
      <div slot="collapsed-content" class="report-item__collapsed-content">
        <div class="report-item__collapsed-content__basic-data">
          <p>Latitude: {{formattedLat}}</p>
          <p>Longitude: {{formattedLng}}</p>
        </div>
        <div class="report-item__collapsed-content__actions">
          <span @click.prevent.stop="deleteReport(report.id, report.vessel)">
            <v-icon icon="trash" size="small" type="negative"></v-icon>
          </span>
        </div>
      </div>
    </v-accordion>
  </li>
</template>

<script>
  import VAccordion from '../../../molecules/accordion.vue'
  import ReportItemDetailsSection from './report-item-details-section.vue'
  import VIcon from '../../../atoms/icon.vue'
  import { decimalToDMS } from '../../../../utils/coordinates-utils'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: {
      report: {
        type: Object,
        required: true
      }
    },

    methods: {
      deleteReport (reportId, vesselId) {
        const payload = { reportId, vesselId }
        this.$store.dispatch('deleteReport', payload)
      }
    },

    computed: {
      formattedLat () {
        const { lat } = this.report
        return lat ? decimalToDMS(lat) : NOT_PROVIDED
      },

      formattedLng () {
        const { lng } = this.report
        return lng ? decimalToDMS(lng, false) : NOT_PROVIDED
      },

      reportSections () {
        const {
          course,
          doRob,
          foRob,
          fwRob,
          pitch,
          pob,
          roll,
          seaState,
          spd,
          swellDir,
          swellHeight,
          windDir,
          windSpd
        } = this.report

        return [
          {
            sectionTitle: 'Position',
            color: 'red',
            items: [
              {
                title: 'Latitude',
                value: this.formattedLat
              }, {
                title: 'Longitude',
                value: this.formattedLng
              }
            ]
          }, {
            sectionTitle: 'Navigation',
            color: 'blue',
            items: [
              {
                title: 'Course',
                value: course ? `${course}°` : NOT_PROVIDED
              }, {
                title: 'Speed',
                value: spd ? `${spd} kn` : NOT_PROVIDED
              }
            ]
          }, {
            sectionTitle: 'Weather',
            color: 'blue',
            items: [
              {
                title: 'Sea state',
                value: seaState || NOT_PROVIDED
              }, {
                title: 'Swell direction',
                value: swellDir ? `${swellDir}°` : NOT_PROVIDED
              }, {
                title: 'Swell height',
                value: swellHeight ? `${swellHeight.toFixed(1)} m` : NOT_PROVIDED
              }, {
                title: 'Wind direction',
                value: windDir ? `${windDir}°` : NOT_PROVIDED
              }, {
                title: 'Wind speed',
                value: windSpd ? `${windSpd} kn` : NOT_PROVIDED
              }
            ]
          }, {
            sectionTitle: 'Remaining on board',
            color: 'black',
            items: [
              {
                title: 'Diesel Oil',
                value: doRob ? `${doRob} cbm` : NOT_PROVIDED
              }, {
                title: 'Fuel Oil',
                value: foRob ? `${foRob} cbm` : NOT_PROVIDED
              }, {
                title: 'Fresh Water',
                value: fwRob ? `${fwRob} cbm` : NOT_PROVIDED
              }, {
                title: 'POB',
                value: pob ? `${pob} persons` : NOT_PROVIDED
              }
            ]
          }, {
            sectionTitle: 'Other',
            color: 'green',
            items: [
              {
                title: 'Pitch',
                value: pitch ? `${pitch}°` : NOT_PROVIDED
              }, {
                title: 'Roll',
                value: roll ? `${roll}°` : NOT_PROVIDED
              }
            ]
          }
        ]
      }
    },

    components: {
      VAccordion,
      VIcon,
      ReportItemDetailsSection
    }
  }
</script>

<style scoped lang="scss">
  li {
    list-style-type: none;
  }
  .report-item {
    width: 100%;
    margin-bottom: 10px;

     &__content {
      display: flex;
      flex-wrap: wrap;
      margin: 20px;
      text-align: left;
      min-height: 150px;

      &__item {
        min-width: 300px;
      }
    }
    &__collapsed-content {
      display: flex;
      justify-content: space-between;
      padding: 5px 5px 0;
      width: 100%;

      &__basic-data {
        display: flex;
      }

      p {
        margin: 0 10px 5px;
      }
    }
  }
</style>
