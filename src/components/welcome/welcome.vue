<template>
  <div id="welcome">
    <p class="small-text small-text-top">Free Vessel Tracking App</p>
    <h1 class="main-text">V-tracker</h1>
    <p class="small-text small-text-bottom">Track you vessels based on reports or AIS</p>
    <div class="cta">
      <router-link to="/signin" class="login-button">Log in</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
  #welcome {
    width: 80%;
    margin: auto;
    text-align: center;

    $section-height: 50em;

    & {
      width: 100%;
      height: $section-height;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &:after {
        content: "";
        /*background-image: url('../images/login-background.jpg');*/
        filter: grayscale(100%);
        opacity: 0.5;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
        height: $section-height;
      }

      .small-text {
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 1px;
      }

      .small-text-top {
        &:after {
          top: 15px;
          left: 50%;
          bottom: 0;
          position: relative;
          width: 35px;
          height: 2px;
          content: "";
          display: inherit;
          background-color: $color-green;
          transform: translateX(-50%);
        }
      }

      .main-text {
        margin-top: 40px;
      }

      .cta {
        min-height: 56px;

        > a {
          margin-top: 60px;
          display: inline-flex;
          align-items: center;

          @include common-button();
          @include green-button();
          @include box-shadow(0 8px 16px 0 rgba(83, 99, 115, 0.32));
          @include font(16px, 700);
          min-height: 56px;
          padding: 0 32px;

          @media all and (max-width: $phone) {
            font-size: 20px;
            width: 100%;
          }

          > .icon {
            margin-left: 8px;
            font-size: 22px;
            line-height: 21px;
            vertical-align: middle;
          }
        }
      }
    }

  }
</style>
