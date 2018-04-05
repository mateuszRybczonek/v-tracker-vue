<template>
  <div class="report-item-collapsed-body">
    <div class="report-item-collapsed-body__basic-data">
      <p>Latitude: {{lat}}</p>
      <p>Longitude: {{lng}}</p>
    </div>
    <div class="report-item__collapsed-body__actions">
      <span
        class="delete-icon"
        @click.prevent.stop="deleteReport(reportId, vessel)"
      >
        <BaseIcon
          width="40"
          height="40"
        >
          <IconTrash></IconTrash>
        </BaseIcon>
      </span>
    </div>
  </div>
</template>

<script>
  import BaseIcon from './BaseIcon.vue'
  import IconTrash from './Icons/IconTrash.vue'

  export default {
    components: {
      BaseIcon,
      IconTrash
    },

    props: {
      lat: {
        type: String,
        required: true
      },
      lng: {
        type: String,
        required: true
      },
      reportId: {
        type: String,
        required: true
      },
      vessel: {
        type: String,
        required: true
      }
    },

    methods: {
      deleteReport (reportId, vesselId) {
        const payload = { reportId, vesselId }
        this.$store.dispatch('deleteReport', payload)
      }
    }
  }
</script>

<style scoped lang="scss">
  .report-item-collapsed-body {
    display: flex;
    justify-content: space-between;
    padding: 5px 5px 0;
    width: 100%;

    &__basic-data {
      display: flex;
      align-self: center;

      p {
        margin: 0 10px 5px;
      }
    }

    .delete-icon {
      color: $color-light-grey;
      transition: color 600ms;

      &:hover {
        color: $color-tomato;
      }
    }
  }
</style>
