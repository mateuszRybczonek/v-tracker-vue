<template>
  <FormWrapper title="Edit vessel details" size="narrow">
    <form slot="content" @submit.prevent>
      <input
        data-test-edit-vessel-form-name-input
        class="input--with-error"
        :class="{ invalid: showErrors && $v.vessel.name.$invalid }"
        @blur="$v.vessel.name.$touch()"
        v-model="vessel.name"
        placeholder="Name">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.name.required">This field must not be empty.</span>
      </div>

      <input
        data-test-edit-vessel-form-imo-input
        class="input--with-error"
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
        class="input--with-error"
        v-model="vessel.callsign"
        placeholder="Call sign">
      <div class="error">
        <span class="validation-error"></span>
      </div>

      <input
        data-test-edit-vessel-form-mmsi-input
        class="input--with-error"
        :class="{ invalid: showErrors && $v.vessel.mmsi.$invalid }"
        @blur="$v.vessel.mmsi.$touch()"
        v-model="vessel.mmsi"
        placeholder="MMSI">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.mmsi.numeric">MMSI must be a number.</span>
      </div>

      <input
        data-test-edit-vessel-form-gt-input
        class="input--with-error"
        :class="{ invalid: showErrors && $v.vessel.gt.$invalid }"
        @blur="$v.vessel.gt.$touch()"
        v-model="vessel.gt"
        placeholder="Gross tonnage">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.gt.numeric">GT must be a number.</span>
      </div>

      <input
        data-test-edit-vessel-form-yob-input
        class="input--with-error"
        :class="{ invalid: showErrors && $v.vessel.yob.$invalid }"
        @blur="$v.vessel.yob.$touch()"
        v-model="vessel.yob"
        placeholder="Year of build">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.yob.numeric">Year of build must be a number.</span>
      </div>

      <input
        data-test-edit-vessel-form-flag-input
        class="input--with-error"
        :class="{ invalid: showErrors && $v.vessel.flag.$invalid }"
        @blur="$v.vessel.flag.$touch()"
        v-model="vessel.flag"
        placeholder="Flag">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.flag.required">This field must not be empty.</span>
      </div>

      <input
        data-test-edit-vessel-form-max-fo-input
        class="new-vessel-form__max-fo-input input--with-error"
        :class="{ invalid: showErrors && $v.vessel.maxFo.$invalid }"
        @blur="$v.vessel.maxFo.$touch()"
        v-model="vessel.maxFo"
        placeholder="Max FO">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.maxFo.numeric">Max FO must be a number.</span>
      </div>

      <input
        data-test-edit-vessel-form-max-do-input
        class="new-vessel-form__max-do-input input--with-error"
        :class="{ invalid: showErrors && $v.vessel.maxDo.$invalid }"
        @blur="$v.vessel.maxDo.$touch()"
        v-model="vessel.maxDo"
        placeholder="Max DO">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.maxDo.numeric">Max DO must be a number.</span>
      </div>

      <input
        data-test-edit-vessel-form-max-fw-input
        class="new-vessel-form__max-fw-input input--with-error"
        :class="{ invalid: showErrors && $v.vessel.maxFw.$invalid }"
        @blur="$v.vessel.maxFw.$touch()"
        v-model="vessel.maxFw"
        placeholder="Max FW">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.maxFw.numeric">Max FW must be a number.</span>
      </div>

      <div class="actions">
        <ButtonPositive :inProgress="isSubmitted" :on-click="onSubmit">
          <span>Update vessel</span>
        </ButtonPositive>
      </div>
    </form>
  </FormWrapper>
</template>

<script>
  import FormWrapper from '../components/FormWrapper.vue'
  import ButtonPositive from '../components/ButtonPositive.vue'
  import { required, numeric } from 'vuelidate/lib/validators'
  import { mapGetters, mapActions } from 'vuex'
  import router from '@/router/index'

  export default {
    data () {
      return {
        vessel: {},
        isSubmitted: false,
        showErrors: false
      }
    },

    created () {
      this.vessel = this.vessels.find(vessel => vessel.id === this.$route.params.id)
    },

    computed: {
      ...mapGetters([
        'vessels'
      ])
    },

    validations: {
      vessel: {
        name: { required },
        imoNumber: { required, numeric },
        gt: { numeric },
        mmsi: { numeric },
        yob: { numeric },
        flag: { required },
        maxFo: { numeric },
        maxDo: { numeric },
        maxFw: { numeric }
      }
    },

    methods: {
      ...mapActions([
        'editVessel'
      ]),

      async onSubmit () {
        const formData = {
          name: this.vessel.name,
          imoNumber: this.vessel.imoNumber,
          gt: this.vessel.gt,
          mmsi: this.vessel.mmsi,
          yob: this.vessel.yob,
          flag: this.vessel.flag,
          owners: {
            [this.$store.state.auth.userId]: true
          },
          maxFo: this.vessel.maxFo,
          maxDo: this.vessel.maxDo,
          maxFw: this.vessel.maxFw,
          id: this.$route.params.id
        }

        this.showErrors = true
        if (this.$v.$invalid) {
          return false
        } else {
          await this.editVessel(formData)
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
