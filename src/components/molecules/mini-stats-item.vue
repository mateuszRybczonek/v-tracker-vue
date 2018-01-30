<template>
  <div class="mini-stats-item">
    <v-accordion :showOnInit=true :color=color>
      <div slot="header" class="v-accordion-header__slot">
        <v-icon :icon=icon size="small" color="white"></v-icon>
        <p>{{description}}</p>
      </div>
      <div slot="body" class="mini-stats-item__content">
        <div class="item__badge">
          <v-icon :icon=icon size="large" color="white"></v-icon>
        </div>
        <div class="item__description">
          <div class="description__header">
            {{header}}
          </div>
          <div class="description__text">
            {{description}}
          </div>
        </div>
      </div>
    </v-accordion>
  </div>
</template>

<script>
  import VIcon from '../../components/atoms/icon.vue'
  import VAccordion from '../../components/molecules/accordion.vue'

  export default {
    props: ['icon', 'header', 'description', 'color'],

    components: {
      VIcon,
      VAccordion
    }
  }
</script>

<style scoped lang="scss">
  $icon-size: 80px;

  .mini-stats-item {
    min-width: 320px;
    &__content {
      display: flex;
      justify-content: space-around;
      text-align: left;
      min-height: 130px;

      .item__badge {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: $icon-size;
        min-width: $icon-size;
        text-align: center;
        @include border-radius(50%);
        @media all and (max-width: $tablet) {
          margin: 0 16px 0 0;
        }

        > i {
          fill: #FFF;
        }

        .badge__icon {
          background-size: cover;
          padding: 0;
        }
      }
    }

    .item__description {
      text-align: center;
      margin-top: 16px;

      @media all and (max-width: $tablet) {
        text-align: left;
        margin-top: 0;
      }

      .description__header {
        @include font(28px, 600, 32px);
        color: $color-dark-grey;

        @media all and (min-width: $tablet) {
          margin-bottom: 5px;
        }

        @media all and (max-width: $tablet) {
          @include font(42px, 600, 46px);
        }
      }

      .description__text {
        @include font(12px, 300);
        color: $color-dark-grey;
        text-transform: uppercase;
        letter-spacing: 2px;

        @media all and (max-width: $tablet) {
          font-size: 17px;
        }
      }
    }
  }
</style>
