import { mount, createLocalVue } from 'vue-test-utils'
import VesselsPage from '@/pages/VesselsPage.vue'
import VesselsList from '@/components/VesselsList.vue'
import Vuex from 'vuex'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

const fetchVesselsSpy = jest.fn()

describe('VesselsPage.vue', () => {
  const setup = () => {
    const actions = {
      fetchVessels: fetchVesselsSpy
    }

    const getters = {
      vessels: jest.fn(),
      userId: jest.fn()
    }

    getters.vessels.mockReturnValue([firstVessel, secondVessel])
    getters.userId.mockReturnValue(1)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      actions,
      getters
    })

    const wrapper = mount(VesselsPage, {
      localVue,
      store,
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with proper header', () => {
      expect(wrapper.find('[data-test-vessels-header]').text()).toEqual('Vessels')
    })

    test('with VesselsList component', () => {
      expect(wrapper.findAll(VesselsList)).toHaveLength(1)
      expect(wrapper.find(VesselsList).props().vessels).toEqual([firstVessel, secondVessel])
    })
  })

  test('created hook fetches vessels', () => {
    const { wrapper } = setup()
    expect(fetchVesselsSpy.mock.calls[0][1]).toEqual(1)
  })
})
