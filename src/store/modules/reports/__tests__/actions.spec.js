import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'
import { equal, ok } from 'assert'
import actions from '@/store/modules/reports/actions'
import { report, secondReport, rawSecondReport } from '@/../test/stubs/report'

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
    let postResponse

    beforeEach(() => {
      reportData = { ...report, id: 888 }
      postResponse = { "name": "888" }

      context = {
        getters: {
          idToken: 999,
        },
        commit: jest.fn()
      }

      onFulfilledPost = sinon.spy()
      onFulfilledPatch = sinon.spy()

      axios.post('/reports.json?auth=999').then(onFulfilledPost)
      axios.patch('vessels/vessel-1/reports.json?auth=999').then(onFulfilledPatch)

      moxios.stubRequest('/reports.json?auth=999', {
        status: 200,
        response: postResponse
      })

      moxios.stubRequest('vessels/vessel-1/reports.json?auth=999', {
        status: 200,
        response: 'report ref in vessel added'
      })
    })

    it('doesn\'t make a call when no idToken', async() => {
      let onFulfilledNoToken = sinon.spy()
      axios.post('/reports.json?auth=undefined').then(onFulfilledNoToken)

      context = {
        getters: {
          idToken: undefined
        }
      }

      await actions.createNewReport(context, reportData)
      ok(onFulfilledNoToken.notCalled)
    })

    it('calls API and creates the report', async() => {
      await actions.createNewReport(context, reportData)
      equal(onFulfilledPost.getCall(0).args[0].data, postResponse)
    })

    it('calls API and patches the vessel adding a reference to the report', async() => {
      await actions.createNewReport(context, reportData)
      equal(onFulfilledPatch.getCall(0).args[0].data, 'report ref in vessel added')
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
      onFulfilled = sinon.spy()
      axios.patch('/reports/888.json?auth=undefined').then(onFulfilled)

      context = {
        getters: {
          idToken: undefined
        },
        commit: jest.fn(),
      }

      await actions.updateReport(context, reportData)
      ok(onFulfilled.notCalled)
    })

    it('calls API and gets a proper response when idToken is valid', async() => {
      onFulfilled = sinon.spy()
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
      equal(onFulfilled.getCall(0).args[0].data, reportData)
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
      const onFulfilled = sinon.spy()
      axios.get('/reports.json?orderBy="vessel"&equalTo="vessel-1"').then(onFulfilled)

      await actions.fetchReports(context, 'vessel-1')
      equal(onFulfilled.getCall(0).args[0].data, responseJSON)
    })

    it('dispatches storeReports action', async() => {
      await actions.fetchReports(context, 'vessel-1')
      expect(context.dispatch).toHaveBeenCalledWith('storeReports', expect.anything())
    })

    it('dispatches setFetchingReports action with false', async() => {
      await actions.fetchReports(context, 'vessel-1')
      expect(context.dispatch).toHaveBeenCalledWith('setFetchingReports', false)
    })

    it('dispatches selectReport action', async() => {
      await actions.fetchReports(context, 'vessel-1')
      expect(context.dispatch).toHaveBeenCalledWith('selectReport', expect.anything())
    })
  })

  describe('storeReports', () => {
    const context = { commit: jest.fn() }
    const reports = [ report, secondReport ]

    it('calls commit with STORE_REPORTS and reports array', async() => {
      await actions.storeReports(context, reports)
      expect(context.commit).toHaveBeenCalledWith('STORE_REPORTS', reports)
    })
  })

  describe('setFetchingReports', () => {
    const context = { commit: jest.fn() }

    it('calls commit with FETCHING_REPORTS and given value', async() => {
      await actions.setFetchingReports(context, true)
      expect(context.commit).toHaveBeenCalledWith('FETCHING_REPORTS', true)
    })
  })

  describe('selectReport', () => {
    const context = { commit: jest.fn() }

    it('calls commit with SELECT_REPORT and a report object', async() => {
      await actions.selectReport(context, report)
      expect(context.commit).toHaveBeenCalledWith('SELECT_REPORT', report)
    })
  })

  describe('deleteReport', () => {
    let context
    let payload
    let onFulfilledDelete
    let onFulfilledPatch

    beforeEach(() => {
      payload = {
        vesselId: 111,
        reportId: 999
      }

      context = {
        getters: {
          idToken: 888,
        },
        commit: jest.fn()
      }

      onFulfilledDelete = sinon.spy()
      onFulfilledPatch = sinon.spy()

      axios.delete('/reports/999.json?auth=888').then(onFulfilledDelete)
      axios.patch('vessels/111/reports.json?auth=888').then(onFulfilledPatch)

      moxios.stubRequest('/reports/999.json?auth=888', {
        status: 200,
        response: 'report deleted'
      })

      moxios.stubRequest('vessels/111/reports.json?auth=888', {
        status: 200,
        response: 'report ref in vessel patched'
      })
    })

    it('calls API and deletes the specified report', async() => {
      await actions.deleteReport(context, payload)
      equal(onFulfilledDelete.getCall(0).args[0].data, 'report deleted')
    })

    it('calls API and patches the vessel removing the reference to specified report', async() => {
      await actions.deleteReport(context, payload)
      equal(onFulfilledPatch.getCall(0).args[0].data, 'report ref in vessel patched')
    })

    it('calls commit with DELETE_REPORT and the reportId', async() => {
      await actions.deleteReport(context, payload)
      expect(context.commit).toHaveBeenCalledWith('DELETE_REPORT', payload.reportId)
    })
  })
})
