import { shallow } from 'vue-test-utils'
import ButtonPositive from '@/components/ButtonPositive'

describe('ButtonPositive.vue', () => {
  const onClick = jest.fn()

  const wrapper = shallow(ButtonPositive, {
    propsData: {
      onClick,
      inProgress: false
    },

    slots: {
      default: '<div data-test-fake-slot></div>'
    },
  })

  it('renders correct content when not inProgress', () => {
    expect(wrapper.findAll('[data-test-button-positive]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test-fake-slot]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test-progress-spinner]')).toHaveLength(0)
  })

  it('renders correct content when inProgress', () => {
    wrapper.setData({ inProgress: true })

    expect(wrapper.findAll('[data-test-button-positive]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test-fake-slot]')).toHaveLength(0)
    expect(wrapper.findAll('[data-test-progress-spinner]')).toHaveLength(1)
  })

  it('should call onClick method when button is clicked', () => {
    wrapper.find('[data-test-button-positive]').trigger('click')
    expect(wrapper.vm.onClick).toBeCalled()
  })
})
