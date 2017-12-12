<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },

    created() {
      this.$store.dispatch('tryAutoLogin')
    }
  }
</script>

<style src="./styles/base.scss" lang="scss"></style>
