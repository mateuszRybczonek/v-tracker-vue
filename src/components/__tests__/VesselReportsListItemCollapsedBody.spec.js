import { mount, createLocalVue } from 'vue-test-utils'
import VesselReportsListItemCollapsedBody from '@/components/VesselReportsListItemCollapsedBody.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import IconTrash from '@/components/Icons/IconTrash.vue'
import Vuex from 'vuex'

const deleteReportSpy = jest.fn()

describe('VesselReportsListItemCollapsedBody.vue', () => {
  const setup = () => {
    const actions = {
      deleteReport: deleteReportSpy
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      actions
    })

    const wrapper = mount(VesselReportsListItemCollapsedBody, {
      localVue,
      store,
      propsData: {
        lat: '12° 20.3\' N',
        lng: '012° 20.4\' E',
        reportId: '1',
        vesselId: '2'
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with latitude', () => {
      expect(wrapper.find('[data-test-report-item-collapsed-body]').text()).toContain('Latitude: 12° 20.3\' N')
    })

    test('with longitude', () => {
      expect(wrapper.find('[data-test-report-item-collapsed-body]').text()).toContain('Longitude: 012° 20.4\' E')
    })

    test('with BaseIcon', () => {
      expect(wrapper.findAll(BaseIcon)).toHaveLength(1)
    })

    test('with IconTrash', () => {
      expect(wrapper.findAll(IconTrash)).toHaveLength(1)
    })

    test('with delete icon', () => {
      expect(wrapper.findAll('[data-test-report-item-collapsed-body-delete-icon]')).toHaveLength(1)
    })
  })

  it('should call deleteReport method when delete button is clicked', () => {
    const { wrapper } = setup()

    wrapper.find('[data-test-report-item-collapsed-body-delete-icon]').trigger('click')
    expect(deleteReportSpy).toHaveBeenCalled()
  })
})
