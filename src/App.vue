<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'app',

    created () {
      this.tryAutoLogin()
    },

    methods: {
      ...mapActions([
        'tryAutoLogin'
      ])
    }
  }
</script>

<style src="./styles/base.scss" lang="scss"></style>
