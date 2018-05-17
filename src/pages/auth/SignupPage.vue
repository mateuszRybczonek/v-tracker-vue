<template>
  <div class="signup">
    <FormWrapper title="Register new account" size="narrow">
      <form slot="content" @submit.prevent="onSubmit">
        <div class="input__wrapper">
          <BaseIcon
            width='50'
            height='50'
            viewBox='0 0 50 50'>
            <IconEmail></IconEmail>
          </BaseIcon>
          <input
            data-test-signup-form-email-input
            class="input--with-error"
            :class="{ invalid: validationsEnabled && $v.email.$invalid }"
            v-model="email"
            placeholder="Email"
            @blur="$v.email.$touch()">
        </div>
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.email.required">This field must not be empty.</span>
          <span class="validation-error" v-if="validationsEnabled && !$v.email.email">Please provide a valid email address.</span>
          <!--<span class="validation-error" v-if="validationsEnabled && !$v.email.unique">The email you provided already exist.</span>-->
        </div>

        <div class="input__wrapper">
          <BaseIcon
            width='50'
            height='50'
            viewBox='0 0 50 50'>
            <IconLock></IconLock>
          </BaseIcon>
          <input
            data-test-signup-form-password-input
            class="input__password input--with-error"
            :class="{ invalid: validationsEnabled && $v.password.$invalid }"
            type="password"
            v-model="password"
            placeholder="Password"
            @input="$v.password.$touch()">
        </div>
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.password.required">This field must not be empty.</span>
          <span class="validation-error" v-if="validationsEnabled && !$v.password.minLength">The minimum length is {{ $v.password.$params.minLength.min }}.</span>
        </div>

        <div class="input__wrapper">
          <BaseIcon
            width='50'
            height='50'
            viewBox='0 0 50 50'>
            <IconLock></IconLock>
          </BaseIcon>
          <input
            data-test-signup-form-password-confirmation-input
            class="input__password input--with-error"
            :class="{ invalid: validationsEnabled && $v.confirmPassword.$invalid }"
            type="password"
            v-model="confirmPassword"
            placeholder="Password confirmation"
            @input="$v.confirmPassword.$touch()">
        </div>
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.confirmPassword.sameAs">
            The confirmation password and password must be the same.
          </span>
        </div>
        <div class="actions">
          <ButtonPositive
            data-test-signup-form-submit-button
            :on-click="onSubmit"
            :inProgress="isSubmitted"
          >
            Register
          </ButtonPositive>
        </div>
      </form>
    </FormWrapper>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'
  import router from '@/router/index'

  import FormWrapper from '../../components/FormWrapper.vue'
  import ButtonPositive from '../../components/ButtonPositive.vue'
  import BaseIcon from '../../components/BaseIcon.vue'
  import IconEmail from '../../components/Icons/IconEmail.vue'
  import IconLock from '../../components/Icons/IconLock.vue'

  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        validationsEnabled: false,
        isSubmitted: false
      }
    },

    validations: {
      email: {
        required,
        email
        //        unique: value => {
        //          if (value === '') return true
        //          return globalAxios.get(`/users.json?orderBy="email"&equalTo="${value}"`)
        //            .then(result => {
        //              return Object.keys(result.data).length === 0
        //            })
        //        }
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      }
    },

    methods: {
      ...mapActions([
        'signup'
      ]),

      async onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        }

        this.validationsEnabled = true
        this.isSubmitted = false

        if(!this.$v.$invalid) {
          try {
            await this.signup(formData)
            router.push('/dashboard')
            this.isSubmitted = true
          } catch(error) {
            throw(error)
          }
        } else return false
      }
    },

    components: {
      ButtonPositive,
      FormWrapper,
      BaseIcon,
      IconEmail,
      IconLock
    }
  }
</script>

<style scoped lang="scss">
  .signup {
    @include main-page-background();

    form {
      padding: 30px;

      .content {
        &__error {
          min-height: 30px;

          &__validation-error {
            color: $color-tomato;
            font-size: 12px;

            &__auth-error {
              color: $color-tomato;
              font-size: 12px;
              display: flex;
              justify-content: center;
            }
          }
        }
      }

      .input__wrapper {
        display: flex;
        background-color: $color-whitey-darker;
        color: $color-dark-grey;
        border-radius: 4px;
        border: none;
        opacity: 0.5;

        svg {
          transform: translate(15px, 12px);
        }
      }

      .input--with-error {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 50px;
        background-color: $color-whitey-darker;
        color: $color-black;
        border-radius: 4px;
        border: none;
        font-size: 17px;
        padding: 10px;

        &::placeholder {
          color: $color-black
        }

        &:focus {
          outline: none;
        }
      }

      .actions {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
