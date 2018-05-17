import { mount, createLocalVue } from 'vue-test-utils'
import SignupPage from '@/pages/auth/SignupPage.vue'
import FormWrapper from '@/components/FormWrapper.vue'
import IconEmail from '@/components/Icons/IconEmail.vue'
import IconLock from '@/components/Icons/IconLock.vue'
import Vuex from 'vuex'

const signupSpy = jest.fn()

describe('SignupPage.vue', () => {
  const setup = (isFormInvalid = false) => {
    const actions = {
      signup: signupSpy,
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      actions
    })

    const mocks = {
      $v: {
        $invalid: isFormInvalid
      }
    }

    const wrapper = mount(SignupPage, {
      localVue,
      store,
      mocks
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with FormWrapper component', () => {
      expect(wrapper.findAll(FormWrapper)).toHaveLength(1)
      const formWrapper = wrapper.find(FormWrapper)
      expect(formWrapper.props().title).toEqual('Register new account')
      expect(formWrapper.props().size).toEqual('narrow')
    })

    test('with email icon', () => {
      expect(wrapper.findAll(IconEmail)).toHaveLength(1)
    })

    test('with email input', () => {
      expect(wrapper.findAll('[data-test-signup-form-email-input]')).toHaveLength(1)
    })

    test('with password icons', () => {
      expect(wrapper.findAll(IconLock)).toHaveLength(2)
    })

    test('with password input', () => {
      expect(wrapper.findAll('[data-test-signup-form-password-input]')).toHaveLength(1)
    })

    test('with password input', () => {
      expect(wrapper.findAll('[data-test-signup-form-password-confirmation-input]')).toHaveLength(1)
    })

    test('with signin button', () => {
      expect(wrapper.findAll('[data-test-signup-form-submit-button]')).toHaveLength(1)
    })
  })

  describe('when clicked on signup button with valid form', () => {
    const { wrapper } = setup()
    const expectedFormData = {
      email: 'qqq@wp.pl',
      password: '123456789',
      confirmPassword: '123456789'
    }

    wrapper.setData(expectedFormData)

    wrapper.find('[data-test-signup-form-submit-button]').trigger('click')

    it('calls login method with proper argument', () => {
      expect(signupSpy.mock.calls[0][1]).toEqual(expectedFormData)
    })

    it('sets isSubmitted to true', () => {
      expect(wrapper.vm.isSubmitted).toEqual(true)
    })
  })
})
