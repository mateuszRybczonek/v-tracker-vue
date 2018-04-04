<template>
  <div class="signin">
    <FormWrapper title="Login" size="narrow">
      <form slot="content" @submit.prevent="onSubmit">
        <div class="content__error">
          <span class="content__error__validation-error__auth-error" v-if="isAuthError">
            Invalid credentials
          </span>
        </div>
        <div class="input__wrapper">
          <BaseIcon
            width=50
            height=50
            viewBox='0 0 50 50'>
            <IconEmail></IconEmail>
          </BaseIcon>
          <input class="input--with-error" :class="{ invalid: validationsEnabled && $v.email.$invalid }"
            v-model="email"
            placeholder="Email"
            @input="clearAuthError()"
            @blur="$v.email.$touch()">
        </div>
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.email.required">This field must not be empty.</span>
          <span class="validation-error" v-else-if="validationsEnabled && !$v.email.email">Please provide a valid email address.</span>
        </div>
        <div class="input__wrapper">
          <BaseIcon
            width=50
            height=50
            viewBox='0 0 50 50'>
            <IconLock></IconLock>
          </BaseIcon>
          <input class="input--with-error" :class="{ invalid: validationsEnabled && $v.password.$invalid }"
            type="password"
            placeholder="Password"
            v-model="password"
            @input="$v.password.$touch()">
        </div>
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.password.required">This field must not be empty.</span>
        </div>
        <div class="actions">
          <ButtonPositive :on-click="onSubmit" :inProgress="isSubmitted">Log in</ButtonPositive>
          <ButtonPositive :on-click="falseSubmit" :inProgress=false>
            <router-link to="/signup" class="login-button">Sign Up</router-link>
          </ButtonPositive>
        </div>
      </form>
    </FormWrapper>
  </div>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
  import { mapGetters, mapActions } from 'vuex'

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
        validationsEnabled: false,
        isSubmitted: false
      }
    },

    computed: {
      ...mapGetters([
        'isAuthError'
      ])
    },

    validations: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    },

    methods: {
      ...mapActions([
        'login',
        'clearAuthError'
      ]),

      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password
        }
        this.validationsEnabled = true
        if (!this.$v.$invalid) {
          this.login({ email: formData.email, password: formData.password })
          this.isSubmitted = true
        } else {
          return false
        }
      },

      falseSubmit () {
        return false
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
  .signin {
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
