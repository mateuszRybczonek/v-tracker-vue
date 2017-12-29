<template>
  <div class="vessels-list-item">
    <v-card to='/dashboard/vessels/new'>
      <p class="h2">Add new vessel</p>
    </v-card>
  </div>
</template>

<script>
  import VCard from '../../molecules/card.vue'

  export default {
    components: {
      VCard
    }
  }
</script>

<style scoped lang="scss">
  .vessels-list-item {
    display: flex;
    width: 350px;
    text-align: center;
    @include border-radius(5);
    @include box-shadow(0 0 100px 1px rgba(0,0,0,0.1));

    @media all and (max-width: $phone) {
      width: 100%;
      padding: 0;
      @include border-radius(0);
      @include box-shadow(0 0 0 0 #fff);
      border: solid 1px $color-whitey;

      &:hover {
        @include box-shadow(0 0 0 0 #FFF);
        transform: scale(1);
      }
    }

    h2 {
      margin: 5px 0 0 ;

      @media all and (max-width: $phone) {
        margin-top: 15px;
        padding: 0 10px;
      }
    }
  }
</style>
