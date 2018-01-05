<template>
  <v-card :to="destination">
    <i :class="iconName" class="icon icon__large"></i>
    <p>{{label}}</p>
  </v-card>
</template>

<script>
  import VCard from '../../components/molecules/card.vue'

  export default {
    props: ['destination', 'iconName', 'label'],
    components: {
      VCard
    }
  }
</script>

<style scoped lang="scss">
  .icon {
    &__large {
      width: 151px;
      height: 151px;
    }
    margin-bottom: 70px;
    background-size: cover;
    padding: 0;
  }

  .ship {
    &__large {
      background-color: #999;
      mask-image: url('../../assets/icons.svg');
      mask-position: 50% -790px;
      mask-size: 141%;
    }
  }

  .files {
    &__large {
      background-color: #999;
      mask-image: url('../../assets/icons.svg');
      mask-position: 50% -206px;
      mask-size: 141%;
    }
  }
</style>
