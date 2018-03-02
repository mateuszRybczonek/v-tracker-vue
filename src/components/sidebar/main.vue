<template>
  <div class="wrapper">
    <div class="sidebar" :class="{ 'sidebar--collapsed': !sidebarVisible }">
      <sidebar-header
        :vessel="vessel">
      </sidebar-header>

      <sidebar-quick-links
        :vertical="!sidebarVisible">
      </sidebar-quick-links>

      <sidebar-content
        :vessel="vessel"
        :lastReport="lastReport"
        :report="report">
      </sidebar-content>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarHeader from './header.vue'
  import SidebarQuickLinks from './quick-links.vue'
  import SidebarContent from './content.vue'

  export default {
    props: {
      vessel: {
        type: Object,
        required: true
      },

      report: {
        type: Object
      },

      lastReport: {
        type: Object
      }
    },

    computed: {
      ...mapGetters([
        'sidebarVisible'
      ])
    },

    components: {
      SidebarHeader,
      SidebarQuickLinks,
      SidebarContent
    }
  }
</script>

<style scoped lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    margin-top: 56px;
    background-color: $color-blue;
    color: $color-whitey;
    transition: margin-left .5s;
    z-index: 999;

    &--collapsed {
      margin-left: -250px;

      .sidebar__quick-links {
        order: 3;
      }

      .sidebar___content {
        order: 2;
      }
    }
  }
</style>
