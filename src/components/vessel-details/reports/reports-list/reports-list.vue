<template>
  <div class="reports-list">
    <h1 v-if="!showNewReportForm" class="reports-list__header">Reports</h1>
    <v-new-report-form v-if="showNewReportForm"></v-new-report-form>
    <v-list-new v-bind="{showNewReportFormAction}" class="reports-list__item"></v-list-new>
  </div>
</template>

<script>
  import VCard from '../../../molecules/card.vue'
  import VListNew from './list-item-new.vue'
  import VNewReportForm from '../new-report.vue'

  export default {
//    props: ['reports'],

    data () {
      return {
        showNewReportForm: false
      }
    },

    components: {
      VListNew,
      VCard,
      VNewReportForm
    },

    methods: {
      showNewReportFormAction () {
        this.showNewReportForm = true
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


    &__item {
      margin: 20px;
      width: 100%;

      @media all and (max-width: $phone) {
        margin: 0;
      }
    }
  }
</style>
