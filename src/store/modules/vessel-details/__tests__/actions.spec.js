import actions from '@/store/modules/vessel-details/actions'

describe('vessel-details actions', () => {
  test('toggleSidebar calls commit with SIDEBAR_VISIBLE', async() => {
    const context = {
      commit: jest.fn()
    }

    await actions.toggleSidebar(context)
    expect(context.commit).toHaveBeenCalledWith('SIDEBAR_VISIBLE')
  })

  test('selectVesselDetailsComponent calls commit with SELECTED_VESSEL_DETAILS_COMPONENT and componentName', async() => {
    const context = {
      commit: jest.fn()
    }

    const componentName = 'Reports'

    await actions.selectVesselDetailsComponent(context, componentName)
    expect(context.commit).toHaveBeenCalledWith('SELECTED_VESSEL_DETAILS_COMPONENT', componentName)
  })
})
