<template>
  <v-card :to="destination">
    <icon-button :src="iconSrc" size="huge"></icon-button>
    <p>{{label}}</p>
  </v-card>
</template>

<script>
  import VCard from '../../components/molecules/card.vue'
  import IconButton from '../../components/atoms/buttons/icon-button'

  export default {
    props: ['destination', 'iconSrc', 'label'],
    components: {
      VCard,
      IconButton
    }
  }
</script>
