<template>
  <div id="vessels">
    <h1>Vessels</h1>
    <TheVesselsList :vessels="vessels"></TheVesselsList>
  </div>
</template>

<script>
  import TheVesselsList from '../components/TheVesselsList.vue'
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
      TheVesselsList
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
