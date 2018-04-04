<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">V-Tracker</router-link>
    </div>
    <nav class="header__navigation">
      <ul
        v-if="isAuthenticated"
        class="header__navigation-items"
      >
        <li class="header__navigation-item">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li class="header__navigation-item">
          <router-link to="/dashboard/vessels">Vessels</router-link>
        </li>
        <li class="header__navigation-item">
          <router-link to="/dashboard/reports">Reports</router-link>
        </li>
        <li class="header__navigation-item">
          <button
            @click="onLogout"
            class="header__logout"
          >
            Logout
          </button>
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
  .header {
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

    &__logo {
      font-weight: bold;
      color: white;

      a {
        text-decoration: none;
        color: white;
      }
    }

    &__navigation {
      height: 100%;

    }

    &__navigation-items {
      list-style: none;
      margin: 0;
      padding: 0;
      height: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
    }

    &__navigation-item {
      margin: 0 16px;

      a {
        text-decoration: none;
        color: white;
      }

      a:hover,
      a:active,
      a.router-link-active {
        font-weight: 800;
      }
    }
    
    &__logout {
      background-color: transparent;
      border: none;
      font: inherit;
      color: white;
      cursor: pointer;
    }
  }
</style>
