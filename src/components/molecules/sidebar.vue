<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <h5>{{vessel.name}}</h5>
      <router-link tag="i"
        :to="editLink"
        class="sidebar__header__edit-link">
        <v-icon icon="pencil" size="small" color="white"></v-icon>
      </router-link>
    </div>
    <div class="sidebar__quick-links">

    </div>
    <div class="sidebar__content">
      <ul class="sidebar__content__list">
        <li class="sidebar__content__list__item" v-for="item in items">
          <span class="sidebar__content__list__item__title">{{item.title}}</span>
          <span class="sidebar__content__list__item__value">{{item.value}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import VIcon from '../../components/atoms/icon.vue'

  export default {
    props: [
      'vessel'
    ],

    computed: {
      editLink () {
        return `/dashboard/vessels/${this.vessel.id}/edit`
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
        position: absolute;
        right: 10px;
        cursor: pointer;
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
        padding: 0;
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
