<template>
  <div class="signin">
    <form-wrapper title="Please login using the form below:">
      <form slot="content" @submit.prevent="onSubmit">
        <div class="error">
          <span class="validation-error auth-error" v-if="isAuthError">
            Invalid credentials
          </span>
        </div>
        <md-field class="input-with-error" :class="{ invalid: validationsEnabled && $v.email.$invalid }">
          <label>Email</label>
          <md-input
            v-model="email"
            @input="clearAuthError()"
            @blur="$v.email.$touch()">
          </md-input>
        </md-field>
        <div class="error">
          <span class="validation-error" v-if="validationsEnabled && !$v.email.required">This field must not be empty.</span>
          <span class="validation-error" v-else-if="validationsEnabled && !$v.email.email">Please provide a valid email address.</span>
        </div>

        <md-field class="input-with-error" :class="{ invalid: validationsEnabled && $v.password.$invalid }">
          <label>Password</label>
          <md-input
            type="password"
            v-model="password"
            @input="$v.password.$touch()">
          </md-input>
        </md-field>
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
        this.isSubmitted = true
        return !this.$v.$invalid ? this.login({ email: formData.email, password: formData.password }) : false
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
      .md-field > input {
        border-bottom: 1px solid $color-font-grey;
        color: $color-font-grey;
      }

      .error {
        min-height: 30px;
      }

      .input-with-error {
        display: flex;
        flex-direction: column;
        margin: 15px 0 0;
      }

      .validation-error {
        color: $color-tomato;
        font-size: 12px;

        &.auth-error {
          display: flex;
          justify-content: center;
        }
      }

      .actions {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
