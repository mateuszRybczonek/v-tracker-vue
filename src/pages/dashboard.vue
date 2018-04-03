<template>
  <div id="dashboard">
    <TheHeader></TheHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import TheHeader from '../components/TheHeader/TheHeader.vue'

  export default {
    created () {
      this.$store.dispatch('fetchUser')
    },

    components: {
      TheHeader
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

  #dashboard {
    height: 100vh;
    width: 100%;
    position: relative;
    top: 56px;
    background-color: $color-whitey;
    background-attachment: fixed;
  }
  .cards {
    display: flex;
    justify-content: space-around;
    margin: 0 40px;
  }
</style>
