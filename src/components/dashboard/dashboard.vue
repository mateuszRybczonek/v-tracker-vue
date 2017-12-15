<template>
  <div id="dashboard">
    <app-header />
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p v-if="email">Your email address: {{ email }}</p>
  </div>
</template>

<script>
  import Header from '../header/header.vue'

  export default {
    computed: {
      email () {
        return !this.$store.getters.user ? false : this.$store.getters.user.email
      }
    },

    created () {
      this.$store.dispatch('fetchUser')
    },

    components: {
      'app-header': Header
    }
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>
