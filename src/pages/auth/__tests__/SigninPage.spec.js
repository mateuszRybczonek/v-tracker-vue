import { mount, createLocalVue } from 'vue-test-utils'
import SigninPage from '@/pages/auth/SigninPage.vue'
import FormWrapper from '@/components/FormWrapper.vue'
import IconEmail from '@/components/Icons/IconEmail.vue'
import IconLock from '@/components/Icons/IconLock.vue'
import Vuex from 'vuex'

const loginSpy = jest.fn()
const clearAuthErrorSpy = jest.fn()
const routerPushSpy = jest.fn()
const routerResolveSpy = jest.fn().mockReturnValue({
  location: {
    path: '/fake-path'
  }
})

describe('SigninPage.vue', () => {
  const setup = (isFormInvalid = false) => {
    const getters = {
      isAuthError: jest.fn()
    }

    getters.isAuthError.mockReturnValue(false)

    const actions = {
      login: loginSpy,
      clearAuthError: clearAuthErrorSpy
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {},
      actions,
      getters
    })

    const routerMock = {
      push: routerPushSpy,
      resolve: routerResolveSpy,
      options: {
        linkActiveClass: {}
      },
    }

    const routeMock = {
      path: '/fake-path'
    }

    const mocks = {
      $v: {
        $invalid: isFormInvalid,
        email: {
          $invalid: false
        },
        password: {
          $invalid: false
        }
      }
    }

    const wrapper = mount(SigninPage, {
      localVue,
      store,
      mocks,
      beforeCreate: function () {
        this._router = routerMock
        this._route = routeMock
      }
    })

    return { wrapper }
  }

  describe('it renders', () => {
    const { wrapper } = setup()

    test('with FormWrapper component', () => {
      var router = wrapper.vm.$router
      var ref = router.resolve()
      var location = ref.location

      expect(wrapper.findAll(FormWrapper)).toHaveLength(1)
      const formWrapper = wrapper.find(FormWrapper)
      expect(formWrapper.props().title).toEqual('Login')
      expect(formWrapper.props().size).toEqual('narrow')
    })

    test('with email icon', () => {
      expect(wrapper.findAll(IconEmail)).toHaveLength(1)
    })

    test('with email input', () => {
      expect(wrapper.findAll('[data-test-signin-form-email-input]')).toHaveLength(1)
    })

    test('with password icon', () => {
      expect(wrapper.findAll(IconLock)).toHaveLength(1)
    })

    test('with password input', () => {
      expect(wrapper.findAll('[data-test-signin-form-password-input]')).toHaveLength(1)
    })

    test('with signin button', () => {
      expect(wrapper.findAll('[data-test-signin-form-submit-button]')).toHaveLength(1)
    })

    test('with go to sign up button', () => {
      expect(wrapper.findAll('[data-test-signin-form-go-to-sign-up-button]')).toHaveLength(1)
    })
  })

  describe('when clicked on signin button with valid form', () => {
    const { wrapper } = setup()
    const expectedFormData = {
      email: 'qqq@wp.pl',
      password: '123456789'
    }

    wrapper.setData(expectedFormData)

    wrapper.find('[data-test-signin-form-submit-button]').trigger('click')

    it('calls login method with proper argument', () => {
      expect(loginSpy.mock.calls[0][1]).toEqual(expectedFormData)
    })

    it('sets isSubmitted to true', () => {
      expect(wrapper.vm.isSubmitted).toEqual(true)
    })
  })
})
