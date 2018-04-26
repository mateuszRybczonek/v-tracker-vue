import { shallow } from 'vue-test-utils'
import BaseList from '@/components/BaseList'

describe('BaseList.vue', () => {
  const items = [
    { value: '1', title: 'first' },
    { value: '2', title: 'second' }
  ]

  const wrapper = shallow(BaseList, {
    propsData: {
      items
    },
  })

  it('renders correct number of items', () => {
    expect(wrapper.findAll('[data-test-base-list-item]')).toHaveLength(2)
  })

  it('renders correct content in items', () => {
    const listItems = wrapper.findAll('li')

    listItems.wrappers.forEach((wrapper, i) => {
      expect(wrapper.find('[data-test-base-list-item-title]').text()).toEqual(items[i].title)
      expect(wrapper.find('[data-test-base-list-item-value]').text()).toEqual(items[i].value)
    })
  })
})
