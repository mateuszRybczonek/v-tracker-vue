import getters from '@/store/modules/vessel-details/getters'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

describe('vessel-details getters', () => {
  test('sidebarVisible returns state.sidebarVisible', () => {
    const state = { sidebarVisible: true }
    const result = getters.sidebarVisible(state)
    expect(result).toEqual(true)
  })

  test('selectedVesselDetailsComponent returns state.selectedVesselDetailsComponent', () => {
    const state = { selectedVesselDetailsComponent: 'Dashboard' }
    const result = getters.selectedVesselDetailsComponent(state)
    expect(result).toEqual('Dashboard')
  })
})
