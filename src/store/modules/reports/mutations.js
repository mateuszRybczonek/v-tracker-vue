import * as types from '../../mutation-types'
import Vue from 'vue'
import { mapReportForStore } from './helpers'

export default {
  [types.ADD_REPORT] (state, report) {
    mapReportForStore(report)
    state.reports.unshift(report)
  },

  [types.DELETE_REPORT] (state, reportId) {
    const report = state.reports.filter(report => report.id === reportId)
    const reportIndex = state.reports.indexOf(report[0])
    state.reports.splice(reportIndex, 1)
  },

  [types.UPDATE_REPORT] (state, reportData) {
    mapReportForStore(reportData)
    const report = state.reports.find(report => report.id === reportData.id)
    const reportIndex = state.reports.indexOf(report)
    Vue.set(state.reports, reportIndex, reportData)
  },

  [types.SELECT_REPORT] (state, reportId) {
    state.selectedReport = state.reports.find(report => report.id === reportId)
  }
}
