import getters from '@/store/modules/reports/getters'
import { report } from '@/../test/stubs/report'

describe('reports getters', () => {
  test('sortedReports returns reports sorted', () => {
    const reports = [ report ]
    const state = { reports }
    const result = getters.sortedReports(state)
    expect(result).toEqual(reports)
  })
})
