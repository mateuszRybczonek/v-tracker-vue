<template>
  <div id="dashboard">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import vHeader from '../components/header/header.vue'
  import vesselsCard from '../components/dashboard/vessels-card.vue'
  import reportsCard from '../components/dashboard/reports-card.vue'

  export default {
    created () {
      this.$store.dispatch('fetchUser')
    },

    components: {
      vHeader,
      vesselsCard,
      reportsCard
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

  .cards {
    display: flex;
    justify-content: space-around;
    margin: 0 40px;
  }
</style>
