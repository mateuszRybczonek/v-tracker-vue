<template>
  <li>
    <AccordionWrapper
      :showOnInit="false"
      :collapsedContent="true"
      class="report-item"
    >
      <BaseBadge
        slot="header"
        :title="report.reportTime"
        icon="IconCalendar"
        color="blue"/>
      <div
        slot="body"
        class="report-item__body"
      >
        <VesselReportsListItemDetails
          v-for="sectionData in reportSections"
          :key="sectionData.sectionTitle"
          :color="sectionData.color"
          :sectionData="sectionData"
          :report="report"/>
      </div>

      <VesselReportsListItemCollapsedBody
        slot="collapsed-content"
        :lat="formattedLat"
        :lng="formattedLng"
        :reportId="report.id"
        :vesselId="report.vessel"/>
    </AccordionWrapper>
  </li>
</template>

<script>
  import AccordionWrapper from './AccordionWrapper.vue'
  import BaseBadge from './BaseBadge.vue'
  import VesselReportsListItemDetails from './VesselReportsListItemDetails.vue'
  import VesselReportsListItemCollapsedBody from './VesselReportsListItemCollapsedBody.vue'
  import { decimalToDMS } from '../utils/coordinates-utils'

  const NOT_PROVIDED = 'not provided'

  export default {
    components: {
      AccordionWrapper,
      BaseBadge,
      VesselReportsListItemDetails,
      VesselReportsListItemCollapsedBody
    },

    props: {
      report: {
        type: Object,
        required: true
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
                value: this.formattedLat,
                key: 'lat'
              }, {
                title: 'Longitude',
                value: this.formattedLng,
                key: 'lng'
              }
            ]
          }, {
            sectionTitle: 'Navigation',
            color: 'blue',
            items: [
              {
                title: 'Course',
                value: course ? `${course}°` : NOT_PROVIDED,
                key: 'course'
              }, {
                title: 'Speed',
                value: spd ? `${spd} kn` : NOT_PROVIDED,
                key: 'spd'
              }
            ]
          }, {
            sectionTitle: 'Weather',
            color: 'blue',
            items: [
              {
                title: 'Sea state',
                value: seaState || NOT_PROVIDED,
                key: 'seaState'
              }, {
                title: 'Swell direction',
                value: swellDir ? `${swellDir}°` : NOT_PROVIDED,
                key: 'swellDir'
              }, {
                title: 'Swell height',
                value: swellHeight ? `${swellHeight.toFixed(1)} m` : NOT_PROVIDED,
                key: 'swellHeight'
              }, {
                title: 'Wind direction',
                value: windDir ? `${windDir}°` : NOT_PROVIDED,
                key: 'windDir'
              }, {
                title: 'Wind speed',
                value: windSpd ? `${windSpd} kn` : NOT_PROVIDED,
                key: 'windSpd'
              }
            ]
          }, {
            sectionTitle: 'Remaining on board',
            color: 'black',
            items: [
              {
                title: 'Diesel Oil',
                value: doRob ? `${doRob} cbm` : NOT_PROVIDED,
                key: 'doRob'
              }, {
                title: 'Fuel Oil',
                value: foRob ? `${foRob} cbm` : NOT_PROVIDED,
                key: 'foRob'
              }, {
                title: 'Fresh Water',
                value: fwRob ? `${fwRob} cbm` : NOT_PROVIDED,
                key: 'fwRob'
              }, {
                title: 'POB',
                value: pob ? `${pob} persons` : NOT_PROVIDED,
                key: 'pob'
              }
            ]
          }, {
            sectionTitle: 'Other',
            color: 'green',
            items: [
              {
                title: 'Pitch',
                value: pitch ? `${pitch}°` : NOT_PROVIDED,
                key: 'pitch'
              }, {
                title: 'Roll',
                value: roll ? `${roll}°` : NOT_PROVIDED,
                key: 'roll'
              }
            ]
          }
        ]
      }
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

     &__body {
      display: flex;
      flex-wrap: wrap;
      margin: 20px;
      text-align: left;
      min-height: 150px;
    }
  }
</style>
