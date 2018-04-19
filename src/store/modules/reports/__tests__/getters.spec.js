import getters from '@/store/modules/reports/getters'
import { report } from '@/../test/stubs/report'

describe('reports getters', () => {
  test('reports returns state.reports', () => {
    const reports = [ report ]
    const state = { reports }
    const result = getters.reports(state)
    expect(result).toEqual(reports)
  })

  test('fetchingReports returns state.fetchingReports', () => {
    const fetchingReports = true
    const state = { fetchingReports }
    const result = getters.fetchingReports(state)
    expect(result).toEqual(true)
  })

  test('selectedReport returns state.fetchingReports', () => {
    const selectedReport = report
    const state = { selectedReport }
    const result = getters.selectedReport(state)
    expect(result).toEqual(selectedReport)
  })
})
