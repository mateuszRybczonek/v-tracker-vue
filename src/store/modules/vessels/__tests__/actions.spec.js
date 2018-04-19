import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'
import { equal, ok } from 'assert'
import actions from '@/store/modules/vessels/actions'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

describe('vessels actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('fetchVessels calls commit with STORE_VESSEL and the fetched userVessels', async() => {
    moxios.stubRequest('/vessels.json?orderBy="owner"&equalTo="1"', {
      status: 200,
      response: {
        "-L2sqMuqy29K5adoAZdT": firstVessel
      }
    })

    const context = {
      commit: jest.fn(),
    }

    await actions.fetchVessels(context, 1)
    expect(context.commit).toHaveBeenCalledWith('STORE_VESSEL', [ firstVessel ])
  })

  describe('editVessel', () => {
    let vesselData
    let onFulfilled
    let context

    beforeEach(() => {
      vesselData = { id: 1 }
    })

    it('doesn\'t make a call when no idToken', async() => {
      onFulfilled = sinon.spy()
      axios.patch('/vessels/1.json?auth=undefined').then(onFulfilled)

      context = {
        getters: {
          idToken: undefined
        }
      }

      await actions.editVessel(context, vesselData)
      ok(onFulfilled.notCalled)
    })

    it('calls API and gets a proper response when idToken is valid', async() => {
      onFulfilled = sinon.spy()
      axios.patch('/vessels/1.json?auth=999').then(onFulfilled)

      moxios.stubRequest('/vessels/1.json?auth=999', {
        status: 200,
        response: vesselData
      })

      context = {
        getters: {
          idToken: 999
        }
      }

      await actions.editVessel(context, vesselData)
      equal(onFulfilled.getCall(0).args[0].data, vesselData)
    })
  })

  describe('deleteVessel', () => {
    let context
    let vesselData
    let onFulfilledDelete = sinon.spy()
    let onFulfilledPatch = sinon.spy()

    beforeEach(() => {
      vesselData = { id: 1 }

      context = {
        getters: {
          idToken: 999,
          user: {
            userId: 333
          }
        },
        commit: jest.fn()
      }

      onFulfilledDelete = sinon.spy()
      onFulfilledPatch = sinon.spy()

      axios.delete('/vessels/1.json?auth=999').then(onFulfilledDelete)
      axios.delete('users/333/vessels.json?auth=999').then(onFulfilledPatch)

      moxios.stubRequest('/vessels/1.json?auth=999', {
        status: 200,
        response: 'vessel deleted'
      })

      moxios.stubRequest('users/333/vessels.json?auth=999', {
        status: 200,
        response: 'vessel ref in user patched'
      })
    })

    it('calls API and deletes the specified vessel', async() => {
      await actions.deleteVessel(context, vesselData.id)
      equal(onFulfilledDelete.getCall(0).args[0].data, 'vessel deleted')
    })

    it('calls API and patches the user removing the reference to specified vessel', async() => {
      await actions.deleteVessel(context, vesselData.id)
      equal(onFulfilledPatch.getCall(0).args[0].data, 'vessel ref in user patched')
    })

    it('calls commit with DELETE_VESSEL and the vesselId', async() => {
      await actions.deleteVessel(context, vesselData.id)
      expect(context.commit).toHaveBeenCalledWith('DELETE_VESSEL', vesselData.id)
    })
  })
})
