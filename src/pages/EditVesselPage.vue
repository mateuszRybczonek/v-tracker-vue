<template>
  <FormWrapper title="Edit vessel details" size="narrow">
    <form slot="content" @submit.prevent>
      <input class="input--with-error" :class="{ invalid: showErrors && $v.vessel.name.$invalid }"
        @blur="$v.vessel.name.$touch()"
        v-model="vessel.name"
        placeholder="Name">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.name.required">This field must not be empty.</span>
      </div>

      <input class="input--with-error" :class="{ invalid: showErrors && $v.vessel.imoNumber.$invalid }"
        @blur="$v.vessel.imoNumber.$touch()"
        v-model="vessel.imoNumber"
        placeholder="IMO Number">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.imoNumber.required">This field must not be empty.</span>
        <span class="validation-error" v-if="showErrors && !$v.vessel.imoNumber.numeric">IMO number must be a number.</span>
      </div>

      <input class="input--with-error"
        v-model="vessel.callsign"
        placeholder="Call sign">
      <div class="error">
        <span class="validation-error"></span>
      </div>

      <input class="input--with-error" :class="{ invalid: showErrors && $v.vessel.mmsi.$invalid }"
        @blur="$v.vessel.mmsi.$touch()"
        v-model="vessel.mmsi"
        placeholder="MMSI">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.mmsi.numeric">MMSI must be a number.</span>
      </div>

      <input class="input--with-error" :class="{ invalid: showErrors && $v.vessel.gt.$invalid }"
        @blur="$v.vessel.gt.$touch()"
        v-model="vessel.gt"
        placeholder="Gross tonnage">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.gt.numeric">GT must be a number.</span>
      </div>

      <input class="input--with-error" :class="{ invalid: showErrors && $v.vessel.yob.$invalid }"
        @blur="$v.vessel.yob.$touch()"
        v-model="vessel.yob"
        placeholder="Year of build">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.yob.numeric">Year of build must be a number.</span>
      </div>

      <input class="input--with-error" :class="{ invalid: showErrors && $v.vessel.flag.$invalid }"
        @blur="$v.vessel.flag.$touch()"
        v-model="vessel.flag"
        placeholder="Flag">
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.flag.required">This field must not be empty.</span>
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
  import { mapGetters } from 'vuex'
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
        flag: { required }
      }
    },

    methods: {
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
          id: this.$route.params.id
        }

        this.showErrors = true
        if (this.$v.$invalid) {
          return false
        } else {
          await this.$store.dispatch('editVessel', formData)
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
