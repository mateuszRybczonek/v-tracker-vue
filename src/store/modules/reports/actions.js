import * as types from '../../mutation-types'
import globalAxios from 'axios'
import { mapReportForStore, getLastReport } from './helpers'

export default {
  async createNewReport ({ getters, commit }, reportData) {
    if (!getters.idToken) return

    try {
      const { data } = await globalAxios.post(`/reports.json?auth=${getters.idToken}`, reportData)
      const vesselId = reportData.vessel
      const reportId = data.name
      reportData = { ...reportData, id: reportId }
      await globalAxios.patch(`vessels/${vesselId}/reports.json?auth=${getters.idToken}`, { [reportId]: true })
      const lastReportInDatabase = getters.sortedReports[0]
      const lastReport = lastReportInDatabase.reportTime > reportData.reportTime ? lastReportInDatabase : reportData

      await globalAxios.patch(`vessels/${vesselId}/lastReport.json?auth=${getters.idToken}`, lastReport)
      commit(types.ADD_REPORT, reportData)
    } catch (error) { throw error }
  },

  async updateReport ({ getters, commit }, reportData) {
    if (!getters.idToken) return

    try {
      Object.keys(reportData).map(objectKey => {
        return reportData[objectKey].toString()
      })

      await globalAxios.patch(`/reports/${reportData.id}.json?auth=${getters.idToken}`, reportData)
      commit(types.UPDATE_REPORT, reportData)
    } catch (error) { throw error }
  },

  async fetchReports ({ commit }, vesselId) {
    commit(types.SET_FETCHING_REPORTS, true)
    try {
      const { data } = await globalAxios.get(`/reports.json?orderBy="vessel"&equalTo="${vesselId}"`)
      const reports = []
      for (let key in data) { // add id to the report
        const report = data[key]
        report.id = key
        mapReportForStore(report)
        reports.push(report)
      }
      commit(types.SET_REPORTS, reports)
      commit(types.SET_FETCHING_REPORTS, false)
      commit(types.SELECT_REPORT, getLastReport(reports).id)
    } catch (error) { throw(error) }
  },

  async deleteReport ({ getters, commit }, payload) {
    const { reportId, vesselId } = payload

    try {
      await globalAxios.delete(`/reports/${reportId}.json?auth=${getters.idToken}`)
      try {
        await globalAxios.patch(`vessels/${vesselId}/reports.json?auth=${getters.idToken}`, { [reportId]: null })
        const isLastReport = getters.sortedReports[0].id === reportId
        commit(types.DELETE_REPORT, reportId)
        if (isLastReport) {
          await globalAxios.patch(`vessels/${vesselId}/lastReport.json?auth=${getters.idToken}`, getters.sortedReports[0])
        }
      } catch (error) { throw(error) }
    } catch (error) { throw(error) }
  },

  selectReport ({ commit }, reportId) {
    commit(types.SELECT_REPORT, reportId)
  }
}
