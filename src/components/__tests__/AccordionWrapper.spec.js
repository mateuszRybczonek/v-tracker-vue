import { mount } from 'vue-test-utils'
import AccordionWrapper from '@/components/AccordionWrapper.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import IconArrowDown from '@/components/Icons/IconArrowDown.vue'

describe('AccordionWrapper.vue', () => {
  const setup = (showOnInit = true, collapsedContent = true) => {
    const wrapper = mount(AccordionWrapper, {
      propsData: {
        showOnInit,
        collapsedContent
      },

      slots: {
        header: '<span data-test-fake-slot-header></span>',
        body: '<span data-test-fake-slot-body></span>',
        footer: '<span data-test-fake-slot-footer></span>',
        'collapsed-content': '<span data-test-fake-slot-collapsed-content></span>'
      }
    })

    return { wrapper }
  }
  describe('it renders when collapsedContent is false', () => {
    const { wrapper } = setup()

    it('with passed header slot content', () => {
      expect(wrapper.findAll('[data-test-fake-slot-header]')).toHaveLength(1)
    })

    it('with IconArrowDown component', () => {
      expect(wrapper.findAll(IconArrowDown)).toHaveLength(1)
    })

    describe('BaseIcon component', () => {
      it('renders components', () => {
        expect(wrapper.findAll(BaseIcon)).toHaveLength(1)
      })

      it('applies proper class', () => {
        expect(wrapper.find(BaseIcon).classes()).toContain('rotate')
      })
    })

    it('with IconArrowDown component', () => {
      expect(wrapper.findAll(IconArrowDown)).toHaveLength(1)
    })

    it('with passed body slot content', () => {
      expect(wrapper.findAll('[data-test-fake-slot-body]')).toHaveLength(1)
    })

    it('with passed footer slot content', () => {
      expect(wrapper.findAll('[data-test-fake-slot-footer]')).toHaveLength(1)
    })

    it('with passed collapsed-content slot content', () => {
      expect(wrapper.findAll('[data-test-fake-slot-collapsed-content]')).toHaveLength(1)
    })
  })

  describe('Computed properties', () => {
    describe('showCollapsedContent', () => {
      it('returns proper value the show is true and collapsedContent is true', () => {
        const { wrapper } = setup()
        expect(wrapper.vm.showCollapsedContent).toEqual(false)
      })

      it('returns proper value the show is false and collapsedContent is false', () => {
        const { wrapper } = setup(false, false)
        expect(wrapper.vm.showCollapsedContent).toEqual(false)
      })

      it('returns proper value the show is false and collapsedContent is true', () => {
        const { wrapper } = setup(false, true)
        expect(wrapper.vm.showCollapsedContent).toEqual(true)
      })

      it('returns proper value the show is true and collapsedContent is false', () => {
        const { wrapper } = setup(true, false)
        expect(wrapper.vm.showCollapsedContent).toEqual(false)
      })
    })
  })

  describe('Methods', () => {
    it('toggle toggles show property', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.show).toEqual(true)
      wrapper.vm.toggle()
      expect(wrapper.vm.show).toEqual(false)
      wrapper.vm.toggle()
      expect(wrapper.vm.show).toEqual(true)
    })
  })
})
