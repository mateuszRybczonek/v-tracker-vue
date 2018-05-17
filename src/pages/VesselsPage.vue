<template>
  <div id="vessels">
    <h1 data-test-vessels-header>Vessels</h1>
    <VesselsList :vessels="vessels"></VesselsList>
  </div>
</template>

<script>
  import VesselsList from '../components/VesselsList.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      VesselsList
    },

    created () {
      this.fetchVessels(this.userId)
    },

    computed: {
      ...mapGetters([
        'vessels',
        'userId'
      ])
    },

    methods: {
      ...mapActions([
        'fetchVessels'
      ])
    }
  }
</script>

<style scoped lang="scss">
  h1, p {
    text-align: center;
  }

  h1 {
    padding: 50px 0;
  }
</style>
