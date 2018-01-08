<template>
    <v-card :to="vesselDetailsLink" class="vessels-list-item">
      <p class="vessels-list-item__subheader--small">{{vessel.name}}<p>
      <p class="vessels-list-item__subheader--small">IMO number: {{vessel.imoNumber}}</p>
      <div class="vessels-list-item__buttons">
        <router-link tag="i"
          :to="editLink"
          class="button__edit">
          <v-icon icon="pencil" size="small" type="positive"></v-icon>
        </router-link>
        <v-icon @click="deleteVessel(vessel.id)" icon="trash" size="small" type="negative"></v-icon>
      </div>
    </v-card>
</template>

<script>
  import VCard from '../../molecules/card.vue'
  import VIcon from '../../atoms/icon.vue'

  export default {
    props: ['vessel'],
    components: {
      VCard,
      VIcon
    },

    computed: {
      vesselDetailsLink () {
        return `/dashboard/vessels/${this.vessel.id}`
      },
      editLink () {
        return `/dashboard/vessels/${this.vessel.id}/edit`
      }
    },
    methods: {
      deleteVessel (vesselId) {
        this.$store.dispatch('deleteVessel', vesselId)
      }
    }
  }
</script>

<style scoped lang="scss">
  .vessels-list-item {
    display: flex;
    align-items: baseline;
    background-color: #FFF;
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

    &__subheader--small {
      padding: 0 0 15px;

      @media all and (max-width: $phone) {
        padding: 0 15px 30px;
      }
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      width: 100%;

      .button__edit {
        width: 30px;
        height: 30px;
      }

      &__icon-button {
        margin: 3px;
      }
    }
  }

</style>
