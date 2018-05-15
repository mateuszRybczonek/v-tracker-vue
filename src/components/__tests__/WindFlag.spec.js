import { mount } from 'vue-test-utils'
import WindFlag from '@/components/WindFlag.vue'

Object.defineProperty(document, 'getElementById', {
  value: jest.fn().mockReturnValue({
    style: {
      transform: ''
    }
  }
  ),
})

describe('WindFlag.vue', () => {
  const wrapper = mount(WindFlag, {
    propsData: {
      speed: 2,
      direction: 300
    }
  })

  it('renders wind flag element', () => {
    expect(wrapper.findAll('[data-test-wind-flag]')).toHaveLength(1)
  })

  it('renders icon element', () => {
    expect(wrapper.findAll('[data-test-wind-flag-icon]')).toHaveLength(1)
  })

  describe('Computed properties', () => {
    it('border returns proper css class', () => {
      wrapper.setProps({ withBorder: false })
      expect(wrapper.vm.border).toEqual('')

      wrapper.setProps({ withBorder: true })
      expect(wrapper.vm.border).toEqual('with-border')
    })

    it('colorClass returns proper css class when speed < 25 kn', () => {
      wrapper.setProps({ speed: 24.9 })
      expect(wrapper.vm.colorClass).toEqual('')
    })

    it('colorClass returns proper css class when height < 40 kn', () => {
      wrapper.setProps({ speed: 39.9 })
      expect(wrapper.vm.colorClass).toEqual('amber')
    })

    it('colorClass returns proper css class when height > 40', () => {
      wrapper.setProps({ speed: 40 })
      expect(wrapper.vm.colorClass).toEqual('red')
    })

    it('windDirectionFrom returns proper value', () => {
      expect(wrapper.vm.windDirectionFrom).toEqual(120)
    })

    it('classes returns proper value', () => {
      wrapper.setProps({ colorClass: 'red', border: 'with-border' })
      expect(wrapper.vm.classes).toEqual('red with-border')
    })

    it('iconClasses returns proper value', () => {
      wrapper.setProps({ iconSpeed: 40 })
      expect(wrapper.vm.iconClasses).toEqual('icon--40kn')
    })

    it('iconSpeed returns proper value when speed < 5 kn', () => {
      wrapper.setProps({ speed: 4.9 })
      expect(wrapper.vm.iconSpeed).toEqual(5)
    })

    it('iconSpeed returns proper value when speed < 5 kn', () => {
      wrapper.setProps({ speed: 45 })
      expect(wrapper.vm.iconSpeed).toEqual(45)
    })
  })

  it('setFlag method updates the style of the arrow', () => {
    wrapper.vm.setFlag()
    expect(document.getElementById('weather-flag').style.transform).toEqual('rotate(120deg)')
  })
})
