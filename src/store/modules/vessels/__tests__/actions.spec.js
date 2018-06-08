import axios from 'axios'
import moxios from 'moxios'
import actions from '@/store/modules/vessels/actions'
import { firstVessel } from '@/../test/stubs/vessel'

describe('vessels actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  describe('createNewVessel', () => {
    let context
    let vesselData
    let onFulfilledPost
    let onFulfilledPatch

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

      onFulfilledPost = jest.fn()
      onFulfilledPatch = jest.fn()

      axios.post('/vessels.json?auth=999').then(onFulfilledPost)
      axios.patch('users/333/vessels.json?auth=999').then(onFulfilledPatch)

      moxios.stubRequest('/vessels.json?auth=999', {
        status: 200,
        response: 'vessel added'
      })

      moxios.stubRequest('users/333/vessels.json?auth=999', {
        status: 200,
        response: 'vessel ref in user added'
      })
    })

    it('doesn\'t make a call when no idToken', async() => {
      let onFulfilledNoToken = jest.fn()
      axios.post('/vessels.json?auth=undefined').then(onFulfilledNoToken)

      context = {
        getters: {
          idToken: undefined
        }
      }

      await actions.createNewVessel(context, vesselData)
      expect(onFulfilledNoToken).notCalled
    })

    it('calls API and creates the vessel', async() => {
      await actions.createNewVessel(context, vesselData)
      expect(onFulfilledPost.mock.calls[0][0].data).toBe('vessel added')
    })

    it('calls API and patches the user adding a reference to the vessel', async() => {
      await actions.createNewVessel(context, vesselData)
      expect(onFulfilledPatch.mock.calls[0][0].data).toBe('vessel ref in user added')
    })
  })

  describe('editVessel', () => {
    let vesselData
    let onFulfilled
    let context

    beforeEach(() => {
      vesselData = { id: 1 }
    })

    it('doesn\'t make a call when no idToken', async() => {
      onFulfilled = jest.fn()
      axios.patch('/vessels/1.json?auth=undefined').then(onFulfilled)

      context = {
        getters: {
          idToken: undefined
        }
      }

      await actions.editVessel(context, vesselData)
      expect(onFulfilled).notCalled
    })

    it('calls API and gets a proper response when idToken is valid', async() => {
      onFulfilled = jest.fn()
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
      expect(onFulfilled.mock.calls[0][0].data).toBe(vesselData)
    })
  })

  describe('fetchVessels', () => {
    let context

    const responseJSON = {
      "-L2sqMuqy29K5adoAZdT": firstVessel
    }

    beforeEach(() => {
      moxios.stubRequest('/vessels.json?orderBy="owner"&equalTo="1"', {
        status: 200,
        response: responseJSON
      })

      context = {
        commit: jest.fn(),
      }
    })

    it('calls API and gets a proper response', async() => {
      const onFulfilled = jest.fn()
      axios.get('/vessels.json?orderBy="owner"&equalTo="1"').then(onFulfilled)

      await actions.fetchVessels(context, 1)
      expect(onFulfilled.mock.calls[0][0].data).toBe(responseJSON)
    })

    it('calls commit with SET_VESSELS and the fetched userVessels', async() => {
      await actions.fetchVessels(context, 1)
      expect(context.commit).toHaveBeenCalledWith('SET_VESSELS', [ firstVessel ])
    })
  })

  describe('deleteVessel', () => {
    let context
    let vesselData
    let onFulfilledDelete
    let onFulfilledPatch

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

      onFulfilledDelete = jest.fn()
      onFulfilledPatch = jest.fn()

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
      expect(onFulfilledDelete.mock.calls[0][0].data).toBe('vessel deleted')
    })

    it('calls API and patches the user removing the reference to specified vessel', async() => {
      await actions.deleteVessel(context, vesselData.id)
      expect(onFulfilledPatch.mock.calls[0][0].data).toBe('vessel ref in user patched')
    })

    it('calls commit with DELETE_VESSEL and the vesselId', async() => {
      await actions.deleteVessel(context, vesselData.id)
      expect(context.commit).toHaveBeenCalledWith('DELETE_VESSEL', vesselData.id)
    })
  })
})
