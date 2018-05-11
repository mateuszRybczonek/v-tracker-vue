<template>
  <header class="header" data-test-the-header>
    <div data-test-the-header-navigation-item class="header__logo">
      <router-link to="/">V-Tracker</router-link>
    </div>
    <nav class="header__navigation">
      <ul
        v-if="isAuthenticated"
        class="header__navigation-items"
      >
        <li data-test-the-header-navigation-item class="header__navigation-item">
          <router-link to="/dashboard/vessels">Vessels</router-link>
        </li>
        <li data-test-the-header-navigation-item class="header__navigation-item">
          <router-link to="/dashboard/reports">Reports</router-link>
        </li>
        <li data-test-the-header-navigation-item class="header__navigation-item">
          <button
            data-test-the-header-logout-button
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
  import { mapGetters, mapActions } from 'vuex'
  import router from '@/router/index'

  export default {
    computed: {
      ...mapGetters([
        'isAuthenticated'
      ])
    },

    methods: {
      ...mapActions([
        'logout'
      ]),

      async onLogout () {
        await this.logout()
        router.replace('/signin')
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    @include sizing(100% 56px);
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
      font-weight: $fw-bold;
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
        font-weight: $fw-bold;
      }
    }

    &__logout {
      background-color: transparent;
      border: none;
      font: inherit;
      color: white;
      cursor: pointer;

      &:hover,
      &:active  {
        font-weight: $fw-bold;
      }
    }
  }
</style>
