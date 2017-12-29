<template>
  <v-form-wrapper title="New vessel details">
    <form slot="content" @submit.prevent>
      <md-field class="input-with-error" :class="{ invalid: showErrors && $v.vessel.name.$invalid }">
        <label>Name</label>
        <md-input
          @blur="$v.vessel.name.$touch()"
          v-model="vessel.name">
        </md-input>
      </md-field>
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.name.required">This field must not be empty.</span>
      </div>

      <md-field class="input-with-error" :class="{ invalid: showErrors && $v.vessel.imoNumber.$invalid }">
        <label>IMO Number</label>
        <md-input
          @blur="$v.vessel.imoNumber.$touch()"
          v-model="vessel.imoNumber">
        </md-input>
      </md-field>
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.imoNumber.required">This field must not be empty.</span>
        <span class="validation-error" v-if="showErrors && !$v.vessel.imoNumber.numeric">IMO number must be a number.</span>
      </div>

      <md-field class="input-with-error">
        <label>Call sign</label>
        <md-input
          v-model="vessel.callsign">
        </md-input>
      </md-field>
      <div class="error">
        <span class="validation-error"</span>
      </div>

      <md-field class="input-with-error" :class="{ invalid: showErrors && $v.vessel.mmsi.$invalid }">
        <label>MMSI</label>
        <md-input
          @blur="$v.vessel.mmsi.$touch()"
          v-model="vessel.mmsi">
        </md-input>
      </md-field>
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.mmsi.numeric">MMSI must be a number.</span>
      </div>

      <md-field class="input-with-error" :class="{ invalid: showErrors && $v.vessel.gt.$invalid }">
        <label>GT</label>
        <md-input
          @blur="$v.vessel.gt.$touch()"
          v-model="vessel.gt">
        </md-input>
      </md-field>
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.gt.numeric">GT must be a number.</span>
      </div>

      <md-field class="input-with-error" :class="{ invalid: showErrors && $v.vessel.yob.$invalid }">
        <label>Year of build</label>
        <md-input
          @blur="$v.vessel.yob.$touch()"
          v-model="vessel.yob">
        </md-input>
      </md-field>
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.yob.numeric">Year of build must be a number.</span>
      </div>

      <md-field class="input-with-error" :class="{ invalid: showErrors && $v.vessel.flag.$invalid }">
        <label>Flag</label>
        <md-input
          @blur="$v.vessel.flag.$touch()"
          v-model="vessel.flag">
        </md-input>
      </md-field>
      <div class="error">
        <span class="validation-error" v-if="showErrors && !$v.vessel.flag.required">This field must not be empty.</span>
      </div>

      <div class="actions">
        <positive-button>
          <span @click="onSubmit">
            Submit
          </span>
        </positive-button>
      </div>
    </form>
  </v-form-wrapper>
</template>

<script>
  import vFormWrapper from '../components/form-wrapper.vue'
  import PositiveButton from '../components/atoms/buttons/positive.vue'
  import { required, numeric } from 'vuelidate/lib/validators'

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
      onSubmit () {
        this.showErrors = true
        this.isSubmitted = true
      }
    },

    components: {
      vFormWrapper,
      PositiveButton
    }
  }
</script>

<style scoped lang="scss">
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
    }
  }
</style>
