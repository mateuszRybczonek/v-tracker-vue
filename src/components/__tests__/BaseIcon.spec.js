import { shallow } from 'vue-test-utils'
import BaseIcon from '@/components/BaseIcon'

describe('BaseIcon.vue', () => {
  const wrapper = shallow(BaseIcon, {
    slots: {
      default: '<div data-test-fake-slot></div>'
    }
  })

  it('renders svg and g elements', () => {
    expect(wrapper.findAll('[data-test-svg]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test-graphics]')).toHaveLength(1)
  })

  it('renders passed slot content', () => {
    expect(wrapper.findAll('[data-test-fake-slot]')).toHaveLength(1)
  })

  it('sets default props correctly', () => {
    expect(wrapper.find('[data-test-svg]').attributes().width).toEqual("76")
    expect(wrapper.find('[data-test-svg]').attributes().height).toEqual("76")
    expect(wrapper.find('[data-test-svg]').attributes().viewBox).toEqual("0 0 76 76")

    expect(wrapper.find('[data-test-graphics]').attributes().fill).toEqual("currentColor")
    expect(wrapper.find('[data-test-graphics]').attributes().stroke).toEqual("none")
  })
})
