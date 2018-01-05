<template>
  <div class="mini-stats-item">
    <div class="badge">
      <i :class="iconName" class="icon icon__medium"></i>
    </div>
    <div class="description">
      <div class="header">
        {{header}}
      </div>
      <div class="text">
        {{description}}
      </div>
    </div>
  </div>
</template>

<script>
  import IconButton from '../../components/atoms/buttons/icon-button'

  export default {
    props: ['iconName', 'header', 'description'],
    components: {
      IconButton
    }
  }
</script>

<style scoped lang="scss">
  $icon-size: 80px;

  .mini-stats-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    flex-grow: 1;

    @media all and (max-width: $tablet) {
      flex-direction: row;
      width: 100%;
      padding: 24px 0 24px 16px;
      margin-bottom: 0;
    }

    &.item-fo > .badge { background-color: $color-black; }
    &.item-do > .badge { background-color: $color-brown; }
    &.item-fw > .badge { background-color: $color-blue; }
    &.item-pob > .badge { background-color: $color-green; }

    .badge {
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

      .icon {
        background-size: cover;
        padding: 0;

        &__medium {
          width: 76px;
          height: 76px;
        }
      }

      .fuel {
        background-color: #FFF;
        mask-image: url('../../assets/icons.svg');

        &__medium {
          mask-position: 2px 0;
        }
      }

      .water {
        background-color: #FFF;
        mask-image: url('../../assets/icons.svg');

        &__medium {
          mask-position: 0 -350px;
        }
      }

      .people {
        background-color: #FFF;
        mask-image: url('../../assets/icons.svg');

        &__medium {
          mask-position: 0 -490px;
        }
      }
    }

    .description {
      text-align: center;
      margin-top: 16px;

      @media all and (max-width: $tablet) {
        text-align: left;
        margin-top: 0;
      }

      .header {
        @include font(28px, 600, 32px);
        color: $color-font-grey;

        @media all and (min-width: $tablet) {
          margin-bottom: 5px;
        }

        @media all and (max-width: $tablet) {
          @include font(42px, 600, 46px);
        }
      }

      .text {
        @include font(12px, 300);
        color: $color-font-grey;
        text-transform: uppercase;
        letter-spacing: 2px;

        @media all and (max-width: $tablet) {
          font-size: 17px;
        }
      }
    }
  }
</style>
