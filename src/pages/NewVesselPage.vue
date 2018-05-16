<template>
  <FormWrapper class="new-vessel-form" title="Create new vessel" size="narrow">
    <form slot="content" @submit.prevent>
      <input
        data-test-edit-vessel-form-name-input
        class="new-vessel-form__name-input input--with-error"
        :class="{ invalid: showErrors && $v.vessel.name.$invalid }"
        @blur="$v.vessel.name.$touch()"
        v-model="vessel.name"
        placeholder="Name">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.name.required">This field must not be empty.</span>
      </div>

      <input
        data-test-edit-vessel-form-imo-input
        class="new-vessel-form__imo-number-input input--with-error"
        :class="{ invalid: showErrors && $v.vessel.imoNumber.$invalid }"
        @blur="$v.vessel.imoNumber.$touch()"
        v-model="vessel.imoNumber"
        placeholder="IMO Number">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.imoNumber.required">This field must not be empty.</span>
        <span class="validation-error" v-if="showErrors && !$v.vessel.imoNumber.numeric">IMO number must be a number.</span>
      </div>

      <input
        data-test-edit-vessel-form-callsign-input
        class="new-vessel-form__callsign-input input--with-error"
        v-model="vessel.callsign"
        placeholder="Call sign">
      <div class="error">
        <span class="validation-error"></span>
      </div>

      <input
        data-test-edit-vessel-form-mmsi-input
        class="new-vessel-form__mmsi-input input--with-error"
        :class="{ invalid: showErrors && $v.vessel.mmsi.$invalid }"
        @blur="$v.vessel.mmsi.$touch()"
        v-model="vessel.mmsi"
        placeholder="MMSI">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.mmsi.numeric">MMSI must be a number.</span>
      </div>

      <input
        data-test-edit-vessel-form-gt-input
        class="new-vessel-form__gt-input input--with-error"
        :class="{ invalid: showErrors && $v.vessel.gt.$invalid }"
        @blur="$v.vessel.gt.$touch()"
        v-model="vessel.gt"
        placeholder="Gross tonnage">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.gt.numeric">GT must be a number.</span>
      </div>

      <input
        data-test-edit-vessel-form-yob-input
        class="new-vessel-form__yob-input input--with-error"
        :class="{ invalid: showErrors && $v.vessel.yob.$invalid }"
        @blur="$v.vessel.yob.$touch()"
        v-model="vessel.yob"
        placeholder="Year of build">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.yob.numeric">Year of build must be a number.</span>
      </div>

      <input
        data-test-edit-vessel-form-flag-input
        class="new-vessel-form__flag-input input--with-error"
        :class="{ invalid: showErrors && $v.vessel.flag.$invalid }"
        @blur="$v.vessel.flag.$touch()"
        v-model="vessel.flag"
        placeholder="Flag">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.flag.required">This field must not be empty.</span>
      </div>

      <div class="actions">
        <ButtonPositive :inProgress="isSubmitted" :on-click="onSubmit">
          <span>
            Create vessel
          </span>
        </ButtonPositive>
      </div>
    </form>
  </FormWrapper>
</template>

<script>
  import { mapActions } from 'vuex'
  import FormWrapper from '../components/FormWrapper.vue'
  import ButtonPositive from '../components/ButtonPositive.vue'
  import { required, numeric } from 'vuelidate/lib/validators'
  import router from '@/router/index'

  export default {
    data () {
      return {
        vessel: {
          name: '',
          imoNumber: '',
          callsign: '',
          mmsi: '',
          gt: '',
          yob: '',
          flag: ''
        },
        isSubmitted: false,
        showErrors: false
      }
    },

    validations: {
      vessel: {
        name: { required },
        imoNumber: { required, numeric },
        gt: { numeric },
        mmsi: { numeric },
        yob: { numeric },
        flag: { required }
      }
    },

    methods: {
      ...mapActions([
        'createNewVessel'
      ]),

      async onSubmit () {
        const formData = {
          name: this.vessel.name,
          imoNumber: this.vessel.imoNumber,
          gt: this.vessel.gt,
          mmsi: this.vessel.mmsi,
          yob: this.vessel.yob,
          flag: this.vessel.flag,
          reports: [],
          owner: this.$store.state.auth.userId
        }

        this.showErrors = true
        if (this.$v.$invalid) {
          return false
        } else {
          await this.createNewVessel(formData)
          router.push('/dashboard/vessels')
          this.isSubmitted = true
        }
      }
    },

    components: {
      FormWrapper,
      ButtonPositive
    }
  }
</script>

<style scoped lang="scss">
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
      opacity: 0.5;

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
</style>
