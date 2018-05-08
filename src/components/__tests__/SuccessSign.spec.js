import { shallow } from 'vue-test-utils'
import SuccessSign from '@/components/SuccessSign.vue'

describe('SuccessSign.vue', () => {
  const wrapper = shallow(SuccessSign, {
    propsData: {
      title: 'Great success!',
      description: 'You won, you won!'
    }
  })

  it('renders proper title', () => {
    expect(wrapper.find('[data-test-success-sign]').text()).toContain('Great success!')
  })

  it('renders proper description', () => {
    expect(wrapper.find('[data-test-success-sign]').text()).toContain('You won, you won!')
  })
})
