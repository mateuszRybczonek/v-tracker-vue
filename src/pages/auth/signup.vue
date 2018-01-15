<template>
  <div class="signup">
    <form-wrapper title="Register new account">
      <form slot="content" @submit.prevent="onSubmit">
        <input class="input__email input--with-error" :class="{ invalid: validationsEnabled && $v.email.$invalid }"
          v-model="email"
          placeholder="Email"
          @blur="$v.email.$touch()">
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.email.required">This field must not be empty.</span>
          <span class="validation-error" v-if="validationsEnabled && !$v.email.email">Please provide a valid email address.</span>
          <!--<span class="validation-error" v-if="validationsEnabled && !$v.email.unique">The email you provided already exist.</span>-->
        </div>

        <input class="input__password input--with-error" :class="{ invalid: validationsEnabled && $v.password.$invalid }"
          type="password"
          v-model="password"
          placeholder="Password"
          @input="$v.password.$touch()">
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.password.required">This field must not be empty.</span>
          <span class="validation-error" v-if="validationsEnabled && !$v.password.minLength">The minimum length is {{ $v.password.$params.minLength.min }}.</span>
        </div>
        <input class="input__password input--with-error" :class="{ invalid: validationsEnabled && $v.confirmPassword.$invalid }"
          type="password"
          v-model="confirmPassword"
          placeholder="Password confirmation"
          @input="$v.confirmPassword.$touch()">
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.confirmPassword.sameAs">
            The confirmation password and password must be the same.
          </span>
        </div>
        <div class="actions">
          <positive-button :on-click="onSubmit" :inProgress="isSubmitted">Register</positive-button>
        </div>
      </form>
    </form-wrapper>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'
//  import globalAxios from 'axios'

  import FormWrapper from '../../components/form-wrapper.vue'
  import PositiveButton from '../../components/atoms/buttons/positive.vue'

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
        'signup' // map `this.signup(formData)` to `this.$store.dispatch('signup', formData)`
      ]),

      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        }
        this.validationsEnabled = true
        this.isSubmitted = false
        return !this.$v.$invalid ? this.signup(formData) : false
      }
    },

    components: {
      PositiveButton,
      FormWrapper
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
