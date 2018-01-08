<template>
  <v-card to='/dashboard/vessels/new' class="vessels-list-new">
    <i class="icon icon--large tiles-plus--large"></i>
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
  .vessels-list-new {
    .icon {
      &--large {
        width: 151px;
        height: 151px;
      }
      margin-bottom: 60px;
      background-size: cover;
      padding: 0;
    }

    .tiles-plus {
      &--large {
        background-color: #999;
        mask-image: url('../../../assets/icons.svg');
        mask-position: 50% -600px;
        mask-size: 141%;
      }
    }
  }
</style>
