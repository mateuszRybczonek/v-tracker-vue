<template>
  <div class="mini-stats__item">
    <div class="item__badge">
      <i :class="iconName" class="badge__icon icon--medium"></i>
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
</template>

<script>
  export default {
    props: ['iconName', 'header', 'description']
  }
</script>

<style scoped lang="scss">
  $icon-size: 80px;

  .mini-stats__item {
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

    &--fo > .item__badge { background-color: $color-black; }
    &--do > .item__badge { background-color: $color-brown; }
    &--fw > .item__badge { background-color: $color-blue; }
    &--pob > .item__badge { background-color: $color-green; }

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

      .icon--medium {
        width: 76px;
        height: 76px;
      }

      .icon__fuel {
        background-color: #FFF;
        mask-image: url('../../assets/icons.svg');

        &--medium {
          mask-position: 2px 0;
        }
      }

      .icon__water {
        background-color: #FFF;
        mask-image: url('../../assets/icons.svg');

        &--medium {
          mask-position: 0 -350px;
        }
      }

      .icon__people {
        background-color: #FFF;
        mask-image: url('../../assets/icons.svg');

        &--medium {
          mask-position: 0 -490px;
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
        color: $color-font-grey;

        @media all and (min-width: $tablet) {
          margin-bottom: 5px;
        }

        @media all and (max-width: $tablet) {
          @include font(42px, 600, 46px);
        }
      }

      .description__text {
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
