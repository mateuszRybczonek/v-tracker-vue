import { shallow } from 'vue-test-utils'
import FormWrapper from '@/components/FormWrapper'

describe('FormWrapper.vue', () => {
  const wrapper = shallow(FormWrapper, {
    propsData: {
      title: 'Form Title',
      size: 'big',
      color: 'red'
    },

    slots: {
      content: '<div data-test-fake-slot></div>'
    }
  })

  it('renders FormWrapper component', () => {
    expect(wrapper.findAll('[data-test-form-wrapper]')).toHaveLength(1)
  })

  it('adds proper classes to FormWrapper component', () => {
    expect(wrapper.find('[data-test-form-wrapper]').classes()).toContain('big')
    expect(wrapper.find('[data-test-form-wrapper]').classes()).toContain('red')
  })

  it('renders proper header text', () => {
    expect(wrapper.find('[data-test-form-wrapper-header]').text()).toEqual('Form Title')
  })

  it('renders passed slot content', () => {
    expect(wrapper.findAll('[data-test-fake-slot]')).toHaveLength(1)
  })
})
