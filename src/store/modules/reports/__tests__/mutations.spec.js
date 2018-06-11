import mutations from '@/store/modules/reports/mutations'
import { report, secondReport, rawSecondReport } from '@/../test/stubs/report'

describe('reports mutations', () => {
  test('ADD_REPORT adds a report to state.reports', () => {
    const reports = [ report ]
    const state = { reports }

    mutations.ADD_REPORT(state, rawSecondReport)
    expect(state.reports).toEqual([ secondReport, report ])
  })

  test('DELETE_REPORT removes report from reports', () => {
    const reports = [ report ]
    const reportId = reports[0].id
    const state = { reports }
    const expectedResult = [ ]

    mutations.DELETE_REPORT(state, reportId)
    expect(state.reports).toEqual(expectedResult)
  })

  test('UPDATE_REPORT updates report with given reportData', () => {
    const reports = [ secondReport ]
    const state = { reports }
    const expectedResult = [ { ...secondReport, foRob: 1000 } ]

    const reportData = { ...rawSecondReport, foRob: "1000" }

    mutations.UPDATE_REPORT(state, reportData)
    expect(state.reports).toEqual(expectedResult)
  })

  test('SELECT_REPORT sets state.selectedReport to report', () => {
    const reports = [ report, secondReport ]

    const state = {
      selectedReport: null,
      reports
    }

    const reportId = reports[0].id

    mutations.SELECT_REPORT(state, reportId)
    expect(state.selectedReport).toBe(report)
  })
})
