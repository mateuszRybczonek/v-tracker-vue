import { shallow } from 'vue-test-utils'
import ButtonSmall from '@/components/ButtonSmall'

describe('ButtonSmall.vue', () => {
  const onClick = jest.fn()

  const wrapper = shallow(ButtonSmall, {
    propsData: {
      onClick
    },

    slots: {
      default: '<div data-test-fake-slot></div>'
    },
  })

  it('renders correct content', () => {
    expect(wrapper.findAll('[data-test-button-small]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test-fake-slot]')).toHaveLength(1)
  })

  it('should call onClick method when button is clicked', () => {
    wrapper.find('[data-test-button-small]').trigger('click')
    expect(wrapper.vm.onClick).toBeCalled()
  })
})
