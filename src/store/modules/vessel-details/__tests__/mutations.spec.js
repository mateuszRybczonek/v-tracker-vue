import mutations from '@/store/modules/vessel-details/mutations'

describe('vessel-details mutations', () => {
  test('SIDEBAR_VISIBLE toggles state.sidebarVisible', () => {
    const state = { sidebarVisible: true }

    mutations.SIDEBAR_VISIBLE(state)
    expect(state.sidebarVisible).toBe(false)

    mutations.SIDEBAR_VISIBLE(state)
    expect(state.sidebarVisible).toBe(true)
  })

  test('SELECTED_VESSEL_DETAILS_COMPONENT sets selected component to given componentName', () => {
    const state = { selectedVesselDetailsComponent: 'Dashboard' }
    const componentName = 'Reports'

    const expectedResult = componentName

    mutations.SELECTED_VESSEL_DETAILS_COMPONENT(state, componentName)
    expect(state.selectedVesselDetailsComponent).toEqual(componentName)
  })
})
