import { mount } from 'vue-test-utils'
import SeaFlag from '@/components/SeaFlag.vue'
import IconWave from '@/components/Icons/IconWave.vue'
import IconArrow from '@/components/Icons/iconArrow.vue'

Object.defineProperty(document, 'getElementById', {
  value: jest.fn().mockReturnValue({
    style: {
      transform: ''
    }
  }
  ),
})

describe('SeaFlag.vue', () => {
  const wrapper = mount(SeaFlag, {
    propsData: {
      height: 2,
      direction: 300
    }
  })

  it('renders IconArrow component', () => {
    expect(wrapper.findAll(IconArrow)).toHaveLength(1)
  })

  it('renders IconWave component', () => {
    expect(wrapper.findAll(IconWave)).toHaveLength(1)
  })

  describe('Computed properties', () => {
    it('border returns proper css class', () => {
      wrapper.setProps({ withBorder: false })
      expect(wrapper.vm.border).toEqual('')

      wrapper.setProps({ withBorder: true })
      expect(wrapper.vm.border).toEqual('with-border')
    })

    it('colorClass returns proper css class when height < 3', () => {
      wrapper.setProps({ height: 2.9 })
      expect(wrapper.vm.colorClass).toEqual('')
    })

    it('colorClass returns proper css class when height < 6', () => {
      wrapper.setProps({ height: 5.9 })
      expect(wrapper.vm.colorClass).toEqual('amber')
    })

    it('colorClass returns proper css class when height > 6', () => {
      wrapper.setProps({ height: 6.1 })
      expect(wrapper.vm.colorClass).toEqual('red')
    })

    it('strokeColor returns proper css class when height < 3', () => {
      wrapper.setProps({ height: 2.9 })
      expect(wrapper.vm.strokeColor).toEqual('#4d6d9b')
    })

    it('strokeColor returns proper css class when height < 6', () => {
      wrapper.setProps({ height: 5.9 })
      expect(wrapper.vm.strokeColor).toEqual('#ffc346')
    })

    it('strokeColor returns proper css class when height > 6', () => {
      wrapper.setProps({ height: 6.1 })
      expect(wrapper.vm.strokeColor).toEqual('#F37272')
    })

    it('swellDirectionFrom returns proper value', () => {
      expect(wrapper.vm.swellDirectionFrom).toEqual(120)
    })

    it('classes returns proper value', () => {
      wrapper.setProps({ colorClass: 'red', border: 'with-border' })
      expect(wrapper.vm.classes).toEqual('red with-border')
    })
  })

  it('setFlag method updates the style of the arrow', () => {
    wrapper.vm.setFlag()
    expect(document.getElementById('arrow').style.transform).toEqual('rotate(120deg)')
  })
})
