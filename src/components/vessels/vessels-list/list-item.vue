<template>
  <div class="vessels-list-item">
    <v-card to=''>
      <div class="image">
        <img src=''>
      </div>

      <p class="subheader-small">{{vessel.name}}<p>

      <p class="subheader-small">
        IMO number: {{vessel.imoNumber}}
      </p>

      <div class="buttons">
        <router-link :to="editLink" class="login-button">Edit</router-link>
        <p @click="deleteVessel(vessel.id)">Delete</p>
      </div>
    </v-card>
  </div>
</template>

<script>
  import VCard from '../../molecules/card.vue'

  export default {
    props: ['vessel'],
    components: {
      VCard
    },
    computed: {
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

    img {
      height: 150px;
      width: auto;
      margin-top: 20px;
      @include border-radius(2px);

      @media all and (max-width: $phone) {
        height: 200px;
        padding-top: 30px;
      }
    }

    .subheader-small {
      padding: 0 0 15px;

      @media all and (max-width: $phone) {
        padding: 0 15px 30px;
      }
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  }

</style>
