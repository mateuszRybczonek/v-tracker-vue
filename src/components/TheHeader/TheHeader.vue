<template>
  <header id="header">
    <div class="logo">
      <router-link to="/">V-Tracker</router-link>
    </div>
    <nav>
      <ul v-if="isAuthenticated">
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/dashboard/vessels">Vessels</router-link>
        </li>
        <li>
          <router-link to="/dashboard/reports">Reports</router-link>
        </li>
        <li>
          <button @click="onLogout" class="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'isAuthenticated'
      ])
    },

    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped lang="scss">
  #header {
    height: 56px;
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: $color-dark-grey;
    padding: 0 20px;
    z-index: 999;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    font-weight: 800;
  }

  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }
</style>
