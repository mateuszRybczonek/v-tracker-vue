<template>
    <v-card :to="vesselDetailsLink" class="vessels-list-item" :class="{ 'vessels-list-item--faded': inProgress}">
      <md-progress-spinner
        v-if="inProgress"
        :md-diameter="130"
        :md-stroke="10"
        md-mode="indeterminate">
      </md-progress-spinner>
      <p class="vessels-list-item__subheader--small">
        {{vessel.name}}
      <p>
      <p class="vessels-list-item__subheader--small">
        IMO number: {{vessel.imoNumber}}
      </p>
      <div class="vessels-list-item__buttons">
        <router-link :to="editLink" class="edit-icon">
          <BaseIcon
            width=40
            height=40>
            <IconPencil></IconPencil>
          </BaseIcon>
        </router-link>
        <span class="delete-icon" @click.prevent.stop="deleteVessel(vessel.id)">
          <BaseIcon
            width=40
            height=40>
            <IconTrash></IconTrash>
          </BaseIcon>
        </span>
      </div>
    </v-card>
</template>

<script>
  import VCard from '../../molecules/card.vue'
  import BaseIcon from '../../Atoms/BaseIcon.vue'
  import IconPencil from '../../icons/icon-pencil.vue'
  import IconTrash from '../../icons/icon-trash.vue'

  export default {
    name: 'ProgressSpinnerSizes',

    data () {
      return {
        inProgress: false
      }
    },

    props: {
      vessel: {
        type: Object,
        required: true
      }
    },

    components: {
      VCard,
      BaseIcon,
      IconPencil,
      IconTrash
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
        this.inProgress = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .vessels-list-item {
    position: relative;
    display: flex;
    align-items: center;
    background-color: $color-white;
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

    &--faded {
      opacity: 0.3;
      cursor: auto;
      pointer-events: none;
    }

    &__subheader--small {
      padding: 0 0 15px;

      @media all and (max-width: $phone) {
        padding: 0 15px 30px;
      }
    }

    &__buttons {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      width: 100%;

      .edit-icon, .delete-icon {
        color: $color-light-grey;
        transition: color 600ms;
      }

      .edit-icon:hover {
        color: $color-green;
      }

      .delete-icon:hover {
        color: $color-tomato;
      }
    }

    .md-progress-spinner {
      position: absolute;
      top: 25%;
      stroke: $color-black;
    }
  }
</style>
