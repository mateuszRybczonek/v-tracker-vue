<template>
  <div class="signin">
    <form-wrapper title="Login" size="narrow">
      <form slot="content" @submit.prevent="onSubmit">
        <div class="content__error">
          <span class="content__error__validation-error__auth-error" v-if="isAuthError">
            Invalid credentials
          </span>
        </div>
        <input class="input__email input--with-error" :class="{ invalid: validationsEnabled && $v.email.$invalid }"
          v-model="email"
          placeholder="Email"
          @input="clearAuthError()"
          @blur="$v.email.$touch()">
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.email.required">This field must not be empty.</span>
          <span class="validation-error" v-else-if="validationsEnabled && !$v.email.email">Please provide a valid email address.</span>
        </div>
        <input class="input__password input--with-error" :class="{ invalid: validationsEnabled && $v.password.$invalid }"
            type="password"
            placeholder="Password"
            v-model="password"
            @input="$v.password.$touch()">
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.password.required">This field must not be empty.</span>
        </div>
        <div class="actions">
          <positive-button :on-click="onSubmit" :inProgress="isSubmitted">Log in</positive-button>
          <positive-button :on-click="falseSubmit" :inProgress=false>
            <router-link to="/signup" class="login-button">Sign Up</router-link>
          </positive-button>
        </div>
      </form>
    </form-wrapper>
  </div>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
  import { mapGetters, mapActions } from 'vuex'

  import FormWrapper from '../../components/form-wrapper.vue'
  import PositiveButton from '../../components/atoms/buttons/positive.vue'

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
      PositiveButton,
      FormWrapper
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


      .input__email {
        background: url('../../assets/icons.svg') no-repeat;
        background-position-y: -370px;
        background-size: 15%;
        padding-left: 0;
        opacity: 0.5;
      }

      .input__password {
        background: url('../../assets/icons.svg') no-repeat;
        background-position-y: -416px;
        background-size: 15%;
        padding-left: 0;
        opacity: 0.5;
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
        padding: 10px 10px 10px 50px;

        &::placeholder {
          color: $color-black
        }

        &:focus {
          outline-color: $color-dark-grey;
        }
      }

      .actions {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
