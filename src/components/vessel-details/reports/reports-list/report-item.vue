<template>
  <v-accordion :showOnInit=false color="blue" class="report-item">
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
  </v-accordion>
</template>

<script>
  import VAccordion from '../../../molecules/accordion.vue'
  import ReportItemDetailsSection from './report-item-details-section.vue'
  import { decimalToDMS } from '../../../../utils/coordinates-utils'

  const NOT_PROVIDED = 'not provided'

  export default {
    props: {
      report: {
        type: Object,
        required: true
      }
    },

    computed: {
      reportSections () {
        const {
          course,
          doRob,
          foRob,
          fwRob,
          lat,
          lng,
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
                value: lat ? decimalToDMS(lat) : NOT_PROVIDED
              }, {
                title: 'Longitude',
                value: lng ? decimalToDMS(lng, false) : NOT_PROVIDED
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
      ReportItemDetailsSection
    }
  }
</script>

<style scoped lang="scss">
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
        min-width: 200px;
      }
    }
  }
</style>
