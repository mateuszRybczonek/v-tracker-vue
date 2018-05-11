import { mount, createLocalVue } from 'vue-test-utils'
import VesselReportsListItemDetails from '@/components/VesselReportsListItemDetails.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import IconSave from '@/components/Icons/IconSave.vue'
import IconPencil from '@/components/Icons/IconPencil.vue'
import {
  formatLatForPersistanceLayer,
  formatLngForPersistanceLayer,
  decimalToDMS,
  stripSymbols
} from '@/utils/coordinates-utils'
import { report } from '@/../test/stubs/report'
import Vuex from 'vuex'

const updateReportSpy = jest.fn()

describe('VesselReportsListItemDetails.vue', () => {
  const setup = () => {
    const actions = {
      updateReport: updateReportSpy
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      actions
    })

    const wrapper = mount(VesselReportsListItemDetails, {
      localVue,
      store,
      propsData: {
        sectionData: {
          color: 'red',
          items: [
            {
              key: 'lat',
              title: 'Latitude',
              value: '12° 00.0\' N'
            },  {
              key: 'lng',
              title: 'Longitude',
              value: '011° 00.0\' W'
            }
          ],
          sectionTitle: 'Position'
        },

        color: 'black',
        report
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    describe('when isEditing is false', () => {
      const { wrapper } = setup()
      describe('header', () => {
        const header = wrapper.find('[data-test-report-item-details-header]')

        test('with proper content', () => {
          expect(header.text()).toContain('Position')
        })

        test('with proper class', () => {
          expect(header.classes()).toContain('black')
        })
      })

      test('without save button', () => {
        expect(wrapper.findAll('[data-test-report-item-details-save-button]')).toHaveLength(0)
      })

      test('with edit button', () => {
        expect(wrapper.findAll('[data-test-report-item-details-edit-button]')).toHaveLength(1)
      })

      test('with IconPencil component', () => {
        expect(wrapper.findAll(IconPencil)).toHaveLength(1)
      })

      test('with proper number of list items', () => {
        expect(wrapper.findAll('[data-test-report-item-details-list-item]')).toHaveLength(2)
      })

      describe('list item', () => {
        test('with proper title', () => {
          expect(wrapper.find('[data-test-report-item-details-list-item]').text()).toContain('Latitude')
        })

        test('without input', () => {
          expect(wrapper.findAll('[data-test-report-item-details-list-item-input]')).toHaveLength(0)
        })

        test('with proper value', () => {
          expect(wrapper.find('[data-test-report-item-details-list-item]').text()).toContain('12° 00.0\' N')
        })
      })
    })

    describe('when isEditing is true', () => {
      const { wrapper } = setup()
      wrapper.setData({ isEditing: true })

      describe('header', () => {
        const header = wrapper.find('[data-test-report-item-details-header]')

        test('with proper content', () => {
          expect(header.text()).toContain('Position')
        })

        test('with proper class', () => {
          expect(header.classes()).toContain('black')
        })
      })

      test('with save button', () => {
        expect(wrapper.findAll('[data-test-report-item-details-save-button]')).toHaveLength(1)
      })

      test('without edit button', () => {
        expect(wrapper.findAll('[data-test-report-item-details-edit-button]')).toHaveLength(0)
      })

      test('with IconSave component', () => {
        expect(wrapper.findAll(IconSave)).toHaveLength(1)
      })

      test('with proper number of list items', () => {
        expect(wrapper.findAll('[data-test-report-item-details-list-item]')).toHaveLength(2)
      })

      describe('list item', () => {
        test('with proper title', () => {
          expect(wrapper.find('[data-test-report-item-details-list-item]').text()).toContain('Latitude')
        })

        test('with input', () => {
          expect(wrapper.findAll('[data-test-report-item-details-list-item-input]')).toHaveLength(2)
        })

        test('without value', () => {
          expect(wrapper.findAll('[data-test-report-item-details-list-item-value]')).toHaveLength(0)
        })
      })
    })
  })

  describe('Methods', () => {
    it('editReportSection', () => {
      const { wrapper } = setup()
      const expectedChangeset = {
        course: 90,
        createdAt: '2018-03-19T15:38:34.255Z',
        createdBy: 'PUBx21545ZOytG9KcWyaPZjSQyK2',
        doRob: 100,
        foRob: 90,
        fwRob: 80,
        id: '-L7yuO7nLZtMgEe8qth6',
        lat: '12 20.3 N',
        lng: '12 20.4 N',
        pitch: 1,
        pob: 67,
        reportTime: '2018-02-10',
        roll: 0.3,
        seaState: 2,
        spd: 12,
        swellDir: 100,
        swellHeight: 4,
        updatedAt: '',
        vessel: 'vessel-1',
        windDir: 100,
        windSpd: 40
      }

      wrapper.vm.editReportSection()
      expect(wrapper.vm.isEditing).toEqual(true)
      expect(wrapper.vm.reportChangeset).toEqual(expectedChangeset)
    })

    describe('updateReportAction ', async() => {
      const { wrapper } = setup()

      const editedLat = decimalToDMS(report.lat)
      const editedLng = decimalToDMS(report.lng)
      let reportWithEditedCoordinates = { ...report }
      reportWithEditedCoordinates.lat = editedLat
      reportWithEditedCoordinates.lng = editedLng

      await wrapper.vm.updateReportAction(reportWithEditedCoordinates)
      it('sets isEditing to false', () => {
        expect(wrapper.vm.isEditing).toEqual(false)
      })

      it('calls updateReport action', () => {
        expect(updateReportSpy).toHaveBeenCalled()
      })
    })
  })
})
