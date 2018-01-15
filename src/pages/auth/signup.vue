<template>
  <div class="signup">
    <form-wrapper title="Please sign up using the form below:">
      <form slot="content" @submit.prevent="onSubmit">
        <md-field class="input-with-error" :class="{ invalid: validationsEnabled && $v.email.$invalid }">
          <label>Email</label>
          <md-input
            v-model="email"
            @blur="$v.email.$touch()">
          </md-input>
        </md-field>
        <span class="validation-error" v-if="validationsEnabled && !$v.email.required">This field must not be empty.</span>
        <span class="validation-error" v-if="validationsEnabled && !$v.email.email">Please provide a valid email address.</span>
        <!--<span class="validation-error" v-if="validationsEnabled && !$v.email.unique">The email you provided already exist.</span>-->

        <md-field class="input-with-error" :class="{ invalid: validationsEnabled && $v.password.$invalid }">
          <label>Password</label>
          <md-input
            type="password"
            v-model="password"
            @input="$v.password.$touch()">
          </md-input>
        </md-field>
        <span class="validation-error" v-if="validationsEnabled && !$v.password.required">This field must not be empty.</span>
        <span class="validation-error" v-if="validationsEnabled && !$v.password.minLength">The minimum length is {{ $v.password.$params.minLength.min }}.</span>

        <md-field class="input-with-error" :class="{ invalid: validationsEnabled && $v.confirmPassword.$invalid }">
          <label>Password confirmation</label>
          <md-input
            type="password"
            v-model="confirmPassword"
            @input="$v.confirmPassword.$touch()">
          </md-input>
        </md-field>
        <span class="validation-error" v-if="validationsEnabled && !$v.confirmPassword.sameAs">
        The confirmation password and password must be the same.
      </span>
        <div class="actions">
          <positive-button :on-click="onSubmit" :inProgress="isSubmitted">Submit</positive-button>
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
      .md-field {
        > input {
          border-bottom: 1px solid $color-dark-grey;
          color: $color-dark-grey;
        }
      }

      .input-with-error {
        display: flex;
        flex-direction: column;
        margin: 15px 0 0;
      }

      .validation-error {
        color: $color-tomato;
        font-size: 12px;
      }

      .actions {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
