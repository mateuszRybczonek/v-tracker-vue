<template>
  <div id="dashboard">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import vHeader from '../components/header/header.vue'

  export default {
    created () {
      this.$store.dispatch('fetchUser')
    },

    components: {
      vHeader
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
