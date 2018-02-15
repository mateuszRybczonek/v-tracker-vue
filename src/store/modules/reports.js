import * as types from '../mutation-types'
import globalAxios from 'axios'

const state = {
  reports: [],
  fetchingReports: false
}

const getters = {
  reports: state => state.reports,
  fetchingReports: state => state.fetchingReports
}

const actions = {
  async createNewReport ({ getters }, reportData) {
    if (!getters.idToken) {
      return
    }
    try {
      const { data } = await globalAxios.post(`/reports.json?auth=${getters.idToken}`, reportData)
      const vesselId = reportData.vessel
      const reportId = data.name

      try {
        await globalAxios.patch(`vessels/${vesselId}/reports.json?auth=${getters.idToken}`, { [reportId]: true })
      } catch (error) { throw error }
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
        report.course = parseInt(report.course)
        report.doRob = parseInt(report.doRob)
        report.foRob = parseInt(report.foRob)
        report.fwRob = parseInt(report.fwRob)
        report.lat = parseInt(report.lat)
        report.lng = parseInt(report.lng)
        report.pitch = parseInt(report.pitch)
        report.roll = parseInt(report.roll)
        report.pob = parseInt(report.pob)
        report.seaState = parseInt(report.seaState)
        report.spd = parseInt(report.spd)
        report.swellDir = parseInt(report.swellDir)
        report.swellHeight = parseInt(report.swellHeight)
        report.windDir = parseInt(report.windDir)
        report.windSpd = parseInt(report.windSpd)
        reports.push(report)
      }
      commit(types.STORE_REPORTS, reports)
      commit(types.FETCHING_REPORTS, false)
    } catch (error) { console.log(error) }
  }
}

const mutations = {
  [types.STORE_REPORTS] (state, reports) {
    state.reports = reports
  },

  [types.FETCHING_REPORTS] (state, value) {
    state.fetchingReports = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
