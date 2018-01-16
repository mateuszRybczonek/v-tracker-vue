<template>
  <div class="wrapper">
    <div class="sidebar" :class="{ 'sidebar--contracted': !show }">
      <div class="sidebar__header">
        <h5>{{vessel.name}}</h5>
        <router-link tag="i"
          :to="editLink"
          class="sidebar__header__edit-link">
          <v-icon
            icon="pencil"
            size="small"
            color="white">
          </v-icon>
        </router-link>
        <div class="sidebar__header__close" @click="toggle">
          <div class="sidebar__header__close__icon" :class="{ 'sidebar__header__close__icon--open': !show }">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="sidebar__quick-links">

      </div>
      <div class="sidebar__content">
        <ul class="sidebar__content__list">
          <li class="sidebar__content__list__item__status" v-if="show">
            <span class="sidebar__content__list__item__title">Status</span>
            <span class="sidebar__content__list__item__status__marker" :class="vesselStatusClass"></span>
          </li>

          <li class="sidebar__content__list__item" v-for="item in items">
            <span class="sidebar__content__list__item__title">{{item.title}}</span>
            <span class="sidebar__content__list__item__value">{{item.value}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import VIcon from './atoms/icon.vue'
  import EventBus from '../services/event-bus.js'

  export default {
    props: [
      'vessel',
      'lastReport'
    ],

    data () {
      return {
        show: true
      }
    },

    computed: {
      editLink () {
        return `/dashboard/vessels/${this.vessel.id}/edit`
      },

      vesselStatusClass () {
        if (this.$moment.duration(this.$moment().diff(this.lastReport.reportTime)).asHours() <= 24) {
          return `status--green`
        } else if (this.$moment.duration(this.$moment().diff(this.lastReport.reportTime)).asHours() <= 48) {
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
        this.show = !this.show
        EventBus.sidebarToggle(this.show)
      }
    },

    components: {
      VIcon
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

    &__header {
      background-color: $color-dark-blue;
      height: 56px;
      display: flex;
      align-items: center;
      padding-left: 15px;

      > h5 {
        color: $color-whitey;
        margin: 0;
        font-weight: 100;
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

    &__quick-links {
      &__icons {
        display: flex;
        justify-content: space-around;
        list-style-type: none;
        padding: 0;
      }
    }

    &__content {
      padding-left: 15px;
      &__list {
        display: flex;
        flex-direction: column;
        padding: 0;
        &__item__status {
          display: flex;
          align-self: flex-end;
          margin: 0 27px 15px;
          font-weight: 700;
          &__marker {
            height: 15px;
            width: 15px;
            border-radius: 50%;
            border: 2px solid $color-whitey-lighter;
            position: relative;
            top: 3px;
            left: 10px;

            &.status--green {
              background-color: $color-hover-green;
            }

            &.status--amber {
              background-color: $color-amber;
            }

            &.status--red {
              background-color: $color-tomato;
            }
          }
        }
        &__item {
          display: flex;
          flex-direction: column;
          margin: 0 0 15px;
          list-style-type: none;
          font-weight: 700;
          &__title {
            text-transform: uppercase;
            color: $color-light-blue;
          }
        }
      }
    }
  }
</style>
