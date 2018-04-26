<template>
  <div class="main-menu">
    <TheHeader></TheHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'Vuex'
  import TheHeader from '../components/TheHeader.vue'

  export default {
    created () {
      this.fetchUser()
    },

    components: {
      TheHeader
    },

    methods: {
      ...mapActions([
        'fetchUser'
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

  .main-menu {
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
