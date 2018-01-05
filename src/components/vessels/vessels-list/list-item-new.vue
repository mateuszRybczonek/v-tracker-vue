<template>
  <v-card to='/dashboard/vessels/new'>
    <i class="icon icon__large tiles-plus__large"></i>
    <p>Add new vessel</p>
  </v-card>
</template>

<script>
  import VCard from '../../molecules/card.vue'
  import IconButton from '../../atoms/buttons/icon-button'

  export default {
    components: {
      VCard,
      IconButton
    }
  }
</script>

<style scoped lang="scss">
  .icon {
    &__large {
      width: 151px;
      height: 151px;
    }
    margin-bottom: 60px;
    background-size: cover;
    padding: 0;
  }

  .tiles-plus {
    &__large {
      background-color: #999;
      mask-image: url('../../../assets/icons.svg');
      mask-position: 50% -600px;
      mask-size: 141%;
    }
  }
</style>
