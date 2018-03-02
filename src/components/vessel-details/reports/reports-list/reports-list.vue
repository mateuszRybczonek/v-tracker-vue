<template>
  <div class="reports-list">
    <h1 v-if="!showNewReportForm" class="reports-list__header">Reports</h1>
    <h1 v-if="showNewReportForm" class="reports-list__header">New report</h1>
    <transition name="slide">
      <v-new-report-form v-if="showNewReportForm" @hideReportForm="hideReportForm"></v-new-report-form>
    </transition>
    <v-list-new
      v-bind="{showNewReportFormAction}"
      class="reports-list__item">
    </v-list-new>
    <transition-group name="slide" class="reports-list__transition-group">
      <v-report-item
        v-for="report in reports"
        :key="report.id"
        :report="report"
      ></v-report-item>
    </transition-group>
  </div>
</template>

<script>
  import VCard from '../../../molecules/card.vue'
  import VListNew from './list-item-new.vue'
  import VNewReportForm from '../new-report/new-report.vue'
  import VReportItem from './report-item.vue'

  export default {
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

    components: {
      VListNew,
      VCard,
      VNewReportForm,
      VReportItem
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
