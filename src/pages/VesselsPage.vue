<template>
  <div class="vessels">
    <h1 data-test-vessels-header>Vessels</h1>
    <VesselsList
      :vessels="vessels"
      :fetchingVessels="fetchingVessels"
    />
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
      this.fetchVesselsTask.run()
    },

    computed: {
      ...mapGetters([
        'vessels',
        'userId'
      ]),

      fetchingVessels () {
        return this.fetchVesselsTask.isActive
      }
    },

    methods: {
      ...mapActions([
        'fetchVessels'
      ])
    },

    tasks (task) {
      return {
        fetchVesselsTask: task(function * () {
          yield this.fetchVessels(this.userId)
        })
        .flow('restart')
        .onError(() => {
          // flash message shall go here
          alert('Something went wrong')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .vessels {
    position: relative;
    top: 30px;

    h1, p {
      text-align: center;
    }

    h1 {
      padding: 50px 0;
    }
  }
</style>
