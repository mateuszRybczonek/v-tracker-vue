import { shallow, createLocalVue } from 'vue-test-utils'
import VesselsPage from '@/pages/VesselsPage.vue'
import VesselsList from '@/components/VesselsList.vue'
import Vuex from 'vuex'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'
import { taskSpy } from '@/../test/stubs/task'

const fetchVesselsTaskSpy = taskSpy()

describe('VesselsPage.vue', () => {
  const setup = () => {
    const getters = {
      vessels: jest.fn(),
      userId: jest.fn()
    }

    getters.vessels.mockReturnValue([firstVessel, secondVessel])
    getters.userId.mockReturnValue(1)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      getters
    })

    const mocks = {
      fetchVesselsTask: fetchVesselsTaskSpy
    }

    const wrapper = shallow(VesselsPage, {
      localVue,
      store,
      mocks
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
    expect(fetchVesselsTaskSpy.run).toHaveBeenCalled()
  })
})
