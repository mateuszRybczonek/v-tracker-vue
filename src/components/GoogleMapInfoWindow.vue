<template>
  <div>
    <div data-test-google-map-info-window-title class="iw-title">
      <span>{{vesselName}}</span>
    </div>
    <div data-test-google-map-info-window-body class="iw-body">
      <span>{{reportTime}}</span>
      <div class="iw-body__position">
        <span class="iw-body__item">
          <span>Latitude:</span>
          <span>{{lat}}</span>
        </span>
        <span class="iw-body__item">
          <span>Longitude:</span>
          <span>{{lng}}</span>
        </span>
        <ButtonSmall
          data-test-google-map-info-window-body-button
          :onClick="goToVesselDetails"
        >
          Go to details
        </ButtonSmall>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router/index'
import ButtonSmall from '@/components/ButtonSmall'

export default {
  name: 'infowindow',

  components: {
    ButtonSmall
  },

  props: {
    vesselName: String,
    reportTime: String,
    lat: String,
    lng: String,
    vesselId: String
  },

  methods: {
    goToVesselDetails() {
      router.push(`/dashboard/vessels/${this.vesselId}`)
    }
  }
}
</script>

<style scoped lang="scss">
  .iw-title {
    color: $color-white;
    width: 100%;
    @include font(1.2rem, $fw-bold, 1.6rem);
    padding-right: 20px;
    background-color: $color-dark-grey;
  }

  .iw-body {
    color: $color-white;
    @include font(0.9rem, $fw-normal, 1.4rem);
    background-color: $color-dark-grey;

    &__position {
      display: flex;
      flex-direction: column;
      padding-top: 20px;
    }

    &__item {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
