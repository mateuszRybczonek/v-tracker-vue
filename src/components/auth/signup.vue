<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">

        <div class="input" :class="{ invalid: validationsEnabled && $v.email.$invalid }">
          <label for="email">Mail</label>
          <input
              type="text"
              id="email"
              @blur="$v.email.$touch()"
              v-model="email">
          <span class="validation-error" v-if="validationsEnabled && !$v.email.required">This field must not be empty.</span>
          <span class="validation-error" v-if="validationsEnabled && !$v.email.email">Please provide a valid email address.</span>
        </div>
        <button @click="$v.email.$touch()">Validate email</button>

        <div class="input" :class="{ invalid: validationsEnabled && $v.age.$invalid }">
          <label for="age">Your Age</label>
          <input
              type="number"
              id="age"
              @input="$v.age.$touch()"
              v-model.number="age">
          <span class="validation-error" v-if="validationsEnabled && !$v.age.required">
	          This field must not be empty.
          </span>
          <span class="validation-error" v-if="validationsEnabled && !$v.age.minVal">
	          The minimum age is {{ $v.age.$params.minVal.min }}.
          </span>
        </div>

        <div class="input" :class="{ invalid: validationsEnabled && $v.password.$invalid }">
          <label for="password">Password</label>
          <input
              type="password"
              id="password"
              @input="$v.password.$touch()"
              v-model="password">
          <span class="validation-error" v-if="validationsEnabled && !$v.password.required">
	          This field must not be empty.
          </span>
          <span class="validation-error" v-if="validationsEnabled && !$v.password.minLength">
	          The minimum length is {{ $v.password.$params.minLength.min }}.
          </span>
        </div>

        <div class="input" :class="{ invalid: validationsEnabled && $v.confirmPassword.$invalid }">
          <label for="confirm-password">Confirm Password</label>
          <input
              type="password"
              id="confirm-password"
              @input="$v.confirmPassword.$touch()"
              v-model="confirmPassword">
          <span class="validation-error" v-if="validationsEnabled && !$v.confirmPassword.sameAs">
	          The confirmation password and password must be the same.
          </span>
        </div>

        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="poland">Poland</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>

        <div class="hobbies">
          <h3>Add some Hobbies</h3>
          <button @click="onAddHobby" type="button">Add Hobby</button>
          <div class="hobby-list">
            <div
                class="input"
                :class="{ invalid: validationsEnabled && $v.hobbyInputs.$each[index].$invalid }"
                v-for="(hobbyInput, index) in hobbyInputs"
                :key="hobbyInput.id"
            >
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                  type="text"
                  :id="hobbyInput.id"
                  @blur="$v.hobbyInputs.$each[index].value.$touch()"
                  v-model="hobbyInput.value">
              <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
	            <span class="validation-error" v-if="validationsEnabled && !$v.hobbyInputs.minLength">
		            You have to specify at least {{ $v.hobbyInputs.$params.minLength.min }} hobbies.
	            </span>
            </div>
	          <span class="validation-error" v-if="validationsEnabled && !$v.hobbyInputs.required">
		            Please add hobbies.
	          </span>
          </div>
        </div>

        <div class="input inline" :class="{ invalid: validationsEnabled && $v.terms.$invalid }">
          <input
		          type="checkbox"
		          id="terms"
		          @change="$v.terms.$touch()"
		          v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div>

        <div class="submit">
          <button type="submit">Submit</button>
        </div>
        <div>{{ $v }}</div>
      </form>
    </div>
  </div>
</template>

<script>
	import { required, email, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators'
	import axios from 'axios'

	export default {
		data () {
			return {
				email: '',
				age: null,
				password: '',
				confirmPassword: '',
				country: 'poland',
				hobbyInputs: [],
				terms: false,
				validationsEnabled: false,
			}
		},

		validations: {
			email: {
				// own name: validation name
				// required: required,
				required,
				email,
				unique: value => {
					// don't run async code if the val is ''
					if (value === '') return true
					return axios.get(`/users.json?orderBy="email"&equalTo="${value}"`)
						.then((result => {
							return Object.keys(result.data).length === 0
						}))
				}
			},
      age: {
				required,
        numeric,
        minVal: minValue(18)
      },
      password: {
				required,
        minLength: minLength(6)
      },
      confirmPassword: {
				sameAs: sameAs('password')
      },
			terms: {
				required: requiredUnless( vm => {
					return vm.country === 'poland'
				})
			},
			hobbyInputs: {
				required,
				minLength: minLength(2),
				$each: {
					value: {
						required,
						minLength: minLength(5)
					}
				}
			}
		},

		methods: {
			onAddHobby () {
				const newHobby = {
					id: Math.random() * Math.random() * 1000,
					value: ''
				}
				this.hobbyInputs.push(newHobby)
			},
			onDeleteHobby (id) {
				this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
			},
			onSubmit () {
				const formData = {
					email: this.email,
					age: this.age,
					password: this.password,
					confirmPassword: this.confirmPassword,
					country: this.country,
					hobbies: this.hobbyInputs.map(hobby => hobby.value),
					terms: this.terms
				}
        this.validationsEnabled = true,
				this.$store.dispatch('signup', formData)
			}
		}
	}
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .input.invalid label {
    color: #FF6975;
  }

  .input.invalid input {
    border: 1px solid #ff6975;
    background-color: #ffeaf5;
  }

  .validation-error {
    color: #FF6975;
    font-size: 12px;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>