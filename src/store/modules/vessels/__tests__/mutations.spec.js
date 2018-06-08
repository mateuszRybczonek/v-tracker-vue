import mutations from '@/store/modules/vessels/mutations'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

describe('vessels mutations', () => {
  test('DELETE_VESSEL removes vessel from vessels', () => {
    const vessels = [ firstVessel, secondVessel ]
    const vesselId = vessels[0].id

    const state = {
      vessels
    }

    const expectedResult = [ secondVessel ]

    mutations.DELETE_VESSEL(state, vesselId)
    expect(state.vessels).toEqual(expectedResult)
  })
})
