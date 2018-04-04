<template>
  <div class="sidebar__header">
    <h5>{{vessel.name}}</h5>
    <router-link tag="i"
      :to="editLink"
      class="sidebar__header__edit-link">
      <BaseIcon
        width=40
        height=40
        viewBox='20 -5 76 76'>
        <IconPencil></IconPencil>
      </BaseIcon>
    </router-link>
    <div class="sidebar__header__close" @click="toggle">
      <div class="sidebar__header__close__icon" :class="{ 'sidebar__header__close__icon--open': !sidebarVisible }">
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BaseIcon from './BaseIcon.vue'
  import IconPencil from './icons/icon-pencil.vue'

  export default {
    props: {
      vessel: {
        type: Object,
        required: true
      },
      report: {
        type: Object
      }
    },

    computed: {
      ...mapGetters([
        'sidebarVisible'
      ]),

      editLink () {
        return `/dashboard/vessels/${this.vessel.id}/edit`
      },

      vesselStatusClass () {
        if (this.$moment.duration(this.$moment().diff(this.report.reportTime)).asHours() <= 24) {
          return `status--green`
        } else if (this.$moment.duration(this.$moment().diff(this.report.reportTime)).asHours() <= 48) {
          return `status--amber`
        } else {
          return `status--red`
        }
      },

      items () {
        return [
          {
            'title': 'Name',
            'value': this.vessel.name
          }, {
            'title': 'IMO Number',
            'value': this.vessel.imoNumber
          }, {
            'title': 'MMSI',
            'value': this.vessel.mmsi
          }, {
            'title': 'Gross tonnage',
            'value': this.vessel.gt
          }, {
            'title': 'Year of build',
            'value': this.vessel.yob
          }, {
            'title': 'Flag',
            'value': this.vessel.flag
          }
        ]
      }
    },

    methods: {
      toggle () {
        this.$store.dispatch('toggleSidebar')
      }
    },

    components: {
      IconPencil,
      BaseIcon
    }
  }
</script>

<style scoped lang="scss">
  .sidebar__header {
    background-color: $color-dark-blue;
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 15px;

    > h5 {
      color: $color-whitey;
      margin: 0;
      font-weight: 400;
    }

    &__edit-link {
      margin-left: 10px;
      cursor: pointer;
    }

    &__close {
      position: absolute;
      right: 35px;
      top: 17px;
      cursor: pointer;

      &__icon {
        width: 20px;
        height: 20px;
        position: absolute;
        transform: rotate(0deg);
        transition: .5s ease-in-out;
        cursor: pointer;

        > span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: $color-whitey;
          border-radius: 1px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: .6s ease-in-out;

          &:nth-child(1) {
            top: -3px;
            width: 30px;
            transform: rotate(45deg);
            transform-origin: left center;
          }

          &:nth-child(2) {
            top: 18px;
            width: 30px;
            transform: rotate(-45deg);
            transform-origin: left center;
          }
        }

        &--open {
          > span {
            &:nth-child(1) {
              transform: rotate(405deg);
              width: 20px;
              top: -4px;
              left: 0;
            }

            &:nth-child(2) {
              transform: rotate(315deg);
              width: 20px;
              top: 24px;
            }
          }
        }
      }
    }
  }
</style>
