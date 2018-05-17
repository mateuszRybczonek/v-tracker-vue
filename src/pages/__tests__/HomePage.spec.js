import { shallow } from 'vue-test-utils'
import HomePage from '@/pages/HomePage.vue'
import HomePageContent from '@/components/HomePageContent.vue'

describe('HomePage.vue', () => {
  const setup = () => {
    const wrapper = shallow(HomePage)
    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with HomePageContent component', () => {
      expect(wrapper.findAll(HomePageContent)).toHaveLength(1)
    })
  })
})
