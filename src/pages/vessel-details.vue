<template>
  <div id="vessel-details">
    <h1>Vessel details</h1>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    created () {
      this.$store.dispatch('fetchReports')
    },

    computed: { //  map getter to property
      ...mapGetters([
        'vessels',
        'reports'
      ])
    },

    components: {
    }
  }
</script>

<style scoped lang="scss">
  h1, p {
    text-align: center;
  }

  h1 {
    margin: 50px 0;
  }
</style>
