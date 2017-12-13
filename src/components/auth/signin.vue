<template>
  <div class="signin">
    <form-wrapper title="Please login using the form below:">
      <form slot="content" @submit.prevent="onSubmit">
        <md-field>
          <label>Email</label>
          <md-input v-model="email"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="password"></md-input>
        </md-field>
        <div class="actions">
          <positive-button type="submit">Log in</positive-button>
          <positive-button>
            <router-link to="/signup" class="login-button">Sign Up</router-link>
          </positive-button>
        </div>
      </form>
    </form-wrapper>
  </div>
</template>

<script>
  import FormWrapper from './form-wrapper.vue'
  import PositiveButton from '../../components/atoms/buttons/positive.vue'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
				this.$store.dispatch('login', { email: formData.email, password: formData.password })
			}
    },

    components: {
      'positive-button': PositiveButton,
      'form-wrapper': FormWrapper
    },
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

      .actions {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
