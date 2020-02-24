<template>
  <q-page class="flex flex-center q-pa-lg" view="lHh Lpr lFf">
    <div class="full-width">
      <div class="col-12 q-my-md flex">
        <span  class="text-h6">Reset your password</span>
      </div>
      <q-separator />
      <br>
      <div>
       <p> Password
     <span style="color:red"> *</span> </p>
     </div>
      <div class="col-12 q-mb-sm">
        <q-input
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          v-model="form.password"
          maxlength="20"
          :error="$v.form.password.$invalid"
          clearable
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div>
       <p> Confirm Password
     <span style="color:red"> *</span> </p>
     </div>
      <div class="col-12 q-mb-sm">
        <q-input
          outlined
          :type="isConfPwd ? 'password' : 'text'"
          label="Confirm Password"
          v-model="form.confirmPassword"
          maxlength="20"
          :error="$v.form.confirmPassword.$invalid"
          clearable
        >
          <template v-slot:append>
            <q-icon
              :name="isConfPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConfPwd = !isConfPwd"
            />
          </template>
        </q-input>
      </div>
      <div :class="[{ hide: hideWarning() }, 'q-mb-lg']">
        <small class="text-red">* The passwords are not the same!</small>
      </div>
    </div>
 <div >
 <div >
          <q-btn  label="Cancel" color="grey-6" to="/" />
          <q-btn
          :disable="isDisabled()"
          :outline="isDisabled()"
           label="Confirm" color="primary" to="/" style="margin-left: 15px" />
        </div>
        </div>
  </q-page>
</template>

<script>
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
import {
  mapActions
} from 'vuex'
export default {
  props: {
    openDialog: Function
  },
  data () {
    return {
      isPwd: true,
      isConfPwd: true,
      form: {
        password: '',
        confirmPassword: '',
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
    hideWarning () {
      return !this.$v.form.password.required || !this.$v.form.confirmPassword.required ||
        this.$v.form.password.sameAs
    },
    suscess () {
      this.$q.notify({
        message: 'Reset your password success',
        color: 'blue',
        position: 'bottom-right',
        html: true
      })
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(32),
        sameAs: sameAs('confirmPassword')
      },
      confirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(32),
        sameAs: sameAs('password')
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
