<template>
  <q-page class="flex flex-center q-pa-lg" view="lHh Lpr lFf">
    <div class="full-width">
      <div class="col-12 q-my-md flex">
        <span  class="text-h6">Verication Code</span>
      </div>
      <q-separator />
      <br>
     <div class="row">
        <q-input class="col-12"
          color="green"
          placeholder="Verication Code"
          outlined
          type="number"
          v-model="form.code"
          @input="$v.form.code.$touch()"
          :error="$v.form.code.$error"
          maxlength="6"
          clearable
        ></q-input>
              </div>
              <p>{{ form.text }}</p>
              <q-separator />
        <div>
          <br>
          <p>We have sent you the code to: {{ $route.email}}</p>
        </div>
        <div class="row">
          <p> Didn't receive the code?</p> <p style="color: blue"> &nbsp; Send it again</p>
        </div>
    </div>
<div>
 <div >
          <q-btn  label="Cancel" color="grey-6" v-close-popup  />
          <q-btn 
          :disable="isDisabled()"
          :outline="isDisabled()"
            label="Confirm" color="primary" to="/api/user/reset" style="margin-left: 15px"  />
        </div>
      </div>
  </q-page>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import {
  mapActions
} from 'vuex'
export default {
  props: {
    openDialog: Function
  },
  data () {
    return {
      form: {
        code: '',
        text: 'Your code has 6 characters',
        isAtivo: true
      },
      formReset: {}
    }
  },
  mounted () {
    this.formReset = { ...this.form }
    this.$v.form.$touch()
  },
  methods: {
    ...mapActions('Auth', ['Register']),
    isDisabled () {
      return this.$v.form.$invalid || this.$v.form.$error
    },
    waring () {
      this.$q.notify({
        message: 'Code Success!',
        color: 'green',
        position: 'bottom-right',
        timeout: 1000,
        textColor: 'black',
        html: true
      })
    }
  },
  validations: {
    form: {
      code: {
        required,
        maxLength: maxLength(6)
      }
    }
  }
}
</script>
<style>
.hide {
  display: none;
}
.text {
text-transform: lowercase;

}
</style>
