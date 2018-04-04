<template>
  <div id="vessels">
    <h1>Vessels</h1>
    <VesselsList :vessels="vessels"></VesselsList>
  </div>
</template>

<script>
  import VesselsList from '../components/VesselsList.vue'
  import { mapGetters } from 'vuex'

  export default {
    created () {
      this.$store.dispatch('fetchVessels')
    },

    computed: {
      ...mapGetters([
        'vessels'
      ])
    },

    components: {
      VesselsList
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
