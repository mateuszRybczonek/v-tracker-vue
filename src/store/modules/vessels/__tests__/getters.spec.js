import getters from '@/store/modules/vessels/getters'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

describe('vessels getters', () => {
  test('vessels returns state.vessels', () => {
    const vessels = [ firstVessel, secondVessel ]

    const state = { vessels }

    const result = getters.vessels(state)

    expect(result).toEqual(vessels)
  })
})
