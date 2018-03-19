import * as types from '../mutation-types'
import globalAxios from 'axios'
import Vue from 'vue'

const state = {
  reports: [],
  fetchingReports: false,
  selectedReport: null
}

const getters = {
  reports: state => state.reports,
  fetchingReports: state => state.fetchingReports,
  selectedReport: state => state.selectedReport
}

const actions = {
  async createNewReport ({ getters, commit }, reportData) {
    if (!getters.idToken) {
      return
    }
    try {
      const { data } = await globalAxios.post(`/reports.json?auth=${getters.idToken}`, reportData)
      const vesselId = reportData.vessel
      const reportId = data.name
      reportData = { ...reportData, id: reportId }
      await globalAxios.patch(`vessels/${vesselId}/reports.json?auth=${getters.idToken}`, { [reportId]: true })
      commit(types.ADD_REPORT, reportData)
    } catch (error) { throw error }
  },

  async updateReport ({ getters, commit }, reportData) {
    if (!getters.idToken) {
      return
    }
    try {
      Object.keys(reportData).map(objectKey => {
        return reportData[objectKey].toString()
      })

      await globalAxios.patch(`/reports/${reportData.id}.json?auth=${getters.idToken}`, reportData)
      commit(types.UPDATE_REPORT, reportData)
    } catch (error) { throw error }
  },

  async fetchReports ({ getters, commit }, vesselId) {
    commit(types.FETCHING_REPORTS, true)
    try {
      const { data } = await globalAxios.get(`/reports.json?orderBy="vessel"&equalTo="${vesselId}"`)
      const reports = []
      for (let key in data) {     // add id to the report
        const report = data[key]
        report.id = key
        _mapReportForStore(report)
        reports.push(report)
      }
      commit(types.STORE_REPORTS, reports)
      commit(types.FETCHING_REPORTS, false)
      commit(types.SELECT_REPORT, _getLastReport(reports))
    } catch (error) { console.log(error) }
  },

  async deleteReport ({ getters, commit }, payload) {
    const { reportId, vesselId } = payload

    try {
      await globalAxios.delete(`/reports/${reportId}.json?auth=${getters.idToken}`)
      try {
        await globalAxios.patch(`vessels/${vesselId}/reports.json?auth=${getters.idToken}`, { [reportId]: null })
        commit(types.DELETE_REPORT, reportId)
      } catch (error) { console.log(error) }
    } catch (error) { console.log(error) }
  },

  selectReport ({ getters, commit }, report) {
    commit(types.SELECT_REPORT, report)
  }
}

const mutations = {
  [types.STORE_REPORTS] (state, reports) {
    state.reports = reports
  },

  [types.FETCHING_REPORTS] (state, value) {
    state.fetchingReports = value
  },

  [types.ADD_REPORT] (state, report) {
    _mapReportForStore(report)
    state.reports.push(report)
  },

  [types.DELETE_REPORT] (state, reportId) {
    const report = state.reports.filter(report => report.id === reportId)
    const reportIndex = state.reports.indexOf(report[0])
    state.reports.splice(reportIndex, 1)
  },

  [types.UPDATE_REPORT] (state, reportData) {
    _mapReportForStore(reportData)
    const report = state.reports.filter(report => report.id === reportData.id)
    const reportIndex = state.reports.indexOf(report[0])
    Vue.set(state.reports, reportIndex, reportData)
  },

  [types.SELECT_REPORT] (state, report) {
    state.selectedReport = report
  }
}

function _getLastReport (reports) {
  const sortedReports = reports.sort((a, b) => a.reportTime > b.reportTime)
  return sortedReports.slice(-1)[0]
}

function _mapReportForStore (report) {
  report.course = parseInt(report.course)
  report.doRob = parseInt(report.doRob)
  report.foRob = parseInt(report.foRob)
  report.fwRob = parseInt(report.fwRob)
  report.lat = parseFloat(report.lat)
  report.lng = parseFloat(report.lng)
  report.pitch = parseFloat(report.pitch)
  report.roll = parseFloat(report.roll)
  report.pob = parseInt(report.pob)
  report.seaState = parseInt(report.seaState)
  report.spd = parseInt(report.spd)
  report.swellDir = parseInt(report.swellDir)
  report.swellHeight = parseFloat(report.swellHeight)
  report.windDir = parseInt(report.windDir)
  report.windSpd = parseInt(report.windSpd)
}

export default {
  state,
  getters,
  actions,
  mutations
}
