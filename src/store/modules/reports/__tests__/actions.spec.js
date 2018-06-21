import axios from 'axios'
import moxios from 'moxios'
import actions from '@/store/modules/reports/actions'
import { report, rawSecondReport } from '@/../test/stubs/report'

describe('reports actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  describe('createNewReport', () => {
    let context
    let reportData
    let onFulfilledPost
    let onFulfilledPatch
    let onFulfilledLastReportPatch
    let postResponse

    beforeEach(() => {
      reportData = { ...report, id: 888 }
      postResponse = { "name": "888" }

      context = {
        getters: {
          idToken: 999,
          sortedReports: [reportData]
        },
        commit: jest.fn()
      }

      onFulfilledPost = jest.fn()
      onFulfilledPatch = jest.fn()
      onFulfilledLastReportPatch = jest.fn()

      axios.post('/reports.json?auth=999').then(onFulfilledPost)
      axios.patch('vessels/vessel-1/reports.json?auth=999').then(onFulfilledPatch)
      axios.patch('vessels/vessel-1/lastReport.json?auth=999').then(onFulfilledLastReportPatch)

      moxios.stubRequest('/reports.json?auth=999', {
        status: 200,
        response: postResponse
      })

      moxios.stubRequest('vessels/vessel-1/reports.json?auth=999', {
        status: 200,
        response: 'report ref in vessel added'
      })

      moxios.stubRequest('vessels/vessel-1/lastReport.json?auth=999', {
        status: 200,
        response: 'lastReport vessel patched'
      })
    })

    it('doesn\'t make a call when no idToken', async() => {
      let onFulfilledNoToken = jest.fn()
      axios.post('/reports.json?auth=undefined').then(onFulfilledNoToken)

      context = {
        getters: {
          idToken: undefined
        }
      }

      await actions.createNewReport(context, reportData)
      expect(onFulfilledNoToken).notCalled
    })

    it('calls API and creates the report', async() => {
      await actions.createNewReport(context, reportData)
      expect(onFulfilledPost.mock.calls[0][0].data).toBe(postResponse)
    })

    it('calls API and patches the vessel adding a reference to the report', async() => {
      await actions.createNewReport(context, reportData)
      expect(onFulfilledPatch.mock.calls[0][0].data).toBe('report ref in vessel added')
    })

    it('calls API and patches the vessel lastReport', async() => {
      await actions.createNewReport(context, reportData)
      expect(onFulfilledLastReportPatch.mock.calls[0][0].data).toBe('lastReport vessel patched')
    })
  })

  describe('updateReport', () => {
    let context
    let reportData
    let onFulfilled

    beforeEach(() => {
      reportData = { ...report, id: 888 }
    })

    it('doesn\'t make a call when no idToken', async() => {
      onFulfilled = jest.fn()
      axios.patch('/reports/888.json?auth=undefined').then(onFulfilled)

      context = {
        getters: {
          idToken: undefined
        },
        commit: jest.fn(),
      }

      await actions.updateReport(context, reportData)
      expect(onFulfilled).notCalled
    })

    it('calls API and gets a proper response when idToken is valid', async() => {
      onFulfilled = jest.fn()
      axios.patch('/reports/888.json?auth=999').then(onFulfilled)

      moxios.stubRequest('/reports/888.json?auth=999', {
        status: 200,
        response: reportData
      })

      context = {
        getters: {
          idToken: 999
        },
        commit: jest.fn()
      }

      await actions.updateReport(context, reportData)
      expect(onFulfilled.mock.calls[0][0].data).toBe(reportData)
    })

    it('calls commit with UPDATE_REPORT and the updated reportData', async() => {
      moxios.stubRequest('/reports/888.json?auth=999', {
        status: 200,
        response: reportData
      })

      context = {
        getters: {
          idToken: 999
        },
        commit: jest.fn()
      }

      await actions.updateReport(context, reportData)
      expect(context.commit).toHaveBeenCalledWith('UPDATE_REPORT', reportData)
    })
  })

  describe('fetchReports', () => {
    let context

    const responseJSON = {
      "report-1": rawSecondReport,
      "report-2": rawSecondReport
    }

    beforeEach(() => {
      moxios.stubRequest('/reports.json?orderBy="vessel"&equalTo="vessel-1"', {
        status: 200,
        response: responseJSON
      })

      context = {
        commit: jest.fn(),
        dispatch: jest.fn(),
      }
    })

    it('calls API and gets a proper response', async() => {
      const onFulfilled = jest.fn()
      axios.get('/reports.json?orderBy="vessel"&equalTo="vessel-1"').then(onFulfilled)

      await actions.fetchReports(context, 'vessel-1')
      expect(onFulfilled.mock.calls[0][0].data).toBe(responseJSON)
    })

    it('commits SET_REPORTS mutation with reports', async() => {
      await actions.fetchReports(context, 'vessel-1')
      expect(context.commit).toHaveBeenCalledWith('SET_REPORTS', expect.anything())
    })

    it('commits SET_FETCHING_REPORTS mutation with false', async() => {
      await actions.fetchReports(context, 'vessel-1')
      expect(context.commit).toHaveBeenCalledWith('SET_FETCHING_REPORTS', false)
    })

    it('commits SELECT_REPORT mutation', async() => {
      await actions.fetchReports(context, 'vessel-1')
      expect(context.commit).toHaveBeenCalledWith('SELECT_REPORT', expect.anything())
    })
  })

  describe('selectReport', () => {
    const context = { commit: jest.fn() }

    it('calls commit with SELECT_REPORT and a report id', async() => {
      await actions.selectReport(context, report.id)
      expect(context.commit).toHaveBeenCalledWith('SELECT_REPORT', report.id)
    })
  })

  describe('deleteReport', () => {
    let context
    let payload
    let onFulfilledDelete
    let onFulfilledPatch
    let onFulfilledLastReportPatch
    let reportData

    beforeEach(() => {
      payload = {
        vesselId: 111,
        reportId: 999
      }

      reportData = { ...report, id: 999 }

      context = {
        getters: {
          idToken: 888,
          sortedReports: [reportData]
        },
        commit: jest.fn()
      }

      onFulfilledDelete = jest.fn()
      onFulfilledPatch = jest.fn()
      onFulfilledLastReportPatch = jest.fn()

      axios.delete('/reports/999.json?auth=888').then(onFulfilledDelete)
      axios.patch('vessels/111/reports.json?auth=888').then(onFulfilledPatch)
      axios.patch('vessels/111/lastReport.json?auth=888').then(onFulfilledLastReportPatch)

      moxios.stubRequest('/reports/999.json?auth=888', {
        status: 200,
        response: 'report deleted'
      })

      moxios.stubRequest('vessels/111/reports.json?auth=888', {
        status: 200,
        response: 'report ref in vessel patched'
      })

      moxios.stubRequest('vessels/111/lastReport.json?auth=888', {
        status: 200,
        response: 'lastReport vessel patched'
      })
    })

    it('calls API and deletes the specified report', async() => {
      await actions.deleteReport(context, payload)
      expect(onFulfilledDelete.mock.calls[0][0].data).toBe('report deleted')
    })

    it('calls API and patches the vessel removing the reference to specified report', async() => {
      await actions.deleteReport(context, payload)
      expect(onFulfilledPatch.mock.calls[0][0].data).toBe('report ref in vessel patched')
    })

    it('calls commit with DELETE_REPORT and the reportId', async() => {
      await actions.deleteReport(context, payload)
      expect(context.commit).toHaveBeenCalledWith('DELETE_REPORT', payload.reportId)
    })
  })
})
