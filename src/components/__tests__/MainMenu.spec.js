import { mount } from 'vue-test-utils'
import MainMenu from '@/components/MainMenu'

describe('MainMenu.vue', () => {
  const wrapper = mount(MainMenu)

  it('renders header', () => {
    expect(wrapper.findAll('[data-test-main-menu-header]')).toHaveLength(1)
  })

  it('renders proper numnber of cards', () => {
    expect(wrapper.findAll('[data-test-main-menu-cards]')).toHaveLength(2)
  })
})
