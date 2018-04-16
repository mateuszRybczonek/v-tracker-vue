import { mount } from 'vue-test-utils'
import HomePageContent from '@/components/HomePageContent'

describe('HomePageContent.vue', () => {
  const wrapper = mount(HomePageContent, {
    propsData: {
      fetchingReports: false
    }
  })

  it('renders upper sub text', () => {
    expect(wrapper.findAll('[data-test-home-page-sub-text-upper]')).toHaveLength(1)
  })

  it('renders main text', () => {
    expect(wrapper.findAll('[data-test-home-page-main-text]')).toHaveLength(1)
  })

  it('renders lower sub text', () => {
    expect(wrapper.findAll('[data-test-home-page-sub-text-lower]')).toHaveLength(1)
  })

  it('renders button', () => {
    expect(wrapper.findAll('[data-test-home-page-button-link]')).toHaveLength(1)
  })
})
