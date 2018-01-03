<template>
    <v-card :to="vesselDetailsLink" class="vessels-list-item">
      <p class="subheader-small">{{vessel.name}}<p>
      <p class="subheader-small">IMO number: {{vessel.imoNumber}}</p>
      <div class="buttons">
        <router-link :to="editLink" class="icon-button">
          <icon-button src="../src/assets/icons/pencil.svg" type="positive" size="small"></icon-button>
        </router-link>
        <span @click="deleteVessel(vessel.id)" class="icon-button">
          <icon-button src="../src/assets/icons/trash-o.svg" type="negative" size="small"></icon-button>
        </span>
      </div>
    </v-card>
</template>

<script>
  import VCard from '../../molecules/card.vue'
  import IconButton from '../../atoms/buttons/icon-button'

  export default {
    props: ['vessel'],
    components: {
      VCard,
      IconButton
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
      justify-content: flex-end;
      width: 100%;

      > .icon-button {
        margin: 10px;
      }
    }
  }

</style>
