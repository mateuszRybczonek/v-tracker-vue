import { mount } from 'vue-test-utils'
import MainMenuCard from '@/components/MainMenuCard'
import IconShip from '@/components/Icons/Animated/IconAnimatedShip.vue'

describe('MainMenuCard.vue', () => {
  const wrapper = mount(MainMenuCard, {
    propsData: {
      destination: 'final-frontier',
      icon: 'IconShip',
      label: 'UUS Enterprise'
    },
    components: {
      IconShip
    },
  })

  it('renders header', () => {
    expect(wrapper.findAll('[data-test-main-menu-card]')).toHaveLength(1)
  })

  it('renders proper icon component', () => { expect(wrapper.findAll(IconShip)).toHaveLength(1) })
  it('renders proper label', () => {
    expect(wrapper.find('[data-test-main-menu-card-label]').text()).toContain('UUS Enterprise')
  })
})
