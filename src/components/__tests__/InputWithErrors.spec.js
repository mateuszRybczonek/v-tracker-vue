import { shallow } from 'vue-test-utils'
import InputWithErrors from '@/components/InputWithErrors'

describe('InputWithErrors.vue', () => {
  const wrapper = shallow(InputWithErrors, {
    propsData: {
      unit: 'cbm'
    },
    slots: {
      input: '<div data-test-input-slot></div>',
      errors: '<div data-test-errors-slot></div>'
    }
  })

  it('renders passed input slot content', () => {
    expect(wrapper.findAll('[data-test-input-slot]')).toHaveLength(1)
  })

  it('renders passed errors slot content', () => {
    expect(wrapper.findAll('[data-test-errors-slot]')).toHaveLength(1)
  })

  it('adds proper class to input if unit is passed', () => {
    expect(wrapper.find('[data-test-input-with-errors-input]').classes()).toContain('input--with-unit')
  })

  it('renders unit if passed', () => {
    expect(wrapper.find('[data-test-input-with-errors-input]').text()).toContain('cbm')
  })
})
