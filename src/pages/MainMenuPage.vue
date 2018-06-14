<template>
  <div class="main-menu">
    <TheHeader></TheHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
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
  .main-menu {
    width: 100%;
    position: relative;
    top: 56px;
    background-color: $color-whitey;
    background-attachment: fixed;
  }
</style>
