<template>
  <div
    data-test-the-sidebar
    class="sidebar"
    :class="{ 'sidebar--collapsed': !sidebarVisible }"
  >
    <TheSidebarHeader :vessel="vessel"/>

    <TheSidebarQuickLinks
      class="sidebar__quick-links"
      :vertical="!sidebarVisible"/>

    <TheSidebarContent
      :vessel="vessel"
      :lastReport="lastReport"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { get } from 'vuex-pathify'
  import TheSidebarHeader from './TheSidebarHeader.vue'
  import TheSidebarQuickLinks from './TheSidebarQuickLinks.vue'
  import TheSidebarContent from './TheSidebarContent.vue'

  export default {
    components: {
      TheSidebarHeader,
      TheSidebarQuickLinks,
      TheSidebarContent
    },

    props: {
      lastReport: {
        type: Object
      }
    },

    computed: {
      ...mapGetters([
        'vessels'
      ]),

      sidebarVisible: get('sidebarVisible'),

      vessel () {
        return this.vessels.find(vessel => vessel.id === this.$route.params.id)
      }
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
