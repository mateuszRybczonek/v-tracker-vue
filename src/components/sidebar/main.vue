<template>
  <div class="wrapper">
    <div class="sidebar" :class="{ 'sidebar--contracted': !show }">
      <sidebar-header
        :vessel="vessel">
      </sidebar-header>

      <sidebar-quick-links></sidebar-quick-links>

      <sidebar-content
        :vessel="vessel"
        :lastReport="lastReport">
      </sidebar-content>
    </div>
  </div>
</template>

<script>
  import SidebarHeader from './header.vue'
  import SidebarQuickLinks from './quick-links.vue'
  import SidebarContent from './content.vue'
  import EventBus from '../../services/event-bus.js'

  export default {
    props: [
      'vessel',
      'lastReport'
    ],

    created () {
      EventBus.$on('sidebarToggle', this.sidebarToggleHandler)
    },

    data () {
      return {
        show: true
      }
    },

    methods: {
      sidebarToggleHandler () {
        this.show = !this.show
      }
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
    width: 300px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 56px;
    background-color: $color-blue;
    color: $color-whitey;
    transition: margin-left .5s;

    &--contracted {
      margin-left: -250px;
    }
  }
</style>
