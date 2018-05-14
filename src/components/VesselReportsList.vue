<template>
  <div class="reports-list">
    <h1
      data-test-vessel-reports-list-header
      class="reports-list__header"
    >
      {{title}}
    </h1>

    <transition name="slide">
      <VesselReportsListForm
        v-if="showNewReportForm"
        @hideReportForm="hideReportForm">
      </VesselReportsListForm>
    </transition>

    <VesselReportsListItemNew
      v-bind="{showNewReportFormAction}"
      class="reports-list__item">
    </VesselReportsListItemNew>

    <transition-group
      name="slide"
      class="reports-list__transition-group"
    >
      <VesselReportsListItem
        v-for="report in reports"
        :key="report.id"
        :report="report"
      ></VesselReportsListItem>
    </transition-group>
  </div>
</template>

<script>
  import VesselReportsListItemNew from './VesselReportsListItemNew.vue'
  import VesselReportsListForm from './VesselReportsListForm.vue'
  import VesselReportsListItem from './VesselReportsListItem.vue'

  export default {
    components: {
      VesselReportsListItemNew,
      VesselReportsListForm,
      VesselReportsListItem
    },

    props: {
      reports: {
        type: Array,
        required: true
      }
    },

    data () {
      return {
        showNewReportForm: false
      }
    },

    computed: {
      title () {
        return this.showNewReportForm ? 'New Report' : 'Reports'
      }
    },

    methods: {
      showNewReportFormAction () {
        this.showNewReportForm = true
      },

      hideReportForm () {
        this.showNewReportForm = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .reports-list {
    display: flex;
    flex-wrap: wrap;
    padding: 50px 30px 0;
    align-items: center;
    flex-direction: column;

    &__transition-group {
      width: 100%;
    }

    &__item {
      margin: 20px;
      width: 100%;

      @media all and (max-width: $phone) {
        margin: 0;
      }
    }
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition:  opacity 1s;
  }

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition:  opacity 500ms;
    opacity: 0;

    /*to animate when the list item is removed*/
    position: absolute;
  }

  /*only for transition-group*/
  .slide-move {
    transition: transform 1s
  }

  @keyframes slide-in {
    from {
      transform: translateX(1200px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(1200px);
    }
  }
</style>
