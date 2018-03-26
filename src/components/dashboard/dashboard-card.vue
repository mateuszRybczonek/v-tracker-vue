<template>
  <v-card class="dashboard-card" :to="destination">
    <IconBase class="dashboard-card__icon" :icon-name='icon' iconColor="#999">
      <component :is="icon"></component>
    </IconBase>
    <p class="dashboard-card__label">{{label}}</p>
  </v-card>
</template>

<script>
  import VCard from '../../components/molecules/card.vue'
  import IconBase from '../../components/atoms/icon-base.vue'
  import IconFiles from '../../components/icons/icon-files.vue'
  import IconShip from '../../components/icons/icon-ship.vue'

  export default {
    props: {
      destination: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    },

    components: {
      VCard,
      IconBase,
      IconFiles,
      IconShip
    }
  }
</script>

<style scoped lang="scss">
  .dashboard-card {
    &__icon {
      width: 200px;
      height: 200px;
      margin-bottom: 20px;
    }
  }
</style>
